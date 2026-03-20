"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageMotionProps {
  children: ReactNode
}

export default function PageMotion({ children }: PageMotionProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  )
}
