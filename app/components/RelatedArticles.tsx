"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { articles as allArticles, categoryColors } from "@/app/data/articles"
import { cn } from "@/app/lib/utils"
import { useTranslation, getTranslatedContent } from "@/app/lib/i18n"
import { glassPanelClasses } from "@/app/components/GlassPanel"

interface RelatedArticlesProps {
  currentSlug: string
  category: string
}

export default function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const { language, t } = useTranslation()

  const related = allArticles
    .filter((a) => a.slug !== currentSlug && a.category === category)
    .slice(0, 3)

  if (related.length === 0) return null

  const colors = categoryColors[category] || categoryColors.General

  return (
    <section className="mt-12 pt-8 border-t border-slate-200/60 dark:border-white/[0.06]">
      <h3 className="text-caption font-semibold uppercase tracking-widest text-magenta mb-6">
        {t("article").relatedArticles}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((article, index) => {
          const { title, description, category: cat } = getTranslatedContent(article, language)
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/${article.slug}`}
                className={cn(
                  glassPanelClasses,
                  "group block h-full p-5 transition-all duration-300",
                  "hover:border-magenta/40",
                  "hover:shadow-e2 hover:-translate-y-0.5"
                )}
              >
                {cat && (
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 text-caption font-medium rounded-full border mb-3",
                    colors.border,
                    colors.bg,
                    colors.text
                  )}>
                    <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
                    {cat}
                  </span>
                )}
                <h4 className={cn(
                  "text-h4 font-semibold mb-2 transition-colors duration-200",
                  "text-slate-900 group-hover:text-magenta",
                  "dark:text-dark-text dark:group-hover:text-magenta-light"
                )}>
                  {title}
                </h4>
                <p className="text-body-sm text-slate-600 dark:text-dark-textMuted line-clamp-2 mb-3">
                  {description}
                </p>
                <span className={cn(
                  "inline-flex items-center gap-1 text-body-sm font-medium transition-colors duration-200",
                  "text-slate-700 group-hover:text-magenta",
                  "dark:text-dark-text dark:group-hover:text-magenta-light"
                )}>
                  {t("common").readMore}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
