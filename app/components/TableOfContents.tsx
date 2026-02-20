"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "@/app/lib/utils"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from markdown content
  const headings = useMemo(() => {
    const lines = content.split("\n")
    const items: TocItem[] = []

    for (const line of lines) {
      // Match h2 (##) and h3 (###) headings
      const match = line.match(/^(#{2,3})\s+(.+)$/)
      if (match) {
        const level = match[1].length
        const text = match[2].trim()
        // Create ID from text (same logic as in ArticleContent)
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()

        items.push({ id, text, level })
      }
    }

    return items
  }, [content])

  // Track active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[]

      if (headingElements.length === 0) return

      // Find the heading that is currently in view
      let currentId = ""

      for (const element of headingElements) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 100) {
          currentId = element.id
        }
      }

      setActiveId(currentId)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  // Don't render if no headings
  if (headings.length === 0) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Account for fixed navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="hidden xl:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">
        On This Page
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleClick(heading.id)}
              className={cn(
                "block text-left text-sm transition-colors duration-150",
                heading.level === 3 && "pl-3",
                activeId === heading.id
                  ? "text-magenta font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
