"use client"

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

type SoundType = "hover" | "click" | "success" | "notification"

interface SoundContextType {
  isSoundEnabled: boolean
  toggleSound: () => void
  playSound: (type: SoundType) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  // 初始化 AudioContext（仅在客户端）
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    // 不关闭 AudioContext，让它保持可用
  }, [])

  // 清理所有 setTimeout
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current = []
    }
  }, [])

  // 安全的 setTimeout
  const safeTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      callback()
      timeoutsRef.current = timeoutsRef.current.filter(t => t !== timeout)
    }, delay)
    timeoutsRef.current.push(timeout)
  }, [])

  // 确保 AudioContext 可用
  const ensureAudioContext = useCallback(() => {
    const context = audioContextRef.current
    if (!context) return null

    if (context.state === "suspended") {
      context.resume()
    }

    return context
  }, [])

  // 音效生成器
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

      // 增加音量到 0.3（原来是 0.1）
      gainNode.gain.setValueAtTime(0.1, context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration)

      oscillator.start(context.currentTime)
      oscillator.stop(context.currentTime + duration)
    } catch (e) {
      console.warn("Sound generation error:", e)
    }
  }, [ensureAudioContext])

  // 播放不同类型的音效
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

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const newState = !prev

      const context = ensureAudioContext()
      if (!context || context.state === "closed") {
        return newState
      }

      // 开启或关闭时的反馈音效
      if (newState) {
        // 开启音效 - 上升双音
        generateTone(880, 0.1, "sine")
        safeTimeout(() => generateTone(1100, 0.15, "sine"), 80)
      } else {
        // 关闭音效 - 下降双音
        generateTone(660, 0.1, "sine")
        safeTimeout(() => generateTone(440, 0.15, "sine"), 80)
      }

      return newState
    })
  }, [generateTone, safeTimeout, ensureAudioContext])

  return (
    <SoundContext.Provider value={{ isSoundEnabled, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within SoundProvider")
  }
  return context
}
