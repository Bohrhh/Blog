"use client"

import { motion } from "framer-motion"
import ArticleCard from "@/app/components/ArticleCard"
import { articles } from "@/app/data/articles"

export default function ArticleList() {
  return (
    <section className="py-8">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold tracking-widest text-magenta uppercase mb-6"
      >
        Articles and Tutorials
      </motion.h2>

      <div className="space-y-0">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  )
}
