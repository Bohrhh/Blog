"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Logo from "@/app/components/Logo"
import ReadingProgress from "@/app/components/ReadingProgress"
import { useTranslation } from "@/app/lib/i18n"

interface ArticleNavbarProps {
  showBackButton?: boolean
}

export default function ArticleNavbar({ showBackButton = true }: ArticleNavbarProps) {
  const { t } = useTranslation()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-slate-50/75 dark:bg-dark-surface/70 backdrop-blur-glass-lg backdrop-saturate-150 border-b border-slate-200/60 dark:border-white/[0.06] shadow-e1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between relative">
        {showBackButton ? (
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 dark:text-dark-text hover:text-magenta dark:hover:text-magenta transition-colors rounded-card focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{t('common').back}</span>
          </Link>
        ) : (
          <div />
        )}

        <Logo />

        <div className="w-20" />
      </div>
      <ReadingProgress />
    </nav>
  )
}
