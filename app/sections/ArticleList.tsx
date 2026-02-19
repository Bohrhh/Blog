"use client"

import { motion } from "framer-motion"
import ArticleCard from "@/app/components/ArticleCard"
import { articles as defaultArticles, Article } from "@/app/data/articles"

interface ArticleListProps {
  articles?: Article[]
  title?: string
}

export default function ArticleList({ articles, title }: ArticleListProps) {
  const articleList = articles || defaultArticles

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
        {articleList.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  )
}
