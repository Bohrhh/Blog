import howToFixYourEntireLife from "./how-to-fix-your-entire-life-in-1.md?raw"
import howToFixYourEntireLifeZh from "./how-to-fix-your-entire-life-in-1.zh.md?raw"

export const articleContent: Record<string, string> = {
  "how-to-fix-your-entire-life-in-1": howToFixYourEntireLife,
}

export const zhArticleContent: Record<string, string> = {
  "how-to-fix-your-entire-life-in-1": howToFixYourEntireLifeZh,
}

export function getArticleContent(slug: string, lang: "en" | "zh" = "en"): string {
  if (lang === "zh") {
    return zhArticleContent[slug] || articleContent[slug] || "# Content not found\n\nThis article's content is not available."
  }
  return articleContent[slug] || "# Content not found\n\nThis article's content is not available."
}
