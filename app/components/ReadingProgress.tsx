"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(scrollPercent, 100))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      className="absolute bottom-0 inset-x-0 h-0.5 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="h-full bg-gradient-to-r from-magenta to-sky-deep transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </motion.div>
  )
}
