"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ArticleNavbarProps {
  showBackButton?: boolean
}

export default function ArticleNavbar({ showBackButton = true }: ArticleNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-slate-900 backdrop-blur-lg backdrop-saturate-150 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {showBackButton ? (
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-magenta dark:hover:text-magenta transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        ) : (
          <div />
        )}

        <Link href="/" className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
          <span className="text-blue-500">KMLee</span>
          <span className="text-amber-400">X</span>
          <span className="text-blue-500">Blog</span>
        </Link>

        <div className="w-20" />
      </div>
    </nav>
  )
}
