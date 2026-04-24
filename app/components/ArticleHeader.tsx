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
  const { language } = useLanguage()
  const { category } = getTranslatedContent(article, language)

  return (
    <header className="mb-8">
      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-dark-textMuted mb-6 flex-wrap">
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
    </header>
  )
}
