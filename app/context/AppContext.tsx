"use client"

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"
import { STORAGE_KEYS } from "@/app/lib/constants"

// 类型定义
type Theme = "light" | "dark"
type SoundType = "hover" | "click" | "success" | "notification"

interface AppContextType {
  // Theme
  theme: Theme
  toggleTheme: () => void

  // Sound
  isSoundEnabled: boolean
  toggleSound: () => void
  playSound: (type: SoundType) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<Theme>("light")

  // Sound state
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)

  // Refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  // Theme initialization
  useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (storedTheme) {
      setTheme(storedTheme)
    } else if (systemPrefersDark) {
      setTheme("dark")
    }

    // Set dark class on document
    if (storedTheme === "dark" || (!storedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Sync theme to document
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme])

  // Sound initialization
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SOUND)
    if (stored === "true") {
      setIsSoundEnabled(true)
    }

    // Initialize AudioContext
    if (typeof window !== "undefined" && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current = []
    }
  }, [])

  // Safe timeout helper
  const safeTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      callback()
      timeoutsRef.current = timeoutsRef.current.filter(t => t !== timeout)
    }, delay)
    timeoutsRef.current.push(timeout)
  }, [])

  // Ensure AudioContext is available
  const ensureAudioContext = useCallback(() => {
    const context = audioContextRef.current
    if (!context) return null

    if (context.state === "suspended") {
      context.resume()
    }

    return context
  }, [])

  // Generate tone
  const generateTone = useCallback((frequency: number, duration: number, type: OscillatorType = "sine") => {
    const context = ensureAudioContext()
    if (!context || context.state === "closed") return

    try {
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)

      oscillator.type = type
      oscillator.frequency.setValueAtTime(frequency, context.currentTime)

      gainNode.gain.setValueAtTime(0.1, context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)

      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + duration)
    } catch (e) {
      console.warn("Sound generation error:", e)
    }
  }, [ensureAudioContext])

  // Play sound
  const playSound = useCallback((type: SoundType) => {
    if (!isSoundEnabled) return

    ensureAudioContext()

    switch (type) {
      case "hover":
        generateTone(800, 0.05, "sine")
        break
      case "click":
        generateTone(1000, 0.08, "sine")
        break
      case "success":
        generateTone(880, 0.1, "sine")
        safeTimeout(() => generateTone(1100, 0.15, "sine"), 80)
        break
      case "notification":
        generateTone(600, 0.2, "triangle")
        break
    }
  }, [isSoundEnabled, generateTone, safeTimeout, ensureAudioContext])

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  // Toggle sound
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const newState = !prev
      localStorage.setItem(STORAGE_KEYS.SOUND, newState.toString())

      const context = ensureAudioContext()
      if (!context || context.state === "closed") {
        return newState
      }

      // Feedback sound
      if (newState) {
        generateTone(880, 0.1, "sine")
        safeTimeout(() => generateTone(1100, 0.15, "sine"), 80)
      } else {
        generateTone(660, 0.1, "sine")
        safeTimeout(() => generateTone(440, 0.15, "sine"), 80)
      }

      return newState
    })
  }, [generateTone, safeTimeout, ensureAudioContext])

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      isSoundEnabled,
      toggleSound,
      playSound,
    }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hooks
export function useTheme() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useTheme must be used within AppProvider")
  }
  return {
    theme: context.theme,
    toggleTheme: context.toggleTheme,
  }
}

export function useSound() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useSound must be used within AppProvider")
  }
  return {
    isSoundEnabled: context.isSoundEnabled,
    toggleSound: context.toggleSound,
    playSound: context.playSound,
  }
}
