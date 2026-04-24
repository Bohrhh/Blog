"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"
import { articles as allArticles } from "@/app/data/articles"
import { cn } from "@/app/lib/utils"
import { useSound } from "@/app/context/AppContext"
import { useTranslation, getTranslatedContent } from "@/app/lib/i18n"

const MotionLink = motion(Link)

export default function PopularContent() {
  const { playSound } = useSound()
  const { language, t } = useTranslation()
  const [popularArticles, setPopularArticles] = useState<typeof allArticles>([])

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch("/api/views")
        const viewsData: Record<string, number> = await response.json()

        // Sort articles by view count descending
        const sorted = [...allArticles]
          .map((article) => ({
            article,
            views: viewsData[article.slug] || 0,
          }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 6)
          .map((item) => item.article)

        setPopularArticles(sorted)
      } catch (error) {
        console.error("Failed to fetch views for popular content:", error)
        // Fallback: show first 6 articles
        setPopularArticles(allArticles.slice(0, 6))
      }
    }

    fetchViews()
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-widest text-magenta uppercase">
        {t("common").popularContent}
      </h3>

      <ul className="space-y-3">
        {popularArticles.map((article, index) => {
          const { title } = getTranslatedContent(article, language)
          return (
            <motion.li
              key={article.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <MotionLink
                href={`/${article.slug}`}
                onMouseEnter={() => playSound("hover")}
                className={cn(
                  "group flex items-start gap-2 transition-colors duration-200",
                  "text-slate-800 hover:text-magenta",
                  "dark:text-dark-text dark:hover:text-magenta"
                )}
              >
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="leading-snug text-sm">{title}</span>
              </MotionLink>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
