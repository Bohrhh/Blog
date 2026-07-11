"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"
import { articles as allArticles } from "@/app/data/articles"
import { cn, MotionLink } from "@/app/lib/utils"
import { useSound } from "@/app/context/AppContext"
import { useTranslation, getTranslatedContent } from "@/app/lib/i18n"
import { API } from "@/app/lib/constants"
import GlassPanel from "@/app/components/GlassPanel"

export default function PopularContent() {
  const { playSound } = useSound()
  const { language, t } = useTranslation()
  const [popularArticles, setPopularArticles] = useState<typeof allArticles>([])

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(API.VIEWS)
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
    <GlassPanel className="p-5">
      <h3 className="text-caption font-semibold uppercase tracking-widest text-magenta mb-3">
        {t("common").popularContent}
      </h3>

      <ul className="space-y-1">
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
                  "group flex items-start gap-2 py-1.5 px-2 rounded-card",
                  "text-slate-700 dark:text-dark-textMuted",
                  "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-magenta",
                  "transition-colors duration-150"
                )}
              >
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="text-body-sm">{title}</span>
              </MotionLink>
            </motion.li>
          )
        })}
      </ul>
    </GlassPanel>
  )
}
