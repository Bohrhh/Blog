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
}

export function getArticleContent(slug: string): string {
  return articleContent[slug] || "# Content not found\n\nThis article's content is not available."
}
