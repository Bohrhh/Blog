"use client"

import { categories, categoryColors } from "@/app/data/articles"
import { cn, MotionLink } from "@/app/lib/utils"
import { useSound } from "@/app/context/AppContext"
import { useTranslation } from "@/app/lib/i18n"

export default function CategoryTags() {
  const { playSound } = useSound()
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <h3 className="text-caption font-semibold uppercase tracking-widest text-magenta">
        {t('common').browseByCategory}
      </h3>

      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const colors = categoryColors[category] || categoryColors.General
          return (
            <MotionLink
              key={category}
              href={`/category/${category.toLowerCase()}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onMouseEnter={() => playSound("hover")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-body-sm font-medium rounded-full border transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-e1",
                colors.bg,
                colors.text,
                colors.border
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", colors.dot)} />
              {category}
            </MotionLink>
          )
        })}
      </div>
    </div>
  )
}
