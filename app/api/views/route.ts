import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const VIEWS_FILE = path.join(process.cwd(), "data", "views.json")

// 读取浏览量数据
function getViews(): Record<string, number> {
  try {
    if (fs.existsSync(VIEWS_FILE)) {
      const data = fs.readFileSync(VIEWS_FILE, "utf-8")
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("Error reading views:", error)
  }
  return {}
}

// 写入浏览量数据
function setViews(views: Record<string, number>) {
  try {
    const dir = path.dirname(VIEWS_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(views, null, 2))
  } catch (error) {
    console.error("Error writing views:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    const views = getViews()
    views[slug] = (views[slug] || 0) + 1
    setViews(views)

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
    const views = getViews()

    if (!slug) {
      return NextResponse.json(views)
    }

    return NextResponse.json({ views: views[slug] || 0 })
  } catch (error) {
    console.error("Error getting view count:", error)
    return NextResponse.json({ views: 0 })
  }
}
