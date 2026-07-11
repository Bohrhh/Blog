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
      className="text-body text-slate-700 dark:text-[#d4d8df]"
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h1 id={id} className="text-h1 text-balance text-slate-900 dark:text-dark-text mt-8 mb-6 scroll-mt-24">
                {children}
              </h1>
            )
          },
          h2: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h2 id={id} className="text-h2 text-balance text-slate-900 dark:text-dark-text mt-10 mb-4 scroll-mt-24">
                {children}
              </h2>
            )
          },
          h3: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h3 id={id} className="text-h3 text-slate-900 dark:text-dark-text mt-6 mb-2 scroll-mt-24">
                {children}
              </h3>
            )
          },
          h4: ({ children }) => {
            const id = slugify(extractText(children))
            return (
              <h4 id={id} className="text-h4 text-slate-900 dark:text-dark-text mt-6 mb-2 scroll-mt-24">
                {children}
              </h4>
            )
          },
          p: ({ children }) => (
            <p className="text-pretty mb-5 lg:text-body-lg">
              {children}
            </p>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-magenta underline decoration-magenta/30 underline-offset-2 hover:decoration-magenta transition-colors"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 dark:text-dark-text">
              {children}
            </strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-5 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-5 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="marker:text-slate-400 dark:marker:text-dark-textMuted">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-6 pl-5 pr-4 py-2 border-l-2 border-magenta/40 bg-slate-50/60 dark:bg-white/[0.03] rounded-r-card italic text-slate-600 dark:text-dark-textMuted">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-slate-200/60 dark:border-white/[0.06]" />,
          img: ({ src, alt }) => (
            // Markdown images can be arbitrary/external URLs with unknown
            // dimensions, so next/image is not a fit here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt || ""}
              loading="lazy"
              className="rounded-card shadow-e2 my-6 max-w-full h-auto mx-auto"
            />
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-card border border-slate-200/60 dark:border-white/[0.06]">
              <table className="w-full border-collapse text-body-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-slate-50 dark:bg-white/[0.03]">{children}</thead>,
          th: ({ children }) => (
            <th className="border-b border-slate-200/60 dark:border-white/[0.06] px-3 py-2 text-left font-semibold text-slate-900 dark:text-dark-text">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-slate-100 dark:border-white/[0.04] px-3 py-2">
              {children}
            </td>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md border border-slate-200/60 dark:border-white/[0.06] bg-slate-100 dark:bg-dark-surfaceHover text-magenta text-[0.875em] font-mono"
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
