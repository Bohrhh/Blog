import { NextRequest, NextResponse } from "next/server"
import { getViews, setViews, withViewLock } from "./store"

const SLUG_PATTERN = /^[a-z0-9-]+$/i
const MAX_SLUG_LENGTH = 128
const MAX_BODY_BYTES = 16 * 1024
const MAX_UNIQUE_KEYS = 10_000
// Keys that are dangerous when persisted into a plain object.
const BLOCKED_KEYS = new Set(["__proto__", "constructor", "prototype", "toString", "hasOwnProperty"])
// Simple per-IP in-memory rate limit.
const RATE_LIMIT_MAX = 30
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_PRUNE_THRESHOLD = 10_000

const buckets = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const bucket = buckets.get(ip)

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  bucket.count += 1

  // Bound memory growth of the bucket map.
  if (buckets.size > RATE_LIMIT_PRUNE_THRESHOLD) {
    for (const [key, value] of buckets) {
      if (now >= value.resetAt) buckets.delete(key)
    }
  }

  return bucket.count > RATE_LIMIT_MAX
}

function isValidSlug(slug: unknown): slug is string {
  return (
    typeof slug === "string" &&
    slug.length > 0 &&
    slug.length <= MAX_SLUG_LENGTH &&
    SLUG_PATTERN.test(slug) &&
    !BLOCKED_KEYS.has(slug)
  )
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || ""
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 })
    }

    // Check the real payload size (route handlers have no default body limit).
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request body too large" }, { status: 413 })
    }

    let body: { slug?: unknown }
    try {
      body = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const slug = body?.slug
    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    const views = await withViewLock(async () => {
      const current = await getViews()
      // Defense-in-depth: cap total unique keys to bound disk growth even if
      // the caller side-steps validation somehow.
      if (!Object.hasOwn(current, slug) && Object.keys(current).length >= MAX_UNIQUE_KEYS) {
        return current
      }
      const updated = { ...current, [slug]: (current[slug] || 0) + 1 }
      await setViews(updated)
      return updated
    })

    return NextResponse.json({ views: views[slug] || 1 })
  } catch (error) {
    console.error("Error updating view count:", error)
    return NextResponse.json({ error: "Failed to update view count" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")
    const views = await getViews()

    const response = !slug
      ? NextResponse.json(views)
      : NextResponse.json({ views: views[slug] || 0 })

    // Add cache headers to reduce unnecessary API calls.
    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=30")
    return response
  } catch (error) {
    console.error("Error getting view count:", error)
    return NextResponse.json({ views: 0 })
  }
}
