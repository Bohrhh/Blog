# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KMLeeX Blog - A personal blog built with Next.js 15 (App Router) featuring articles about CSS, React, Animation, SVG, Next.js, Career, and Web Development.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm start -- -p 3000  # Start with custom port
./start.sh -b -p 3000  # Background production mode (builds + starts)
./start.sh -k    # Kill background server
npm run lint     # Lint code
```

**No test suite exists** in this project.

## Architecture

### Server Mode

This project runs as a **Node.js server** (not static export). `output: 'export'` was intentionally removed from `next.config.js`. The app uses API routes (`app/api/views/`) and dynamic features that require a running server.

### Data Flow

- **Articles**: Markdown files in `app/data/articles/` imported as raw strings via webpack (`next.config.js` pushes `.md` as `asset/source`). Content imports use `?raw` suffix (e.g., `import content from "./file.md?raw"`).
- **Metadata**: Defined in `app/data/articles.ts` (interface `Article`, array `articles`)
- **Content imports**: `app/data/articles/content.ts` exports `articleContent` and `zhArticleContent` records, plus `getArticleContent(slug, lang)`
- **View counts**: Stored in `data/views.json`, accessed via `app/api/views/route.ts` API route (POST increments, GET reads, 60s cache headers)

### Adding New Articles (Bilingual)

1. Create English markdown file in `app/data/articles/` (e.g., `my-article.md`)
2. Create Chinese markdown file (e.g., `my-article.zh.md`)
3. Import both in `app/data/articles/content.ts` with `?raw` suffix
4. Add to both `articleContent` and `zhArticleContent` records
5. Add metadata to `app/data/articles.ts` with fields: `id`, `title`, `titleZh`, `subtitle?`, `subtitleZh?`, `description`, `descriptionZh`, `slug`, `date`, `category`, `categoryZh`, `readTime`, `featured?`

Articles can be marked `featured: true` to appear first on the home page.

### Language System (i18n)

- **Default**: English
- **Storage**: localStorage key `blog-language`
- **Anti-flicker**: Single inline script in `layout.tsx` `<head>` runs before React hydration, setting both theme class AND `html lang` attribute
- **Provider**: `I18nProvider` in `app/lib/i18n/index.tsx`
- **Hook**: `useTranslation()` returns `{ language, setLanguage, t }`
- **Helper**: `getTranslatedContent(article, language)` returns translated title/subtitle/description/category
- **UI Translations**: `app/lib/i18n/translations/en.ts` and `zh.ts` — section-based objects (`nav`, `common`, `footer`, `categories`, `toolButtons`, `social`, `article`, `category`, `about`). Some values are functions (e.g., `noResults: (query) => ...`).
- **Language Switcher**: Globe icon in Navbar toggles between EN/ZH

### Theme System

- **Default**: dark mode
- **Strategy**: Tailwind `darkMode: "class"` (not media query)
- **Anti-flicker**: Same inline script as language (see above) adds/removes `.dark` class before hydration
- **State**: `AppContext` (`app/context/AppContext.tsx`) manages theme and sound
- **Custom hooks**: `useTheme()` and `useSound()` exported from AppContext

### Sound System

- Uses **Web Audio API** (oscillator-generated tones, not audio files)
- Default: **enabled**, stored in localStorage key `blog-sound-enabled`
- Requires user interaction to unlock AudioContext due to browser autoplay policies
- Four sound types: `hover`, `click`, `success`, `notification`

### Routing

- `/` - Home page (`app/page.tsx`), renders `ArticleList` with `showFeaturedFirst={true}` inside a 2-column grid with sidebar
- `/[slug]` - Article detail (`app/[slug]/page.tsx`)
- `/category/[category]` - Category listing (`app/category/[category]/page.tsx`)
- `/about` - About page (`app/about/page.tsx`)
- `/api/views` - View count API (`app/api/views/route.ts`)

### Utilities

- `cn(...)` in `app/lib/utils.ts` — combines `clsx` and `tailwind-merge` for conditional Tailwind classes
- `STORAGE_KEYS`, `ANIMATION`, `UI` constants in `app/lib/constants.ts`

### Key Dependencies

- `react-markdown` - Markdown rendering
- `react-syntax-highlighter` - Code block highlighting
- `framer-motion` - Page transitions and animations
- `lucide-react` - Icons
- `class-variance-authority` + `clsx` + `tailwind-merge` - Tailwind variant utilities
- `sharp` - Image optimization (Next.js image optimization with avif/webp)

## Configuration

- `next.config.js` - webpack config for markdown imports (`type: 'asset/source'`), image formats/sizes
- `tailwind.config.ts` - Tailwind theme with custom colors (magenta, sky, dark palette), fonts, animations
- `tsconfig.json` - TypeScript paths (`@/*` maps to project root)
