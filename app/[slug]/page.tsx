import { getArticleBySlug, getAllArticleSlugs } from "@/app/data/articles"
import { getArticleContent } from "@/app/data/articles/content"
import { notFound } from "next/navigation"
import { Calendar, Clock, Tag } from "lucide-react"
import ArticleNavbar from "@/app/components/ArticleNavbar"
import ArticleContent from "@/app/components/ArticleContent"
import TableOfContents from "@/app/components/TableOfContents"

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
      <ArticleNavbar />

      {/* 文章内容 */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        {/* 文章主体 - 始终居中显示 */}
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

        {/* Table of Contents - 固定在内容右侧 */}
        <aside className="hidden xl:block fixed xl:right-8 2xl:right-[calc(50%-640px)] top-24">
          <TableOfContents content={content} />
        </aside>
      </article>
    </main>
  )
}
