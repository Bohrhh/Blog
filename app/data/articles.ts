export interface Article {
  id: string
  title: string
  titleZh: string
  subtitle?: string
  subtitleZh?: string
  description: string
  descriptionZh: string
  slug: string
  date: string
  category: string
  categoryZh: string
  readTime: string
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: "1",
    title: "How to Change Your Entire Life in One Day",
    titleZh: "如何在一天内改变你的人生",
    description: "A comprehensive guide to behavior change, psychology, and productivity that can transform your life.",
    descriptionZh: "一篇关于行为改变、心理学和生产力的全面指南，可以改变你的人生。",
    slug: "how-to-fix-your-entire-life-in-1",
    date: "2025-12-23",
    category: "Career",
    categoryZh: "职场",
    readTime: "20 min read",
    featured: true
  }
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return articles.map(article => article.slug)
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(
    article => article.category.toLowerCase() === category.toLowerCase()
  )
}

export function getAllCategories(): string[] {
  return categories
}

export const categories = ["Career"]

export const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Career: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", dot: "bg-amber-500" },
  General: { bg: "bg-slate-100 dark:bg-slate-800/50", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-700", dot: "bg-slate-500" },
}

export const popularContent: string[] = []
