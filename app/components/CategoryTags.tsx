"use client"

import { motion } from "framer-motion"
import { categories } from "@/app/data/articles"
import { cn } from "@/app/lib/utils"
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
        {categories.map((category, index) => (
          <motion.a
            key={category}
            href={`/category/${category.toLowerCase()}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onMouseEnter={() => playSound("hover")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors duration-150",
              "text-blue-800 bg-blue-100 hover:bg-blue-200",
              "dark:text-blue-300 dark:bg-[#2a2a2a] dark:hover:bg-[#3a3a3a]"
            )}
          >
            {category}
          </motion.a>
        ))}
      </div>
    </div>
  )
}
