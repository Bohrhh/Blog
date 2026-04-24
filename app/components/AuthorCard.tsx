"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Mail } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useTranslation } from "@/app/lib/i18n"

export default function AuthorCard() {
  const { t } = useTranslation()
  const author = t("author")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-xl border p-5",
        "bg-white/70 dark:bg-dark-surface/60 backdrop-blur-sm",
        "border-slate-200/70 dark:border-dark-border/60"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-magenta/10 flex items-center justify-center text-magenta font-bold text-lg">
          {author.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-dark-text">
            {author.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-dark-textMuted">
            {author.role}
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-dark-textMuted leading-relaxed mb-4">
        {author.bio}
      </p>
      <div className="flex items-center gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 rounded-lg transition-colors",
            "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
            "text-slate-500 hover:text-magenta dark:text-dark-textMuted"
          )}
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 rounded-lg transition-colors",
            "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
            "text-slate-500 hover:text-magenta dark:text-dark-textMuted"
          )}
          aria-label="Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href="mailto:hello@kmleex.com"
          className={cn(
            "p-2 rounded-lg transition-colors",
            "hover:bg-slate-100 dark:hover:bg-dark-surfaceHover",
            "text-slate-500 hover:text-magenta dark:text-dark-textMuted"
          )}
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
}
