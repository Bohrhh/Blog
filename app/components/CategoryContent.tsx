"use client"

import { useTranslation } from "@/app/lib/i18n"
import { Article } from "@/app/data/articles"

interface CategoryContentProps {
  categoryName: string
  articles: Article[]
}

export default function CategoryContent({ categoryName, articles }: CategoryContentProps) {
  const { t, language } = useTranslation()

  // Get translated category name
  const getCategoryName = () => {
    if (language === "zh") {
      const categoryMap: Record<string, string> = {
        css: "CSS",
        react: "React",
        animation: "动画",
        career: "职场",
        javascript: "JavaScript",
        svg: "SVG",
        nextjs: "Next.js",
        general: "综合",
      }
      return categoryMap[categoryName.toLowerCase()] || categoryName
    }
    return categoryName
  }

  const count = articles.length
  const articleText = language === "zh"
    ? (count === 1 ? "篇文章" : "篇文章")
    : (count === 1 ? "article" : "articles")

  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-dark-text mb-3">
        {getCategoryName()}
      </h1>
      <p className="text-slate-600 dark:text-dark-textMuted">
        {count} {articleText}
      </p>
    </header>
  )
}
