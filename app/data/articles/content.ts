// 文章内容 - 每个文章独立的 Markdown 文件
import cssSubgrid from "./css-subgrid.md?raw"
import linearTimingFunction from "./linear-timing-function.md?raw"
import startingStyle from "./starting-style.md?raw"
import colorShifting from "./color-shifting.md?raw"
import svgPaths from "./svg-paths.md?raw"
import friendlySvg from "./friendly-svg.md?raw"
import partialKeyframes from "./partial-keyframes.md?raw"
import heightEnigma from "./height-enigma.md?raw"
import postDeveloperEra from "./post-developer-era.md?raw"
import whimsicalAnimations from "./whimsical-animations.md?raw"
import containerQueries from "./container-queries.md?raw"
import backdropFilter from "./backdrop-filter.md?raw"
import howToFixYourEntireLife from "./how-to-fix-your-entire-life-in-1.md?raw"

// 中文文章内容
import cssSubgridZh from "./css-subgrid.zh.md?raw"
import linearTimingFunctionZh from "./linear-timing-function.zh.md?raw"
import startingStyleZh from "./starting-style.zh.md?raw"
import colorShiftingZh from "./color-shifting.zh.md?raw"
import svgPathsZh from "./svg-paths.zh.md?raw"
import friendlySvgZh from "./friendly-svg.zh.md?raw"
import partialKeyframesZh from "./partial-keyframes.zh.md?raw"
import heightEnigmaZh from "./height-enigma.zh.md?raw"
import postDeveloperEraZh from "./post-developer-era.zh.md?raw"
import whimsicalAnimationsZh from "./whimsical-animations.zh.md?raw"
import containerQueriesZh from "./container-queries.zh.md?raw"
import backdropFilterZh from "./backdrop-filter.zh.md?raw"
import howToFixYourEntireLifeZh from "./how-to-fix-your-entire-life-in-1.zh.md?raw"

export const articleContent: Record<string, string> = {
  "css-subgrid": cssSubgrid,
  "linear-timing-function": linearTimingFunction,
  "starting-style": startingStyle,
  "color-shifting": colorShifting,
  "svg-paths": svgPaths,
  "friendly-svg": friendlySvg,
  "partial-keyframes": partialKeyframes,
  "height-enigma": heightEnigma,
  "post-developer-era": postDeveloperEra,
  "whimsical-animations": whimsicalAnimations,
  "container-queries": containerQueries,
  "backdrop-filter": backdropFilter,
  "how-to-fix-your-entire-life-in-1": howToFixYourEntireLife,
}

export const zhArticleContent: Record<string, string> = {
  "css-subgrid": cssSubgridZh,
  "linear-timing-function": linearTimingFunctionZh,
  "starting-style": startingStyleZh,
  "color-shifting": colorShiftingZh,
  "svg-paths": svgPathsZh,
  "friendly-svg": friendlySvgZh,
  "partial-keyframes": partialKeyframesZh,
  "height-enigma": heightEnigmaZh,
  "post-developer-era": postDeveloperEraZh,
  "whimsical-animations": whimsicalAnimationsZh,
  "container-queries": containerQueriesZh,
  "backdrop-filter": backdropFilterZh,
  "how-to-fix-your-entire-life-in-1": howToFixYourEntireLifeZh,
}

export function getArticleContent(slug: string, lang: "en" | "zh" = "en"): string {
  if (lang === "zh") {
    return zhArticleContent[slug] || articleContent[slug] || "# Content not found\n\nThis article's content is not available."
  }
  return articleContent[slug] || "# Content not found\n\nThis article's content is not available."
}
