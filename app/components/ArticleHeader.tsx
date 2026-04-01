"use client"

import { Calendar, Clock, Tag } from "lucide-react"
import { Article } from "@/app/data/articles"
import { useLanguage, getTranslatedContent } from "@/app/lib/i18n"
import ViewCount from "./ViewCount"

interface ArticleHeaderProps {
  article: Article
  slug: string
}

export default function ArticleHeader({ article, slug }: ArticleHeaderProps) {
  const { language, t } = useLanguage()
  const { title, subtitle, category } = getTranslatedContent(article, language)

  return (
    <header className="mb-8">
      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-dark-textMuted mb-4">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {article.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {article.readTime}
        </span>
        <span className="flex items-center gap-1">
          <Tag className="w-4 h-4" />
          {category}
        </span>
        <ViewCount slug={slug} />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-dark-text mb-3">
        {title}
      </h1>

      {subtitle && (
        <p className="text-xl text-slate-600 dark:text-dark-text">
          {subtitle}
        </p>
      )}
    </header>
  )
}
