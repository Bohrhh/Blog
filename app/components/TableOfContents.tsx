"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { cn, slugify } from "@/app/lib/utils"
import { useTranslation, useLanguage } from "@/app/lib/i18n"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentEn: string
  contentZh: string
}

function parseHeadings(content: string): TocItem[] {
  const lines = content.split("\n")
  const items: TocItem[] = []

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].trim()
      const id = slugify(text)

      items.push({ id, text, level })
    }
  }

  return items
}

export default function TableOfContents({ contentEn, contentZh }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const { t } = useTranslation()
  const { language } = useLanguage()

  const headings = useMemo(() => {
    const content = language === "zh" ? contentZh : contentEn
    return parseHeadings(content)
  }, [contentEn, contentZh, language])

  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[]

      if (headingElements.length === 0) return

      let currentId = ""
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect()
        if (rect.top <= 120) {
          currentId = element.id
        }
      }

      setActiveId(currentId)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  if (headings.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div
        className={cn(
          "rounded-xl border p-4",
          "bg-white/70 dark:bg-dark-surface/60 backdrop-blur-sm",
          "border-slate-200/70 dark:border-dark-border/60"
        )}
      >
        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-dark-textMuted mb-3 px-1">
          {t("common").onThisPage}
        </h4>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "block w-full text-left text-sm leading-snug py-1.5 px-2 rounded-md transition-colors duration-150 break-words",
                  heading.level === 3 && "pl-4",
                  activeId === heading.id
                    ? "bg-magenta/10 text-magenta font-medium"
                    : "text-slate-600 dark:text-dark-textMuted hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-slate-900 dark:hover:text-dark-text"
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}
