"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { STORAGE_KEYS } from "@/app/lib/constants"
import { safeStorage } from "@/app/lib/utils"
import { en } from "./translations/en"
import { zh } from "./translations/zh"

export type Language = "en" | "zh"

const translations: Record<Language, Record<string, any>> = { en, zh }

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (section: string) => Record<string, any>
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage (only on client)
  useEffect(() => {
    const stored = safeStorage.getItem(STORAGE_KEYS.LANGUAGE) as Language | null
    if (stored && (stored === "en" || stored === "zh")) {
      setLanguage(stored)
    }
    setMounted(true)
  }, [])

  // Persist to localStorage when language changes
  useEffect(() => {
    if (mounted) {
      safeStorage.setItem(STORAGE_KEYS.LANGUAGE, language)
    }
  }, [language, mounted])

  const t = useCallback((section: string) => {
    return translations[language][section]
  }, [language])

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useLanguage must be used within I18nProvider")
  }
  return context
}

export function useTranslation() {
  const { language, setLanguage, t } = useLanguage()
  return { language, setLanguage, t }
}

// Helper to get translated content based on language
export function getTranslatedContent<T extends { titleZh?: string; descriptionZh?: string; subtitleZh?: string; title: string; description: string; subtitle?: string; category?: string; categoryZh?: string }>(
  item: T,
  language: Language
) {
  return {
    title: language === "zh" && item.titleZh ? item.titleZh : item.title,
    description: language === "zh" && item.descriptionZh ? item.descriptionZh : item.description,
    subtitle: language === "zh" && item.subtitleZh ? item.subtitleZh : item.subtitle,
    category: language === "zh" && item.categoryZh ? item.categoryZh : item.category,
  }
}
