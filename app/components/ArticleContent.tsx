"use client"

import React from "react"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { slugify } from "@/app/lib/utils"

// 懒加载语法高亮组件和主题
const SyntaxHighlighterComponent = dynamic(
  () => import("@/app/components/CodeHighlighter"),
  { ssr: false }
)

interface ArticleContentProps {
  content: string
}

// Extract plain text from React nodes (handles inline elements like <code>, <strong>, etc.)
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node
  if (typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (node && typeof node === "object" && "props" in node && node.props && typeof node.props === "object" && "children" in node.props) {
    return extractText(node.props.children as React.ReactNode)
  }
  return ""
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h1 id={id} className="text-3xl font-bold text-slate-900 dark:text-dark-text mt-8 mb-4 scroll-mt-24">
                {children}
              </h1>
            )
          },
          h2: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h2 id={id} className="text-2xl font-bold text-slate-800 dark:text-dark-text mt-6 mb-3 scroll-mt-24">
                {children}
              </h2>
            )
          },
          h3: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h3 id={id} className="text-xl font-semibold text-slate-800 dark:text-dark-text mt-4 mb-2 scroll-mt-24">
                {children}
              </h3>
            )
          },
          p: ({ children }) => (
            <p className="text-slate-700 dark:text-dark-text leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-slate-700 dark:text-dark-text ml-4">
              {children}
            </li>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-slate-100 dark:bg-dark-surfaceHover rounded text-magenta text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            // 代码块 - 使用懒加载的语法高亮组件
            return (
              <SyntaxHighlighterComponent
                language={match[1]}
                code={String(children).replace(/\n$/, "")}
              />
            )
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  )
}
