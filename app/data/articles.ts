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
  Animation: { bg: "bg-violet-50 dark:bg-violet-500/10", text: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-500/20", dot: "bg-violet-500" },
  CSS: { bg: "bg-sky-50 dark:bg-sky-500/10", text: "text-sky-700 dark:text-sky-300", border: "border-sky-200 dark:border-sky-500/20", dot: "bg-sky-500" },
  Career: { bg: "bg-amber-50 dark:bg-amber-500/10", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-500/20", dot: "bg-amber-500" },
  General: { bg: "bg-slate-100 dark:bg-slate-700/30", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-600/40", dot: "bg-slate-500" },
  "Next.js": { bg: "bg-slate-100 dark:bg-slate-500/10", text: "text-slate-700 dark:text-slate-300", border: "border-slate-200 dark:border-slate-500/20", dot: "bg-slate-500" },
  React: { bg: "bg-cyan-50 dark:bg-cyan-500/10", text: "text-cyan-700 dark:text-cyan-300", border: "border-cyan-200 dark:border-cyan-500/20", dot: "bg-cyan-500" },
  SVG: { bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-500/20", dot: "bg-emerald-500" },
  "Web Development": { bg: "bg-indigo-50 dark:bg-indigo-500/10", text: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", dot: "bg-indigo-500" },
}

export const popularContent: string[] = []
