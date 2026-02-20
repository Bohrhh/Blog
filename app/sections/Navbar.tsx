"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Rss, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/app/lib/utils"
import Logo from "@/app/components/Logo"
import ToolButtons from "@/app/components/ToolButtons"
import { categories } from "@/app/data/articles"

const navItems = [
  { label: "Categories", hasDropdown: true },
  { label: "Courses", hasDropdown: true },
  { label: "Goodies", hasDropdown: true },
  { label: "About", hasDropdown: true },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-lg backdrop-saturate-150 border-b border-slate-200/50 dark:border-slate-700/50"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1" ref={dropdownRef}>
          {navItems.map((item) => (
            <div key={item.label} className="relative">
              <button
                onClick={() => item.hasDropdown && handleDropdownClick(item.label)}
                className={cn(
                  "px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 rounded-lg",
                  "hover:text-magenta transition-colors duration-200",
                  "flex items-center gap-1",
                  item.hasDropdown && "cursor-pointer"
                )}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )}
                  />
                )}
              </button>

              {/* Categories Dropdown */}
              {item.label === "Categories" && openDropdown === "Categories" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "absolute top-full left-0 mt-2 py-2 min-w-[180px] rounded-lg shadow-lg",
                    "bg-white dark:bg-slate-800",
                    "border border-slate-200 dark:border-slate-700"
                  )}
                >
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      onClick={() => setOpenDropdown(null)}
                      className={cn(
                        "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                        "hover:bg-slate-100 dark:hover:bg-slate-700",
                        "hover:text-magenta transition-colors duration-150"
                      )}
                    >
                      {category}
                    </a>
                  ))}
                </motion.div>
              )}

              {/* About Dropdown */}
              {item.label === "About" && openDropdown === "About" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "absolute top-full left-0 mt-2 py-2 min-w-[180px] rounded-lg shadow-lg",
                    "bg-white dark:bg-slate-800",
                    "border border-slate-200 dark:border-slate-700"
                  )}
                >
                  <a
                    href="/about"
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    About Me
                  </a>
                  <a
                    href="/about-blog"
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    About Blog
                  </a>
                </motion.div>
              )}

              {/* Courses Dropdown */}
              {item.label === "Courses" && openDropdown === "Courses" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "absolute top-full left-0 mt-2 py-2 min-w-[200px] rounded-lg shadow-lg",
                    "bg-white dark:bg-slate-800",
                    "border border-slate-200 dark:border-slate-700"
                  )}
                >
                  <a
                    href="https://css-for-js.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    CSS for JS Developers
                  </a>
                  <a
                    href="https://joyofreact.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    The Joy of React
                  </a>
                  <a
                    href="https://whimsy.joshwcomeau.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    Whimsical Animations
                  </a>
                </motion.div>
              )}

              {/* Goodies Dropdown */}
              {item.label === "Goodies" && openDropdown === "Goodies" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "absolute top-full left-0 mt-2 py-2 min-w-[180px] rounded-lg shadow-lg",
                    "bg-white dark:bg-slate-800",
                    "border border-slate-200 dark:border-slate-700"
                  )}
                >
                  <a
                    href="/goodies"
                    onClick={() => setOpenDropdown(null)}
                    className={cn(
                      "block px-4 py-2 text-sm text-slate-700 dark:text-slate-300",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "hover:text-magenta transition-colors duration-150"
                    )}
                  >
                    All Goodies
                  </a>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-1">
          <button
            className={cn(
              "p-2 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-slate-800/50",
              "text-slate-700 dark:text-slate-300"
            )}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <ToolButtons />

          <a
            href="/rss"
            className={cn(
              "hidden sm:flex p-2 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-slate-800/50",
              "text-slate-700 dark:text-slate-300"
            )}
            aria-label="RSS Feed"
          >
            <Rss className="w-5 h-5" />
          </a>

          {/* Mobile menu button */}
          <button
            className={cn(
              "md:hidden p-2 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              "dark:hover:bg-slate-800/50",
              "text-slate-700 dark:text-slate-300"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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
            "bg-white/95 dark:bg-slate-900/95",
            "border-slate-200 dark:border-slate-700"
          )}
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 flex items-center justify-between",
                  "text-slate-800 hover:text-magenta hover:bg-slate-50",
                  "dark:text-slate-200 dark:hover:bg-slate-800"
                )}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
