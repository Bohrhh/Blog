"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface CodeHighlighterProps {
  language: string
  code: string
}

export default function CodeHighlighter({ language, code }: CodeHighlighterProps) {
  return (
    <SyntaxHighlighter
      style={oneDark}
      language={language}
      PreTag="div"
      customStyle={{
        margin: "0 0 1rem 0",
        borderRadius: "0.5rem",
        padding: "1rem",
        fontSize: "0.875rem",
        lineHeight: "1.5",
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}
