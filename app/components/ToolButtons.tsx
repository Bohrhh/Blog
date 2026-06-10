"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Sun, Moon } from "lucide-react"
import { useSound, useTheme } from "@/app/context/AppContext"
import { cn } from "@/app/lib/utils"
import { useTranslation } from "@/app/lib/i18n"
import IconButton from "@/app/components/IconButton"

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
  const { t } = useTranslation()
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
      <IconButton
        icon={isSoundEnabled ? <Volume2 className={iconClass} /> : <VolumeX className={iconClass} />}
        aria-label={t('toolButtons').toggleSound}
        onClick={toggleSound}
        pressed={isSoundEnabled}
        className={cn(
          showOnMobile ? "flex" : "hidden sm:flex",
          isSoundEnabled && "text-magenta"
        )}
      />

      <IconButton
        icon={theme === "dark" ? <Moon className={iconClass} /> : <Sun className={iconClass} />}
        aria-label={t('toolButtons').toggleTheme}
        onClick={toggleTheme}
        pressed={theme === "dark"}
        className={cn(
          showOnMobile ? "flex" : "hidden sm:flex",
          theme === "dark" && "text-magenta"
        )}
      />
    </div>
  )
}
