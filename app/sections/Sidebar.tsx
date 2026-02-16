"use client"

import { motion } from "framer-motion"
import CategoryTags from "@/app/components/CategoryTags"
import PopularContent from "@/app/components/PopularContent"

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-10 py-8"
    >
      <CategoryTags />
      <PopularContent />
    </motion.aside>
  )
}
