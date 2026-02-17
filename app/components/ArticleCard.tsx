"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Article } from "@/app/data/articles"
import { useSound } from "@/app/context/SoundContext"

interface ArticleCardProps {
  article: Article
  index: number
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const { playSound } = useSound()

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.05
      }}
      className="group py-6 border-b border-slate-200 last:border-b-0"
    >
      <a
        href={`/${article.slug}`}
        className="block"
        onMouseEnter={() => playSound("hover")}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-magenta transition-colors duration-200 mb-2">
          {article.title}
        </h3>

        {article.subtitle && (
          <p className="text-base sm:text-lg text-slate-600 font-medium mb-3">
            {article.subtitle}
          </p>
        )}

        <p className="text-slate-600 leading-relaxed mb-4">
          {article.description}
        </p>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover:text-magenta transition-colors duration-200">
          Read more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </a>
    </motion.article>
  )
}
