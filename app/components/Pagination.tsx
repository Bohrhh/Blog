"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/app/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = "/"
}: PaginationProps) {
  // Don't render if there's only 1 page or less
  if (totalPages <= 1) return null

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath === "/" ? "/" : basePath.replace(/\/$/, "") || "/"
    }
    return `${basePath.replace(/\/$/, "")}?page=${page}`
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center gap-1 mt-8"
      aria-label="Pagination"
    >
      {/* Previous button */}
      <a
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          currentPage > 1
            ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-magenta"
            : "text-slate-300 dark:text-slate-600 cursor-not-allowed"
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </a>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <span key={index}>
            {typeof page === "string" ? (
              <span className="px-3 py-2 text-slate-400 dark:text-slate-500">
                {page}
              </span>
            ) : (
              <a
                href={getPageUrl(page)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
                  page === currentPage
                    ? "bg-magenta text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-magenta"
                )}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </a>
            )}
          </span>
        ))}
      </div>

      {/* Next button */}
      <a
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
        onClick={(e) => currentPage >= totalPages && e.preventDefault()}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          currentPage < totalPages
            ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-magenta"
            : "text-slate-300 dark:text-slate-600 cursor-not-allowed"
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </a>
    </motion.nav>
  )
}
