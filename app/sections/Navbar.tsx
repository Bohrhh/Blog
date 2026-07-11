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
import IconButton from "@/app/components/IconButton"

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
      className="fixed top-0 inset-x-0 z-50 h-16 bg-slate-50/75 dark:bg-dark-surface/70 backdrop-blur-glass-lg backdrop-saturate-150 border-b border-slate-200/60 dark:border-white/[0.06] shadow-e1"
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
                "px-3 py-2 text-body-sm font-medium text-slate-700 dark:text-dark-text rounded-card",
                "hover:text-magenta transition-colors duration-200",
                "flex items-center gap-1 cursor-pointer",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
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
                  "absolute top-full left-0 mt-2 py-2 min-w-[200px] rounded-overlay",
                  "border border-slate-200/70 dark:border-white/[0.08]",
                  "bg-white/90 dark:bg-dark-surface/90",
                  "backdrop-blur-glass-lg backdrop-saturate-150 shadow-e3"
                )}
              >
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block mx-1 px-4 py-2 rounded-card text-body-sm",
                      "text-slate-700 dark:text-dark-text",
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

          {/* About */}
          <Link
            href="/about"
            className={cn(
              "px-3 py-2 text-body-sm font-medium text-slate-700 dark:text-dark-text rounded-card",
              "hover:text-magenta transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
            )}
          >
            {t('nav').about}
          </Link>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-1">
          <IconButton
            icon={<Search className="w-5 h-5" />}
            aria-label={t('nav').search}
            onClick={() => setSearchOpen(true)}
          />

          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

          <ToolButtons />

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={cn(
              "px-2 py-1 text-caption text-slate-700 dark:text-dark-text rounded-card",
              "hover:text-magenta transition-colors duration-200",
              "hover:bg-slate-100/60 dark:hover:bg-dark-surfaceHover/60",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
            )}
            aria-label="Toggle language"
          >
            {language === "en" ? "CN" : "EN"}
          </button>

          <IconButton
            icon={<Rss className="w-5 h-5" />}
            aria-label={t('nav').rssFeed}
            href="/rss"
            className="hidden sm:flex"
          />

          {/* Mobile menu button */}
          <IconButton
            icon={mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            aria-label={t('nav').toggleMenu}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "md:hidden absolute top-16 left-0 right-0",
            "backdrop-blur-glass-lg backdrop-saturate-150",
            "border-b border-slate-200/60 dark:border-white/[0.06]",
            "bg-white/90 dark:bg-dark-surface/90 shadow-e3"
          )}
        >
          <div className="px-4 py-4 space-y-2">
            {/* Categories */}
            <div>
              <button
                onClick={() => handleDropdownClick("Categories")}
                className={cn(
                  "w-full px-4 py-3 text-left rounded-card transition-colors duration-200 flex items-center justify-between",
                  "text-body-sm font-medium text-slate-700 dark:text-dark-text",
                  "hover:text-magenta hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
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
                        "block w-full text-left px-4 py-2 rounded-card transition-colors duration-200",
                        "text-body-sm text-slate-600 dark:text-dark-textMuted",
                        "hover:text-magenta hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
                      )}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-card transition-colors duration-200",
                "text-body-sm font-medium text-slate-700 dark:text-dark-text",
                "hover:text-magenta hover:bg-slate-100 dark:hover:bg-dark-surfaceHover"
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
