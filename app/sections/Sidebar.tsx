"use client"

import { motion } from "framer-motion"
import AuthorCard from "@/app/components/AuthorCard"
import CategoryTags from "@/app/components/CategoryTags"
import PopularContent from "@/app/components/PopularContent"

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-8 py-8"
    >
      <AuthorCard />
      <CategoryTags />
      <PopularContent />
    </motion.aside>
  )
}
