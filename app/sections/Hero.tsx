"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import HeroImage from "@/app/sections/HeroImage"
import CloudBackgroundClient from "@/app/components/CloudBackgroundClient"
import { useTranslation } from "@/app/lib/i18n"

export default function Hero() {
  const { t } = useTranslation()
  const hero = t("hero")

  return (
    <section className="relative min-h-[420px] pt-16 overflow-hidden">
      {/* Cloud Background */}
      <CloudBackgroundClient />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-h2 sm:text-h1 lg:text-display text-slate-900 dark:text-dark-text mb-4">
              {hero.title}
            </h1>
            <p className="text-body-lg text-slate-600 dark:text-dark-textMuted max-w-lg mx-auto md:mx-0 mb-6">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/#articles"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-magenta rounded-card shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:bg-magenta-dark dark:hover:bg-magenta-light focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {hero.browseArticles}
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-card border border-slate-200 dark:border-white/[0.08] bg-white/70 dark:bg-dark-surfaceHover/60 text-slate-700 dark:text-dark-text backdrop-blur-glass shadow-e1 transition-all duration-200 hover:-translate-y-0.5 hover:border-magenta/50 hover:text-magenta hover:shadow-e2 focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta/40"
              >
                {hero.aboutMe}
              </Link>
            </div>
          </motion.div>

          {/* Right side - 3D Character */}
          <HeroImage />
        </div>
      </div>
    </section>
  )
}
