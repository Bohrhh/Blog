"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Sun, Moon } from "lucide-react"
import { useSound, useTheme } from "@/app/context/AppContext"
import { cn } from "@/app/lib/utils"

interface ToolButtonsProps {
  className?: string
  showOnMobile?: boolean
  iconSize?: "sm" | "md"
}

export default function ToolButtons({
  className = "",
  showOnMobile = false,
  iconSize = "md"
}: ToolButtonsProps) {
  const { isSoundEnabled, toggleSound } = useSound()
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const iconClass = iconSize === "sm" ? "w-4 h-4" : "w-5 h-5"

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <div className={cn(showOnMobile ? "flex" : "hidden sm:flex", "p-2")}>
          <VolumeX className={iconClass} />
        </div>
        <div className={cn(showOnMobile ? "flex" : "hidden sm:flex", "p-2")}>
          <Moon className={iconClass} />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        onClick={toggleSound}
        className={cn(
          showOnMobile ? "flex" : "hidden sm:flex",
          "p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
          "dark:hover:bg-dark-surfaceHover/50",
          isSoundEnabled ? "text-magenta" : "text-slate-700 dark:text-dark-text"
        )}
        aria-label="Toggle sound"
        aria-pressed={isSoundEnabled}
      >
        {isSoundEnabled ? <Volume2 className={iconClass} /> : <VolumeX className={iconClass} />}
      </button>

      <button
        onClick={toggleTheme}
        className={cn(
          showOnMobile ? "flex" : "hidden sm:flex",
          "p-2 transition-colors duration-200 rounded-lg hover:bg-slate-100/50",
          "dark:hover:bg-dark-surfaceHover/50",
          theme === "dark" ? "text-magenta" : "text-slate-700 dark:text-dark-text"
        )}
        aria-label="Toggle theme"
        aria-pressed={theme === "dark"}
      >
        {theme === "dark" ? <Moon className={iconClass} /> : <Sun className={iconClass} />}
      </button>
    </div>
  )
}
