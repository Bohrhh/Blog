"use client"

import { motion } from "framer-motion"
import { categories } from "@/app/data/articles"

export default function CategoryTags() {
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
            className="px-4 py-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full
                       hover:bg-blue-200 transition-colors duration-150"
          >
            {category}
          </motion.a>
        ))}
      </div>
    </div>
  )
}
