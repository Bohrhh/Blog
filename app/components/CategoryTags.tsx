"use client"

import { motion } from "framer-motion"
import { categories } from "@/app/data/articles"
import { cn } from "@/app/lib/utils"
import { useSound } from "@/app/context/SoundContext"

export default function CategoryTags() {
  const { playSound } = useSound()

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-widest text-magenta uppercase">
        Browse By Category
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
              "dark:text-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
            )}
          >
            {category}
          </motion.a>
        ))}
      </div>
    </div>
  )
}
