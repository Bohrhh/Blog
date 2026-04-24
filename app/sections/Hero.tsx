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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-dark-text mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-dark-textMuted max-w-lg mx-auto md:mx-0 mb-6 leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                href="/#articles"
                className="px-5 py-2.5 text-sm font-medium text-white bg-magenta rounded-lg hover:bg-magenta-dark transition-colors duration-200 shadow-lg shadow-magenta/20"
              >
                {hero.browseArticles}
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-dark-text bg-white dark:bg-dark-surfaceHover border border-slate-200 dark:border-dark-border rounded-lg hover:border-magenta hover:text-magenta transition-colors duration-200"
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
