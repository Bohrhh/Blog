import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const VIEWS_FILE = path.join(process.cwd(), "data", "views.json")

// 异步读取浏览量数据
async function getViews(): Promise<Record<string, number>> {
  try {
    const data = await fs.readFile(VIEWS_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // File doesn't exist or can't be read, return empty object
    return {}
  }
}

// 异步写入浏览量数据
async function setViews(views: Record<string, number>): Promise<void> {
  const dir = path.dirname(VIEWS_FILE)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(VIEWS_FILE, JSON.stringify(views, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    const views = await getViews()
    views[slug] = (views[slug] || 0) + 1
    await setViews(views)

    return NextResponse.json({ views: views[slug] })
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

    // Add cache headers to reduce unnecessary API calls
    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=30")
    return response
  } catch (error) {
    console.error("Error getting view count:", error)
    return NextResponse.json({ views: 0 })
  }
}
