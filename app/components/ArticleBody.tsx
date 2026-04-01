"use client"

import { useLanguage } from "@/app/lib/i18n"
import { getArticleContent } from "@/app/data/articles/content"
import ArticleContent from "./ArticleContent"
import TableOfContents from "./TableOfContents"

interface ArticleBodyProps {
  slug: string
}

export default function ArticleBody({ slug }: ArticleBodyProps) {
  const { language } = useLanguage()
  const content = getArticleContent(slug, language)

  return (
    <>
      {/* 文章正文 */}
      <ArticleContent content={content} />

      {/* Table of Contents - 固定在内容右侧 */}
      <aside className="hidden xl:block fixed xl:right-8 2xl:right-[calc(50%-640px)] top-24">
        <TableOfContents content={content} />
      </aside>
    </>
  )
}
