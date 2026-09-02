"use client"

import { useEffect, useState } from "react"
import { codeToHtml } from "shiki/bundle/web"
import { Check, Copy } from "lucide-react"
import { useTranslation } from "@/app/lib/i18n"
import { cn } from "@/app/lib/utils"

// Grammars referenced by articles that shiki doesn't bundle under that name.
const LANG_ALIASES: Record<string, string> = {
  react: "jsx",
  svg: "xml",
}

function resolveLanguage(language: string): string {
  return LANG_ALIASES[language] || language || "text"
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

interface CodeHighlighterProps {
  language: string
  code: string
}

export default function CodeHighlighter({ language, code }: CodeHighlighterProps) {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState<string | null>(null)
  const { t } = useTranslation()

  useEffect(() => {
    let cancelled = false
    const lang = resolveLanguage(language)

    codeToHtml(code, { lang, theme: "one-dark-pro" })
      .then((result) => {
        if (!cancelled) setHtml(result)
      })
      .catch((err) => {
        console.error("shiki failed:", err)
        // Unknown grammar — render as plain text rather than failing.
        if (!cancelled) {
          setHtml(`<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`)
        }
      })

    return () => {
      cancelled = true
    }
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  const label = copied ? t("article").copied : t("article").copyCode

  return (
    <div className="my-5 rounded-card border border-slate-800/60 dark:border-white/[0.06] bg-slate-900 dark:bg-[#0f1115] shadow-e1 overflow-hidden">
      {/* Header bar: language label + copy button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.03]">
        <span className="text-caption font-mono uppercase tracking-wider text-slate-400">
          {language || "text"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={label}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-caption transition-colors",
            copied
              ? "text-emerald-400"
              : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]"
          )}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {label}
        </button>
      </div>
      <div
        className="article-code"
        dangerouslySetInnerHTML={{ __html: html ?? `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>` }}
      />
    </div>
  )
}
