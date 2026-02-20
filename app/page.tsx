"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import Navbar from "@/app/sections/Navbar"
import Hero from "@/app/sections/Hero"
import ArticleList from "@/app/sections/ArticleList"
import Sidebar from "@/app/sections/Sidebar"
import Footer from "@/app/sections/Footer"

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Navbar />
      <Hero />

      {/* Main content area */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Articles - takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Suspense fallback={null}>
              <ArticleList />
            </Suspense>
          </div>

          {/* Sidebar - takes up 1 column on large screens */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </motion.main>
  )
}
