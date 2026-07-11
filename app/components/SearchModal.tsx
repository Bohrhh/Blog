"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, FileText } from "lucide-react"
import { articles, Article } from "@/app/data/articles"
import { articleContent, zhArticleContent } from "@/app/data/articles/content"
import Link from "next/link"
import { useTranslation, getTranslatedContent } from "@/app/lib/i18n"
import { useDebounce } from "@/app/lib/hooks"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Article[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { t, language } = useTranslation()

  // 使用 debounce 减少搜索频率
  const debouncedQuery = useDebounce(query, 300)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Search through articles (title, subtitle, description, category, and body content)
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }

    const searchTerm = debouncedQuery.toLowerCase()
    const filtered = articles.filter((article) => {
      const { title, description, subtitle } = getTranslatedContent(article, language)

      // Check title, subtitle, description, and category
      const basicMatch =
        title.toLowerCase().includes(searchTerm) ||
        (subtitle && subtitle.toLowerCase().includes(searchTerm)) ||
        description.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)

      if (basicMatch) return true

      // Check article body content (respect current language)
      const content = language === "zh"
        ? (zhArticleContent[article.slug] || articleContent[article.slug])
        : articleContent[article.slug]
      if (content) {
        return content.toLowerCase().includes(searchTerm)
      }

      return false
    })
    setResults(filtered)
  }, [debouncedQuery, language])

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const handleClose = () => {
    setQuery("")
    setResults([])
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-slate-900/30 dark:bg-black/60 backdrop-blur-glass"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-4 right-4 mx-auto max-w-xl z-[70]"
          >
            <div className="relative rounded-overlay border border-slate-200/70 dark:border-white/[0.08] bg-white/95 dark:bg-dark-surface/95 backdrop-blur-glass-xl backdrop-saturate-150 shadow-e4 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-4 border-b border-slate-200/60 dark:border-white/[0.06]">
                <Search className="w-5 h-5 text-slate-400 dark:text-dark-textMuted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('common').searchPlaceholder}
                  className="flex-1 px-3 py-4 bg-transparent text-body text-slate-900 dark:text-dark-text placeholder-slate-400 dark:placeholder-dark-textMuted focus:outline-none"
                />
                <button
                  onClick={handleClose}
                  className="p-2 rounded-card text-slate-400 dark:text-dark-textMuted hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-magenta transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto">
                  {results.map((article) => {
                    const { title, subtitle } = getTranslatedContent(article, language)
                    return (
                      <Link
                        key={article.id}
                        href={`/${article.slug}`}
                        onClick={handleClose}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-dark-surfaceHover transition-colors border-b border-slate-100 dark:border-white/[0.04] last:border-0"
                      >
                        <FileText className="w-5 h-5 text-magenta mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-body-sm font-medium text-slate-900 dark:text-dark-text line-clamp-1">
                            {title}
                          </h4>
                          {subtitle && (
                            <p className="text-body-sm text-slate-500 dark:text-dark-textMuted line-clamp-1">
                              {subtitle}
                            </p>
                          )}
                          <p className="text-caption text-slate-400 dark:text-dark-textMuted mt-1 line-clamp-1">
                            {article.category} · {article.date}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* No results */}
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-body-sm text-slate-500 dark:text-dark-textMuted">
                  {t('common').noResults(query)}
                </div>
              )}

              {/* Empty state */}
              {!query.trim() && (
                <div className="px-4 py-8 text-center text-body-sm text-slate-500 dark:text-dark-textMuted">
                  {t('common').startSearching}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
