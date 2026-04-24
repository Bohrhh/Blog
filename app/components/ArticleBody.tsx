"use client"

import { useLanguage } from "@/app/lib/i18n"
import { getArticleContent } from "@/app/data/articles/content"
import ArticleContent from "./ArticleContent"

interface ArticleBodyProps {
  slug: string
}

export default function ArticleBody({ slug }: ArticleBodyProps) {
  const { language } = useLanguage()
  const content = getArticleContent(slug, language)

  return <ArticleContent content={content} />
}
