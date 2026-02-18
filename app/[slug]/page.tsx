import { getArticleBySlug, getAllArticleSlugs } from "@/app/data/articles"
import { getArticleContent } from "@/app/data/articles/content"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import ArticleContent from "@/app/components/ArticleContent"

interface PageProps {
  params: Promise<{ slug: string }>
}

// 生成静态路径
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

// 生成页面元数据
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: `${article.title} | KMLeeX Blog`,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // 获取 Markdown 内容
  const content = getArticleContent(slug)

  return (
    <main className="min-h-screen">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-magenta dark:hover:text-magenta transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>

          <Link href="/" className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
            <span className="text-blue-500">KMLee</span>
            <span className="text-amber-400">X</span>
            <span className="text-blue-500">Blog</span>
          </Link>

          <div className="w-20" />
        </div>
      </nav>

      {/* 文章内容 */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* 文章头部信息 */}
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
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
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {article.subtitle}
              </p>
            )}
          </header>

          {/* 分割线 */}
          <div className="border-t border-slate-200 dark:border-slate-700 mb-8" />

          {/* 文章正文 */}
          <ArticleContent content={content} />
        </div>
      </article>
    </main>
  )
}
