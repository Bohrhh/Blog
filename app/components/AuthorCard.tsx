"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Mail } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useTranslation } from "@/app/lib/i18n"
import IconButton from "@/app/components/IconButton"
import { glassPanelClasses } from "@/app/components/GlassPanel"

export default function AuthorCard() {
  const { t } = useTranslation()
  const author = t("author")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(glassPanelClasses, "p-5 transition-shadow duration-300 hover:shadow-e2")}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-magenta/10 flex items-center justify-center text-magenta font-bold text-lg ring-1 ring-magenta/20">
          {author.name.charAt(0)}
        </div>
        <div>
          <h4 className="text-h4 font-semibold text-slate-900 dark:text-dark-text">
            {author.name}
          </h4>
          <p className="text-caption text-slate-500 dark:text-dark-textMuted">
            {author.role}
          </p>
        </div>
      </div>
      <p className="text-body-sm text-slate-600 dark:text-dark-textMuted leading-relaxed mb-4">
        {author.bio}
      </p>
      <div className="flex items-center gap-2">
        <IconButton
          icon={<Github className="w-4 h-4" />}
          aria-label="GitHub"
          href="https://github.com"
          external
          variant="footer"
          className="text-slate-500 dark:text-dark-textMuted"
        />
        <IconButton
          icon={<Twitter className="w-4 h-4" />}
          aria-label="Twitter"
          href="https://twitter.com"
          external
          variant="footer"
          className="text-slate-500 dark:text-dark-textMuted"
        />
        <IconButton
          icon={<Mail className="w-4 h-4" />}
          aria-label="Email"
          href="mailto:hello@kmleex.com"
          variant="footer"
          className="text-slate-500 dark:text-dark-textMuted"
        />
      </div>
    </motion.div>
  )
}
