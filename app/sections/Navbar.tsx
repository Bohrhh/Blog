"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Volume2, VolumeX, Sun, Rss, Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useSound } from "@/app/context/SoundContext"

const navItems = [
  { label: "Categories", hasDropdown: true },
  { label: "Courses", hasDropdown: true },
  { label: "Goodies", hasDropdown: true },
  { label: "About", href: "#about" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isSoundEnabled, toggleSound } = useSound()

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
          <span className="text-blue-500">KMLee</span>
          <span className="text-amber-400">X</span>
          <span className="text-blue-500">Blog</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "px-3 py-2 text-sm font-medium text-slate-800 rounded-lg",
                "hover:text-magenta transition-colors duration-200",
                "flex items-center gap-1"
              )}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-1">
          <button
            className="p-2 text-slate-700 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSound}
            className={cn(
              "hidden sm:flex p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
              isSoundEnabled ? "text-magenta" : "text-slate-700"
            )}
            aria-label="Toggle sound"
            aria-pressed={isSoundEnabled}
          >
            {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            className="hidden sm:flex p-2 text-slate-700 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5" />
          </button>

          <a
            href="/rss"
            className="hidden sm:flex p-2 text-slate-700 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50"
            aria-label="RSS Feed"
          >
            <Rss className="w-5 h-5" />
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-700 hover:text-magenta transition-colors duration-200 rounded-lg hover:bg-slate-100/50"
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
          className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-lg"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="w-full px-4 py-3 text-left text-slate-800 hover:text-magenta hover:bg-slate-50 rounded-lg transition-colors duration-200 flex items-center justify-between"
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
