"use client"

import { useSearchParams } from "next/navigation"
import { useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"
import ArticleCard from "@/app/components/ArticleCard"
import Pagination from "@/app/components/Pagination"
import { API } from "@/app/lib/constants"
import { articles as defaultArticles, Article } from "@/app/data/articles"

const ITEMS_PER_PAGE = 6

interface ArticleListProps {
  articles?: Article[]
  title?: string
  basePath?: string
  showPagination?: boolean
  showFeaturedFirst?: boolean
}

function ArticleListContent({ articles, title, basePath = "/", showPagination = true, showFeaturedFirst = false }: ArticleListProps) {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1", 10)
  const [views, setViews] = useState<Record<string, number>>({})

  const articleList = articles || defaultArticles

  // Sort featured articles to the top if showFeaturedFirst is true
  const sortedArticles = useMemo(() => {
    if (!showFeaturedFirst) return articleList
    const featured = articleList.filter(a => a.featured)
    const rest = articleList.filter(a => !a.featured)
    return [...featured, ...rest]
  }, [articleList, showFeaturedFirst])

  // Fetch all view counts
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(API.VIEWS)
        const data = await response.json()
        setViews(data)
      } catch (error) {
        console.error("Failed to fetch views:", error)
      }
    }
    fetchViews()
  }, [])

  // Calculate pagination
  const { paginatedArticles, totalPages } = useMemo(() => {
    const total = sortedArticles.length
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
    const validPage = Math.min(Math.max(1, page), totalPages)
    const start = (validPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    const paginated = sortedArticles.slice(start, end)

    return {
      paginatedArticles: paginated,
      totalPages
    }
  }, [sortedArticles, page])

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
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
            viewCount={views[article.slug]}
          />
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
