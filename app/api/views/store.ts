import fs from "fs/promises"
import path from "path"

const VIEWS_FILE = path.join(process.cwd(), "data", "views.json")

// In-memory fallback snapshot, used when the filesystem is read-only
// (e.g. Vercel serverless). Degrades to per-instance counts — a cosmetic
// metric — instead of failing the request.
let memoryViews: Record<string, number> | null = null

// Promise-chain lock that serializes read-modify-write cycles across
// concurrent requests, preventing lost increments and interleaved writes.
let chain: Promise<unknown> = Promise.resolve()

export function withViewLock<T>(fn: () => Promise<T>): Promise<T> {
  const result = chain.then(fn, fn)
  chain = result.catch(() => {})
  return result
}

export async function getViews(): Promise<Record<string, number>> {
  if (memoryViews) return memoryViews
  try {
    const data = await fs.readFile(VIEWS_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    // File missing or unreadable — start from an empty state.
    return {}
  }
}

export async function setViews(views: Record<string, number>): Promise<void> {
  try {
    const dir = path.dirname(VIEWS_FILE)
    await fs.mkdir(dir, { recursive: true })
    // Write to a temp file then rename for an atomic swap, so a crash or a
    // concurrent reader never sees a truncated JSON file.
    const tmp = `${VIEWS_FILE}.tmp`
    await fs.writeFile(tmp, JSON.stringify(views, null, 2))
    await fs.rename(tmp, VIEWS_FILE)
  } catch {
    // Read-only filesystem: keep counts in memory rather than throwing.
    memoryViews = views
  }
}
