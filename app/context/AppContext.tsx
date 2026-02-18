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
  const [mounted, setMounted] = useState(false)

  // Refs
  const audioContextRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const audioUnlockedRef = useRef(false)

  // 尝试解锁 AudioContext
  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // 如果是 suspended，尝试恢复
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().then(() => {
          audioUnlockedRef.current = true
        }).catch(() => {})
      } else {
        audioUnlockedRef.current = true
      }
    } catch (e) {
      console.warn("Failed to unlock audio:", e)
    }
  }, [])

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

    // 读取上次保存的状态，如果没有记录默认开启
    if (stored === "true" || stored === null) {
      setIsSoundEnabled(true)
      unlockAudio()
    }

    setMounted(true)
  }, [unlockAudio])

  // 监听用户交互来解锁音频
  useEffect(() => {
    const handleInteraction = () => {
      if (isSoundEnabled) {
        unlockAudio()
      }
    }

    document.addEventListener("click", handleInteraction, { once: true })
    document.addEventListener("keydown", handleInteraction, { once: true })
    document.addEventListener("touchstart", handleInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [isSoundEnabled, unlockAudio])

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

  // Play sound
  const playSound = useCallback((type: SoundType) => {
    if (!isSoundEnabled) return

    // 确保 AudioContext 存在
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const context = audioContextRef.current

    // 如果是 suspended，先尝试恢复
    if (context.state === "suspended") {
      context.resume().then(() => {
        playTone(context, type)
      }).catch(() => {})
      return
    }

    playTone(context, type)
  }, [isSoundEnabled])

  // 实际播放音效
  const playTone = (context: AudioContext, type: SoundType) => {
    try {
      const oscillator = context.createOscillator()
      const gainNode = context.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(context.destination)

      // 根据类型设置不同的频率和波形
      let frequency = 800
      let duration = 0.05
      let waveType: OscillatorType = "sine"

      switch (type) {
        case "hover":
          frequency = 800
          duration = 0.05
          waveType = "sine"
          break
        case "click":
          frequency = 1000
          duration = 0.08
          waveType = "sine"
          break
        case "success":
          frequency = 880
          duration = 0.1
          waveType = "sine"
          break
        case "notification":
          frequency = 600
          duration = 0.2
          waveType = "triangle"
          break
      }

      oscillator.type = waveType
      oscillator.frequency.setValueAtTime(frequency, context.currentTime)

      gainNode.gain.setValueAtTime(0.1, context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)

      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + duration)
    } catch (e) {
      console.warn("Sound generation error:", e)
    }
  }

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  // Toggle sound
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const newState = !prev
      localStorage.setItem(STORAGE_KEYS.SOUND, newState.toString())

      // 切换时解锁音频
      if (newState) {
        unlockAudio()
      }

      // 播放反馈音效
      setTimeout(() => {
        if (newState) {
          // 开启音效 - 上升双音
          if (audioContextRef.current && audioContextRef.current.state !== "closed") {
            playTone(audioContextRef.current, "success")
          }
        } else {
          // 关闭音效 - 下降双音
          if (audioContextRef.current && audioContextRef.current.state !== "closed") {
            playTone(audioContextRef.current, "success")
          }
        }
      }, 50)

      return newState
    })
  }, [unlockAudio])

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
