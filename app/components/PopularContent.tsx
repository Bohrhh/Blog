"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { popularContent } from "@/app/data/articles"

export default function PopularContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-widest text-magenta uppercase">
        Popular Content
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
              className="group flex items-start gap-2 text-slate-800 hover:text-magenta transition-colors duration-200"
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
