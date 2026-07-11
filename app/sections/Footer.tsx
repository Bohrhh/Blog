"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Rss, Github, Linkedin } from "lucide-react"
import { categories } from "@/app/data/articles"
import { cn } from "@/app/lib/utils"
import Logo from "@/app/components/Logo"
import ToolButtons from "@/app/components/ToolButtons"
import { useTranslation } from "@/app/lib/i18n"
import IconButton from "@/app/components/IconButton"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={cn(
      "relative border-t mt-16",
      "border-slate-200/60 dark:border-white/[0.06]",
      "bg-slate-50/60 dark:bg-dark-surface/50",
      "backdrop-blur-glass"
    )}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and tagline */}
          <div className="lg:col-span-1">
            <Logo className="mb-4" />
            <p className={cn(
              "text-body-sm",
              "text-slate-600 dark:text-dark-textMuted"
            )}>
              {t('footer').tagline} ✨
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className={cn(
              "text-h4 mb-3",
              "text-slate-900 dark:text-dark-text"
            )}>
              {t('footer').newsletterTitle}
            </h4>
            <p className={cn(
              "text-body-sm mb-4",
              "text-slate-600 dark:text-dark-textMuted"
            )}>
              {t('footer').newsletterText}
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t('footer').emailPlaceholder}
                className={cn(
                  "flex-1 px-3.5 py-2.5 text-body-sm border rounded-card",
                  "border-slate-200 bg-white/70 dark:bg-dark-surfaceHover/60",
                  "dark:border-white/[0.08] dark:text-dark-text",
                  "focus:outline-none focus:ring-2 focus:ring-magenta/40 focus:border-transparent"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-5 py-2.5",
                  "text-sm font-semibold text-white bg-magenta rounded-card",
                  "shadow-glow transition-all duration-200",
                  "hover:-translate-y-0.5 hover:bg-magenta-dark dark:hover:bg-magenta-light",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/50",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                )}
              >
                {t('footer').submit}
              </button>
            </form>
          </div>

          {/* Browse By Category */}
          <div>
            <h4 className="text-caption font-semibold uppercase tracking-widest text-magenta mb-3">
              {t('footer').browseByCategory}
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${category.toLowerCase()}`}
                    className={cn(
                      "text-body-sm transition-colors duration-200",
                      "text-slate-600 hover:text-magenta",
                      "dark:text-dark-textMuted dark:hover:text-magenta"
                    )}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* General */}
          <div>
            <h4 className="text-caption font-semibold uppercase tracking-widest text-magenta mb-3">
              {t('footer').general}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className={cn(
                    "text-body-sm transition-colors duration-200",
                    "text-slate-600 hover:text-magenta",
                    "dark:text-dark-textMuted dark:hover:text-magenta"
                  )}
                >
                  {t('nav').about}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className={cn(
          "pt-8 border-t",
          "border-slate-200/60 dark:border-white/[0.06]"
        )}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Tools */}
            <div className="flex items-center gap-2">
              <ToolButtons iconSize="sm" className="gap-2" />

              <IconButton
                icon={<Rss className="w-4 h-4" />}
                aria-label={t('social').rssFeed}
                href="/rss"
                variant="footer"
              />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <IconButton
                icon={(
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                )}
                aria-label={t('social').bluesky}
                href="https://bsky.app/profile/joshwcomeau.com"
                external
                variant="social"
              />
              <IconButton
                icon={<Github className="w-4 h-4" />}
                aria-label={t('social').github}
                href="https://github.com/joshwcomeau"
                external
                variant="social"
              />
              <IconButton
                icon={<Linkedin className="w-4 h-4" />}
                aria-label={t('social').linkedin}
                href="https://www.linkedin.com/in/joshwcomeau"
                external
                variant="social"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className={cn(
            "mt-6 pt-6 border-t text-center sm:text-left",
            "border-slate-200/60 dark:border-white/[0.06]"
          )}>
            <p className="text-body-sm text-slate-500 dark:text-dark-textMuted">
              {t('footer').copyright}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-body-sm">
              <Link href="/terms" className={cn(
                "transition-colors duration-200",
                "text-slate-500 dark:text-dark-textMuted hover:text-magenta"
              )}>
                {t('footer').termsOfUse}
              </Link>
              <Link href="/privacy" className={cn(
                "transition-colors duration-200",
                "text-slate-500 dark:text-dark-textMuted hover:text-magenta"
              )}>
                {t('footer').privacyPolicy}
              </Link>
              <Link href="/code-of-conduct" className={cn(
                "transition-colors duration-200",
                "text-slate-500 dark:text-dark-textMuted hover:text-magenta"
              )}>
                {t('footer').codeOfConduct}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
