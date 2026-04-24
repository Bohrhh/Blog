"use client"

import { memo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye, Star } from "lucide-react"
import { Article, categoryColors } from "@/app/data/articles"
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
  const { title, description, subtitle, category } = getTranslatedContent(article, language)

  const colors = category ? categoryColors[category] || categoryColors.General : categoryColors.General

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
    >
      <Link
        href={`/${article.slug}`}
        className={cn(
          "group block rounded-xl border transition-all duration-300",
          article.featured
            ? "bg-magenta/[0.02] dark:bg-magenta/5 border-magenta/20 dark:border-magenta/30"
            : "bg-white/70 dark:bg-dark-surface/60 border-slate-200/70 dark:border-dark-border/60",
          "hover:border-magenta/40 dark:hover:border-magenta/40",
          "hover:shadow-lg hover:shadow-magenta/5 dark:hover:shadow-magenta/10",
          "hover:-translate-y-0.5",
          article.featured && "relative overflow-hidden"
        )}
        onMouseEnter={() => playSound("hover")}
      >
        {article.featured && (
          <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-magenta" />
        )}
        <div className="p-6">
          {/* Top row: category + date + featured */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {category && (
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full",
                  colors.bg,
                  colors.text
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
                  {category}
                </span>
              )}
              <span className="text-xs text-slate-400 dark:text-dark-textMuted">
                {article.date}
              </span>
            </div>
            {article.featured && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-magenta/10 text-magenta">
                <Star className="w-3 h-3" />
                {t("article").featured}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            "text-xl sm:text-2xl font-bold mb-2 transition-colors duration-200",
            "text-slate-900 group-hover:text-magenta",
            "dark:text-dark-text dark:group-hover:text-magenta"
          )}>
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className={cn(
              "text-base sm:text-lg font-medium mb-3",
              "text-slate-600",
              "dark:text-dark-text"
            )}>
              {subtitle}
            </p>
          )}

          {/* Description */}
          <p className={cn(
            "leading-relaxed mb-4 line-clamp-2",
            "text-slate-600",
            "dark:text-dark-textMuted"
          )}>
            {description}
          </p>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-dark-border/50">
            <span className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200",
              "text-slate-700 group-hover:text-magenta",
              "dark:text-dark-text dark:group-hover:text-magenta"
            )}>
              {t("common").readMore}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-dark-textMuted">
              <span>{article.readTime}</span>
              {viewCount !== undefined && viewCount > 0 && (
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  {viewCount.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

// Memoize to prevent unnecessary re-renders when props haven't changed
export default memo(ArticleCardComponent)
