"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Eye } from "lucide-react"
import { Article } from "@/app/data/articles"
import { useSound } from "@/app/context/AppContext"
import { cn } from "@/app/lib/utils"
import { useTranslation, getTranslatedContent } from "@/app/lib/i18n"

interface ArticleCardProps {
  article: Article
  index: number
  viewCount?: number
}

function ArticleCardComponent({ article, index, viewCount }: ArticleCardProps) {
  const { playSound } = useSound()
  const { language, t } = useTranslation()
  const { title, description, subtitle } = getTranslatedContent(article, language)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.05
      }}
      className={cn(
        "group py-6 border-b last:border-b-0",
        "border-slate-200 dark:border-dark-border"
      )}
    >
      <a
        href={`/${article.slug}`}
        className="block"
        onMouseEnter={() => playSound("hover")}
      >
        <h3 className={cn(
          "text-xl sm:text-2xl font-bold mb-2 transition-colors duration-200",
          "text-slate-900 group-hover:text-magenta",
          "dark:text-dark-text dark:group-hover:text-magenta"
        )}>
          {title}
        </h3>

        {subtitle && (
          <p className={cn(
            "text-base sm:text-lg font-medium mb-3",
            "text-slate-600",
            "dark:text-dark-text"
          )}>
            {subtitle}
          </p>
        )}

        <p className={cn(
          "leading-relaxed mb-4",
          "text-slate-600",
          "dark:text-dark-text"
        )}>
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200",
            "text-slate-900 group-hover:text-magenta",
            "dark:text-dark-text dark:group-hover:text-magenta"
          )}>
            {t('common').readMore}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          {viewCount !== undefined && viewCount > 0 && (
            <span className="flex items-center gap-1 text-sm text-slate-500 dark:text-dark-textMuted">
              <Eye className="w-4 h-4" />
              {viewCount.toLocaleString()}
            </span>
          )}
        </div>
      </a>
    </motion.article>
  )
}

// Memoize to prevent unnecessary re-renders when props haven't changed
export default memo(ArticleCardComponent)
