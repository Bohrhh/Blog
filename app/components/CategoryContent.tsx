"use client"

import { useTranslation } from "@/app/lib/i18n"
import { Article } from "@/app/data/articles"

interface CategoryContentProps {
  categoryName: string
  articles: Article[]
}

export default function CategoryContent({ categoryName, articles }: CategoryContentProps) {
  const { t } = useTranslation()
  const count = articles.length

  return (
    <header className="mb-8">
      <h1 className="text-h2 sm:text-h1 text-slate-900 dark:text-dark-text mb-3">
        {categoryName}
      </h1>
      <p className="text-body-lg text-slate-600 dark:text-dark-textMuted">
        {count} {count === 1 ? t("category").article : t("category").articles}
      </p>
    </header>
  )
}
