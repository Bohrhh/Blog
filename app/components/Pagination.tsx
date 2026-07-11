"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { PAGINATION } from "@/app/lib/constants"
import { getPageNumbers } from "@/app/lib/pagination"
import { useTranslation } from "@/app/lib/i18n"

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
  const { t } = useTranslation()

  // Don't render if there's only 1 page or less
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

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
      aria-label={t('common').pagination}
    >
      {/* Previous button */}
      <a
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-card text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40",
          currentPage > 1
            ? "text-slate-700 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-magenta"
            : "text-slate-300 dark:text-dark-textMuted cursor-not-allowed"
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">{t('common').prev}</span>
      </a>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => (
          <span key={index}>
            {page === PAGINATION.ELLIPSIS ? (
              <span className="px-3 py-2 text-slate-400 dark:text-dark-textMuted">
                ...
              </span>
            ) : (
              <a
                href={getPageUrl(page)}
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-card text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40",
                  page === currentPage
                    ? "bg-magenta text-white shadow-glow"
                    : "text-slate-700 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-magenta"
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
          "flex items-center gap-1 px-3 py-2 rounded-card text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40",
          currentPage < totalPages
            ? "text-slate-700 dark:text-dark-text hover:bg-slate-100 dark:hover:bg-dark-surfaceHover hover:text-magenta"
            : "text-slate-300 dark:text-dark-textMuted cursor-not-allowed"
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:inline">{t('common').next}</span>
        <ChevronRight className="w-4 h-4" />
      </a>
    </motion.nav>
  )
}
