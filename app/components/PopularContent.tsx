"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { popularContent } from "@/app/data/articles"
import { cn } from "@/app/lib/utils"
import { useSound } from "@/app/context/AppContext"
import { useTranslation } from "@/app/lib/i18n"

export default function PopularContent() {
  const { playSound } = useSound()
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-widest text-magenta uppercase">
        {t('common').popularContent}
      </h3>

      <ul className="space-y-3">
        {popularContent.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <a
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              onMouseEnter={() => playSound("hover")}
              className={cn(
                "group flex items-start gap-2 transition-colors duration-200",
                "text-slate-800 hover:text-magenta",
                "dark:text-dark-text dark:hover:text-magenta"
              )}
            >
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              <span className="leading-snug">{item}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
