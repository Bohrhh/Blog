import { notFound } from "next/navigation"
import { getArticlesByCategory, getAllCategories } from "@/app/data/articles"
import ArticleNavbar from "@/app/components/ArticleNavbar"
import ArticleList from "@/app/sections/ArticleList"

interface PageProps {
  params: Promise<{ category: string }>
}

// 生成静态路径
export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }))
}

// 生成页面元数据
export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const allCategories = getAllCategories()
  const validCategory = allCategories.find(
    c => c.toLowerCase() === category.toLowerCase()
  )

  if (!validCategory) {
    return { title: "Category Not Found | KMLeeX Blog" }
  }

  return {
    title: `${validCategory} | KMLeeX Blog`,
    description: `Browse all ${validCategory} articles on KMLeeX Blog`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  // 验证分类是否存在
  const allCategories = getAllCategories()
  const validCategory = allCategories.find(
    c => c.toLowerCase() === category.toLowerCase()
  )

  if (!validCategory) {
    notFound()
  }

  // 使用原始分类名称（保持大小写）
  const categoryName = validCategory

  // 获取该分类下的文章
  const articles = getArticlesByCategory(category)

  return (
    <main className="min-h-screen">
      <ArticleNavbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* 分类标题 */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {categoryName}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {articles.length} {articles.length === 1 ? "article" : "articles"}
            </p>
          </header>

          {/* 文章列表 */}
          <ArticleList articles={articles} />
        </div>
      </div>
    </main>
  )
}
