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
      <h3 className="text-sm font-semibold tracking-widest text-magenta uppercase">
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
                "px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 border",
                "hover:scale-105 hover:shadow-sm",
                colors.bg,
                colors.text,
                colors.border
              )}
            >
              {category}
            </MotionLink>
          )
        })}
      </div>
    </div>
  )
}
