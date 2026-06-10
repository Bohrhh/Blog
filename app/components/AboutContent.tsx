"use client"

import { motion } from "framer-motion"
import { Code2, Palette, Zap, Globe, Github, Twitter, Coffee, Heart } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { useTranslation } from "@/app/lib/i18n"
import { glassPanelClasses } from "@/app/components/GlassPanel"

const skillIcons = [
  { icon: Code2, key: "skillReact" },
  { icon: Palette, key: "skillCss" },
  { icon: Zap, key: "skillNextjs" },
  { icon: Globe, key: "skillPerf" },
]

export default function AboutContent() {
  const { t } = useTranslation()
  const about = t("about")

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-magenta/10 flex items-center justify-center">
          <span className="text-3xl font-bold text-magenta">K</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-dark-text mb-3">
          {about.heading}
        </h1>
        <p className="text-lg text-slate-600 dark:text-dark-textMuted max-w-md mx-auto">
          {about.shortBio}
        </p>
      </motion.div>

      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={cn(glassPanelClasses, "p-6 mb-8")}
      >
        <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-4">
          {about.intro}
        </p>
        <p className="text-slate-700 dark:text-dark-text leading-relaxed">
          {about.fullBio}
        </p>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-sm font-semibold tracking-widest text-magenta uppercase mb-4">
          {about.focusAreas}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillIcons.map((skill, index) => {
            const Icon = skill.icon
            const titleKey = skill.key as keyof typeof about
            const descKey = (`${skill.key}Desc`) as keyof typeof about
            return (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className={cn(
                  glassPanelClasses,
                  "flex items-start gap-4 p-5",
                  "hover:border-magenta/30 transition-colors duration-200"
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-magenta/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-magenta" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-dark-text mb-1">
                    {about[titleKey] as string}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-dark-textMuted">
                    {about[descKey] as string}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Blog Purpose */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={cn(glassPanelClasses, "p-6 mb-8")}
      >
        <div className="flex items-center gap-2 mb-3">
          <Coffee className="w-5 h-5 text-magenta" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-dark-text">
            {about.aboutBlog}
          </h2>
        </div>
        <p className="text-slate-700 dark:text-dark-text leading-relaxed">
          {about.aboutBlogDesc}
        </p>
      </motion.div>

      {/* Get in Touch */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-magenta" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-dark-text">
            {about.connect}
          </h2>
        </div>
        <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-6">
          {about.connectDesc}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors",
              "bg-slate-900 dark:bg-dark-surfaceHover text-white",
              "hover:bg-magenta"
            )}
          >
            <Github className="w-4 h-4" />
            {about.github}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-colors",
              "bg-slate-900 dark:bg-dark-surfaceHover text-white",
              "hover:bg-magenta"
            )}
          >
            <Twitter className="w-4 h-4" />
            {about.twitter}
          </a>
        </div>
      </motion.div>
    </div>
  )
}
