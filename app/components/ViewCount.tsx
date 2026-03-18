"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

interface ViewCountProps {
  slug: string
}

export default function ViewCount({ slug }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    // Fetch initial view count and increment on each page view
    const fetchViews = async () => {
      try {
        // Increment view count
        await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        })

        // Get updated view count
        const response = await fetch(`/api/views?slug=${slug}`)
        const data = await response.json()
        setViews(data.views)
      } catch (error) {
        console.error("Failed to fetch views:", error)
      }
    }

    fetchViews()
  }, [slug])

  if (views === null) {
    return null
  }

  return (
    <span className="flex items-center gap-1">
      <Eye className="w-4 h-4" />
      {views.toLocaleString()}
    </span>
  )
}
