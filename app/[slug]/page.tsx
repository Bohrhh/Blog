import { getArticleBySlug, getAllArticleSlugs } from "@/app/data/articles"
import { notFound } from "next/navigation"
import ArticleNavbar from "@/app/components/ArticleNavbar"
import ArticleHeader from "@/app/components/ArticleHeader"
import ArticleBody from "@/app/components/ArticleBody"
import RelatedArticles from "@/app/components/RelatedArticles"

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

  return (
    <main className="min-h-screen">
      <ArticleNavbar />

      {/* 文章内容 */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        {/* 文章主体 - 始终居中显示 */}
        <div className="max-w-3xl mx-auto">
          {/* 文章头部信息 - 支持语言切换 */}
          <ArticleHeader article={article} slug={slug} />

          {/* 分割线 */}
          <div className="border-t border-slate-200 dark:border-dark-border mb-8" />

          {/* 文章正文 - 支持语言切换 */}
          <ArticleBody slug={slug} />

          {/* 相关文章 */}
          <RelatedArticles currentSlug={slug} category={article.category} />
        </div>
      </article>
    </main>
  )
}
