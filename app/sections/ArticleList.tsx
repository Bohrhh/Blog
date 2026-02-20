"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { motion } from "framer-motion"
import ArticleCard from "@/app/components/ArticleCard"
import Pagination from "@/app/components/Pagination"
import { articles as defaultArticles, Article } from "@/app/data/articles"

const ITEMS_PER_PAGE = 6

interface ArticleListProps {
  articles?: Article[]
  title?: string
  basePath?: string
  showPagination?: boolean
}

function ArticleListContent({ articles, title, basePath = "/", showPagination = true }: ArticleListProps) {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1", 10)

  const articleList = articles || defaultArticles

  // Calculate pagination
  const { paginatedArticles, totalPages } = useMemo(() => {
    const total = articleList.length
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
    const validPage = Math.min(Math.max(1, page), totalPages)
    const start = (validPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    const paginated = articleList.slice(start, end)

    return {
      paginatedArticles: paginated,
      totalPages
    }
  }, [articleList, page])

  return (
    <section className="py-8">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold tracking-widest text-magenta uppercase mb-6"
        >
          {title}
        </motion.h2>
      )}

      <div className="space-y-0">
        {paginatedArticles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath={basePath}
        />
      )}
    </section>
  )
}

export default function ArticleList(props: ArticleListProps) {
  return (
    <ArticleListContent {...props} />
  )
}
