"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp } from "lucide-react"
import { useTranslation } from "@/app/lib/i18n"

const SCROLL_THRESHOLD = 300

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-magenta text-white rounded-full shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:bg-magenta-dark dark:hover:bg-magenta-light focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label={t('common').backToTop}
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
