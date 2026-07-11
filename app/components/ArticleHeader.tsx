"use client"

import { Calendar, Clock } from "lucide-react"
import { Article, categoryColors } from "@/app/data/articles"
import { useLanguage, getTranslatedContent } from "@/app/lib/i18n"
import { cn } from "@/app/lib/utils"
import ViewCount from "./ViewCount"

interface ArticleHeaderProps {
  article: Article
  slug: string
}

export default function ArticleHeader({ article, slug }: ArticleHeaderProps) {
  const { language } = useLanguage()
  const { category } = getTranslatedContent(article, language)

  // Look up the badge color by the canonical (English) category key so the
  // correct hue renders in both EN and ZH; the displayed text stays translated.
  const colors = category
    ? categoryColors[article.category] || categoryColors.General
    : categoryColors.General

  return (
    <header className="mb-8">
      <div className="flex items-center gap-3 flex-wrap text-body-sm text-slate-600 dark:text-dark-textMuted mb-6">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>{article.date}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4 shrink-0" />
          <span>{article.readTime}</span>
        </span>
        {category && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 text-caption font-medium rounded-full border",
              colors.border,
              colors.bg,
              colors.text
            )}
          >
            <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
            {category}
          </span>
        )}
        <ViewCount slug={slug} />
      </div>
    </header>
  )
}
