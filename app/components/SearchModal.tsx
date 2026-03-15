"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, FileText } from "lucide-react"
import { articles, Article } from "@/app/data/articles"
import { articleContent } from "@/app/data/articles/content"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// 自定义 debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Article[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

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
      // Check title, subtitle, description, and category
      const basicMatch =
        article.title.toLowerCase().includes(searchTerm) ||
        (article.subtitle && article.subtitle.toLowerCase().includes(searchTerm)) ||
        article.description.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)

      if (basicMatch) return true

      // Check article body content
      const content = articleContent[article.slug]
      if (content) {
        return content.toLowerCase().includes(searchTerm)
      }

      return false
    })
    setResults(filtered)
  }, [debouncedQuery])

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[70]"
          >
            <div className="bg-white dark:bg-dark-surface rounded-xl shadow-2xl border border-slate-200 dark:border-dark-border overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center px-4 border-b border-slate-200 dark:border-dark-border">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="flex-1 px-3 py-4 bg-transparent text-slate-900 dark:text-dark-text placeholder-slate-400 focus:outline-none"
                />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto">
                  {results.map((article) => (
                    <Link
                      key={article.id}
                      href={`/${article.slug}`}
                      onClick={handleClose}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-dark-border last:border-0"
                    >
                      <FileText className="w-5 h-5 text-magenta mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-slate-900 dark:text-dark-text line-clamp-1">
                          {article.title}
                        </h4>
                        {article.subtitle && (
                          <p className="text-xs text-slate-500 dark:text-dark-textMuted line-clamp-1">
                            {article.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                          {article.category} · {article.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.trim() && results.length === 0 && (
                <div className="px-4 py-8 text-center text-slate-500 dark:text-dark-textMuted">
                  No articles found for "{query}"
                </div>
              )}

              {/* Empty state */}
              {!query.trim() && (
                <div className="px-4 py-8 text-center text-slate-500 dark:text-dark-textMuted text-sm">
                  Start typing to search articles...
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
