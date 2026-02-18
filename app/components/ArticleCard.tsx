"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Article } from "@/app/data/articles"
import { useSound } from "@/app/context/AppContext"
import { cn } from "@/app/lib/utils"

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
      className={cn(
        "group py-6 border-b last:border-b-0",
        "border-slate-200 dark:border-slate-700"
      )}
    >
      <a
        href={`/${article.slug}`}
        className="block"
        onMouseEnter={() => playSound("hover")}
      >
        <h3 className={cn(
          "text-xl sm:text-2xl font-bold mb-2 transition-colors duration-200",
          "text-slate-900 group-hover:text-magenta",
          "dark:text-white dark:group-hover:text-magenta"
        )}>
          {article.title}
        </h3>

        {article.subtitle && (
          <p className={cn(
            "text-base sm:text-lg font-medium mb-3",
            "text-slate-600",
            "dark:text-slate-300"
          )}>
            {article.subtitle}
          </p>
        )}

        <p className={cn(
          "leading-relaxed mb-4",
          "text-slate-600",
          "dark:text-slate-300"
        )}>
          {article.description}
        </p>

        <span className={cn(
          "inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200",
          "text-slate-900 group-hover:text-magenta",
          "dark:text-white dark:group-hover:text-magenta"
        )}>
          Read more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </span>
      </a>
    </motion.article>
  )
}
