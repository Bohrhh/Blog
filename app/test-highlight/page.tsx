"use client"

import CodeHighlighter from "@/app/components/CodeHighlighter"

export default function TestHighlightPage() {
  const sample = `import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}`

  return (
    <main className="max-w-3xl mx-auto py-24 px-6">
      <h1 className="text-2xl font-bold mb-6">Highlight Test</h1>
      <CodeHighlighter language="tsx" code={sample} />
      <div className="mt-8">
        <CodeHighlighter language="css" code={`.card {\n  padding: 1rem;\n  border-radius: 0.75rem;\n}`} />
      </div>
    </main>
  )
}
