import { getArticleBySlug, getAllArticleSlugs } from "@/app/data/articles"
import { getArticleContent } from "@/app/data/articles/content"
import { notFound } from "next/navigation"
import ArticleNavbar from "@/app/components/ArticleNavbar"
import ArticleHeader from "@/app/components/ArticleHeader"
import ArticleBody from "@/app/components/ArticleBody"
import TableOfContents from "@/app/components/TableOfContents"
import RelatedArticles from "@/app/components/RelatedArticles"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return { title: "Article Not Found" }
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

  const contentEn = getArticleContent(slug, "en")
  const contentZh = getArticleContent(slug, "zh")

  return (
    <main className="min-h-screen">
      <ArticleNavbar />

      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="xl:grid xl:grid-cols-[1fr_48rem_16rem] xl:gap-8">
            {/* Left spacer - pushes content to center on desktop */}
            <div className="hidden xl:block" />

            {/* Main content - centered on mobile, in middle column on desktop */}
            <div className="max-w-3xl mx-auto xl:mx-0 w-full">
              <ArticleHeader article={article} slug={slug} />

              <div className="border-t border-slate-200/60 dark:border-white/[0.06] mb-8" />

              <ArticleBody slug={slug} />

              <RelatedArticles currentSlug={slug} category={article.category} />
            </div>

            {/* Table of Contents - right column on desktop */}
            <aside className="hidden xl:block">
              <TableOfContents contentEn={contentEn} contentZh={contentZh} />
            </aside>
          </div>
        </div>
      </article>
    </main>
  )
}
