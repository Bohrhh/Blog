"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Logo from "@/app/components/Logo"

interface ArticleNavbarProps {
  showBackButton?: boolean
}

export default function ArticleNavbar({ showBackButton = true }: ArticleNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-50/80 dark:bg-dark-surface/80 backdrop-blur-lg backdrop-saturate-150 border-b border-slate-200/50 dark:border-dark-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {showBackButton ? (
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 dark:text-dark-text hover:text-magenta dark:hover:text-magenta transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        ) : (
          <div />
        )}

        <Logo />

        <div className="w-20" />
      </div>
    </nav>
  )
}
