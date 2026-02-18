"use client"

import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface ArticleContentProps {
  content: string
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
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-6 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mt-4 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="text-slate-700 dark:text-slate-300 ml-4">
              {children}
            </li>
          ),
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isInline = !match

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-magenta text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              )
            }

            // 代码块 - 使用语法高亮
            return (
              <SyntaxHighlighter
                // @ts-expect-error - types mismatch
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: "0 0 1rem 0",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
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
