"use client"

import { motion } from "framer-motion"
import { Search, Volume2, VolumeX, Sun, Moon, Rss, Github, Linkedin } from "lucide-react"
import { categories } from "@/app/data/articles"
import { useSound } from "@/app/context/SoundContext"
import { useTheme } from "@/app/context/ThemeContext"
import { cn } from "@/app/lib/utils"

const courses = [
  { name: "CSS for JS Developers", href: "https://css-for-js.dev" },
  { name: "The Joy of React", href: "https://joyofreact.com" },
  { name: "Whimsical Animations", href: "https://whimsy.joshwcomeau.com" },
]

const generalLinks = [
  { name: "About Josh", href: "/about" },
  { name: "About This Blog", href: "/about-blog" },
  { name: "Contact", href: "/contact" },
]

export default function Footer() {
  const { isSoundEnabled, toggleSound } = useSound()
  const { theme, toggleTheme } = useTheme()
  return (
    <footer className={cn(
      "border-t mt-16",
      "bg-slate-50 border-slate-200",
      "dark:bg-slate-900 dark:border-slate-800"
    )}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and tagline */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-0.5 text-xl font-bold tracking-tight mb-4">
              <span className="text-blue-500">KMLee</span>
              <span className="text-amber-400">X</span>
              <span className="text-blue-500">Blog</span>
            </a>
            <p className={cn(
              "text-sm leading-relaxed",
              "text-slate-600 dark:text-slate-400"
            )}>
              Keep your ideals high. The sky belongs to no one. ✨
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className={cn(
              "text-sm font-semibold mb-3",
              "text-slate-900 dark:text-slate-100"
            )}>
              Want to know when I publish new content?
            </h4>
            <p className={cn(
              "text-sm mb-4",
              "text-slate-600 dark:text-slate-400"
            )}>
              Enter your email to join my free newsletter:
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className={cn(
                  "flex-1 px-3 py-2 text-sm border rounded-lg",
                  "border-slate-300 bg-white focus:ring-blue-500",
                  "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200",
                  "focus:outline-none focus:ring-2 focus:border-transparent"
                )}
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-slate-900
                         rounded-lg hover:bg-slate-800 transition-colors duration-200
                         dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Browse By Category */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest text-magenta uppercase mb-4">
              Browse By Category
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <a
                    href={`/category/${category.toLowerCase()}`}
                    className={cn(
                      "text-sm transition-colors duration-200",
                      "text-slate-600 hover:text-magenta",
                      "dark:text-slate-400 dark:hover:text-magenta"
                    )}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Courses & General */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold tracking-widest text-magenta uppercase mb-4">
                Interactive Courses
              </h4>
              <ul className="space-y-2">
                {courses.map((course) => (
                  <li key={course.name}>
                    <a
                      href={course.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-sm transition-colors duration-200",
                        "text-slate-600 hover:text-magenta",
                        "dark:text-slate-400 dark:hover:text-magenta"
                      )}
                    >
                      {course.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold tracking-widest text-magenta uppercase mb-4">
                General
              </h4>
              <ul className="space-y-2">
                {generalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors duration-200",
                        "text-slate-600 hover:text-magenta",
                        "dark:text-slate-400 dark:hover:text-magenta"
                      )}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={cn(
          "pt-8 border-t",
          "border-slate-200",
          "dark:border-slate-800"
        )}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Tools */}
            <div className="flex items-center gap-2">
              <button
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100",
                  "dark:hover:bg-slate-800",
                  "text-slate-600 hover:text-magenta",
                  "dark:text-slate-400"
                )}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={toggleSound}
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100",
                  "dark:hover:bg-slate-800",
                  isSoundEnabled ? "text-magenta" : "text-slate-600 dark:text-slate-400"
                )}
                aria-label="Toggle sound"
                aria-pressed={isSoundEnabled}
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100",
                  "dark:hover:bg-slate-800",
                  theme === "dark" ? "text-magenta" : "text-slate-600 dark:text-slate-400"
                )}
                aria-label="Toggle theme"
                aria-pressed={theme === "dark"}
              >
                {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <a
                href="/rss"
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100",
                  "dark:hover:bg-slate-800",
                  "text-slate-600 hover:text-magenta",
                  "dark:text-slate-400"
                )}
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://bsky.app/profile/joshwcomeau.com"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:scale-110 transition-transform",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "text-slate-600 hover:text-magenta",
                  "dark:text-slate-400"
                )}
                aria-label="BlueSky"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </a>
              <a
                href="https://github.com/joshwcomeau"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:scale-110 transition-transform",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "text-slate-600 hover:text-magenta",
                  "dark:text-slate-400"
                )}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/joshwcomeau"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 transition-colors duration-200 rounded-lg hover:scale-110 transition-transform",
                  "hover:bg-slate-100 dark:hover:bg-slate-800",
                  "text-slate-600 hover:text-magenta",
                  "dark:text-slate-400"
                )}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className={cn(
            "mt-6 pt-6 border-t text-center sm:text-left",
            "border-slate-200",
            "dark:border-slate-800"
          )}>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              © 2018-present Joshua Comeau. All Rights Reserved.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-sm">
              <a href="/terms" className={cn(
                "transition-colors duration-200",
                "text-slate-500 hover:text-magenta"
              )}>
                Terms of Use
              </a>
              <a href="/privacy" className={cn(
                "transition-colors duration-200",
                "text-slate-500 hover:text-magenta"
              )}>
                Privacy Policy
              </a>
              <a href="/code-of-conduct" className={cn(
                "transition-colors duration-200",
                "text-slate-500 hover:text-magenta"
              )}>
                Code of Conduct
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
