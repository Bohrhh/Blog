import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getArticlesByCategory, getAllCategories } from "@/app/data/articles"
import ArticleNavbar from "@/app/components/ArticleNavbar"
import ArticleList from "@/app/sections/ArticleList"
import CategoryContent from "@/app/components/CategoryContent"

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
          <CategoryContent categoryName={categoryName} articles={articles} />

          {/* 文章列表 */}
          <Suspense fallback={null}>
            <ArticleList articles={articles} basePath={`/category/${category}`} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
