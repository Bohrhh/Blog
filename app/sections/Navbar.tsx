"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { Search, Rss, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/app/lib/utils"
import Logo from "@/app/components/Logo"
import ToolButtons from "@/app/components/ToolButtons"
import { categories } from "@/app/data/articles"
import { useTranslation } from "@/app/lib/i18n"

const SearchModal = dynamic(() => import("@/app/components/SearchModal"), { ssr: false })

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t, language, setLanguage } = useTranslation()

  const handleDropdownClick = (key: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileMenuOpen(true)
    }
    setOpenDropdown(openDropdown === key ? null : key)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-50/80 dark:bg-dark-surface/80 backdrop-blur-lg backdrop-saturate-150 border-b border-slate-200/50 dark:border-dark-border/50"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
          {/* Categories */}
          <div className="relative">
            <button
              onClick={() => handleDropdownClick("Categories")}
              className={cn(
                "px-3 py-2 text-sm font-medium text-slate-800 dark:text-dark-text rounded-lg",
                "hover:text-magenta transition-colors duration-200",
                "flex items-center gap-1 cursor-pointer"
              )}
            >
              {t('nav').categories}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  openDropdown === "Categories" && "rotate-180"
                )}
              />
            </button>

            {openDropdown === "Categories" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "absolute top-full left-0 mt-2 py-2 min-w-[180px] rounded-lg shadow-lg",
                  "bg-white dark:bg-dark-surfaceHover",
                  "border border-slate-200 dark:border-dark-border"
                )}
              >
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-dark-text",
                      "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    {category}
                  </Link>
                ))}
              </motion.div>
            )}
          </div>

          {/* Courses */}
          <div className="relative">
            <button
              onClick={() => handleDropdownClick("Courses")}
              className={cn(
                "px-3 py-2 text-sm font-medium text-slate-800 dark:text-dark-text rounded-lg",
                "hover:text-magenta transition-colors duration-200",
                "flex items-center gap-1 cursor-pointer"
              )}
            >
              {t('nav').courses}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  openDropdown === "Courses" && "rotate-180"
                )}
              />
            </button>

            {openDropdown === "Courses" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "absolute top-full left-0 mt-2 py-2 min-w-[200px] rounded-lg shadow-lg",
                  "bg-white dark:bg-dark-surfaceHover",
                  "border border-slate-200 dark:border-dark-border"
                )}
              >
                <a
                  href="https://css-for-js.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenDropdown(null)}
                  className={cn(
                    "block px-4 py-2 text-sm text-slate-700 dark:text-dark-text",
                    "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
                    "hover:text-magenta transition-colors duration-150"
                  )}
                >
                  {t('nav').cssForJs}
                </a>
                <a
                  href="https://joyofreact.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenDropdown(null)}
                  className={cn(
                    "block px-4 py-2 text-sm text-slate-700 dark:text-dark-text",
                    "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
                    "hover:text-magenta transition-colors duration-150"
                  )}
                >
                  {t('nav').joyOfReact}
                </a>
                <a
                  href="https://whimsy.joshwcomeau.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpenDropdown(null)}
                  className={cn(
                    "block px-4 py-2 text-sm text-slate-700 dark:text-dark-text",
                    "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
                    "hover:text-magenta transition-colors duration-150"
                  )}
                >
                  {t('nav').whimsicalAnimations}
                </a>
              </motion.div>
            )}
          </div>

          {/* About */}
          <Link
            href="/about"
            className={cn(
              "px-3 py-2 text-sm font-medium text-slate-800 dark:text-dark-text rounded-lg",
              "hover:text-magenta transition-colors duration-200"
            )}
          >
            {t('nav').about}
          </Link>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-1">
          <button
            className={cn(
              "p-2 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-dark-surfaceHover/50",
              "text-slate-700 dark:text-dark-text"
            )}
            aria-label={t('nav').search}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>

          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

          <ToolButtons />

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={cn(
              "px-2 py-1 text-xs font-semibold hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-dark-surfaceHover/50",
              "text-slate-700 dark:text-dark-text"
            )}
            aria-label="Toggle language"
          >
            {language === "en" ? "CN" : "EN"}
          </button>

          <a
            href="/rss"
            className={cn(
              "hidden sm:flex p-2 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-dark-surfaceHover/50",
              "text-slate-700 dark:text-dark-text"
            )}
            aria-label={t('nav').rssFeed}
          >
            <Rss className="w-5 h-5" />
          </a>

          {/* Mobile menu button */}
          <button
            className={cn(
              "md:hidden p-2 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-dark-surfaceHover/50",
              "text-slate-700 dark:text-dark-text"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('nav').toggleMenu}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "md:hidden absolute top-16 left-0 right-0 backdrop-blur-sm border-b shadow-lg",
            "bg-white/95 dark:bg-dark-surface/95",
            "border-slate-200 dark:border-dark-border"
          )}
        >
          <div className="px-4 py-4 space-y-2">
            {/* Categories */}
            <div>
              <button
                onClick={() => handleDropdownClick("Categories")}
                className={cn(
                  "w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 flex items-center justify-between",
                  "text-slate-800 hover:text-magenta hover:bg-slate-50",
                  "dark:text-dark-text dark:hover:bg-dark-surfaceHover"
                )}
              >
                {t('nav').categories}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    openDropdown === "Categories" && "rotate-180"
                  )}
                />
              </button>

              {openDropdown === "Categories" && (
                <div className="pl-4 space-y-1 mt-1">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      onClick={() => {
                        setOpenDropdown(null)
                        setMobileMenuOpen(false)
                      }}
                      className={cn(
                        "block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200",
                        "text-slate-600 hover:text-magenta hover:bg-slate-50",
                        "dark:text-dark-textMuted dark:hover:bg-dark-surfaceHover"
                      )}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Courses */}
            <div>
              <button
                onClick={() => handleDropdownClick("Courses")}
                className={cn(
                  "w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 flex items-center justify-between",
                  "text-slate-800 hover:text-magenta hover:bg-slate-50",
                  "dark:text-dark-text dark:hover:bg-dark-surfaceHover"
                )}
              >
                {t('nav').courses}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    openDropdown === "Courses" && "rotate-180"
                  )}
                />
              </button>

              {openDropdown === "Courses" && (
                <div className="pl-4 space-y-1 mt-1">
                  <a
                    href="https://css-for-js.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setOpenDropdown(null)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "block px-4 py-2 rounded-lg transition-colors duration-200",
                      "text-slate-600 hover:text-magenta hover:bg-slate-50",
                      "dark:text-dark-textMuted dark:hover:bg-dark-surfaceHover"
                    )}
                  >
                    {t('nav').cssForJs}
                  </a>
                  <a
                    href="https://joyofreact.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setOpenDropdown(null)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "block px-4 py-2 rounded-lg transition-colors duration-200",
                      "text-slate-600 hover:text-magenta hover:bg-slate-50",
                      "dark:text-dark-textMuted dark:hover:bg-dark-surfaceHover"
                    )}
                  >
                    {t('nav').joyOfReact}
                  </a>
                  <a
                    href="https://whimsy.joshwcomeau.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setOpenDropdown(null)
                      setMobileMenuOpen(false)
                    }}
                    className={cn(
                      "block px-4 py-2 rounded-lg transition-colors duration-200",
                      "text-slate-600 hover:text-magenta hover:bg-slate-50",
                      "dark:text-dark-textMuted dark:hover:bg-dark-surfaceHover"
                    )}
                  >
                    {t('nav').whimsicalAnimations}
                  </a>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg transition-colors duration-200",
                "text-slate-800 hover:text-magenta hover:bg-slate-50",
                "dark:text-dark-text dark:hover:bg-dark-surfaceHover"
              )}
            >
              {t('nav').about}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
