# KMLeeX Blog

A personal blog built with Next.js 14, featuring articles about CSS, React, Animation, and Web Development.

## ![blog](./public/images/blog.png)

## Features

- **Search** - Real-time search across article titles, descriptions, and content
- **Pagination** - Articles are paginated with 6 articles per page
- **Back to Top** - Smooth scroll back to top button
- **Table of Contents** - Auto-generated TOC for articles (desktop)
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly navigation
- **Category Filtering** - Browse articles by category (CSS, React, Animation, etc.)
- **Syntax Highlighting** - Code blocks with syntax highlighting

## Tech Stack

- **Next.js 14** - App Router, Static Site Generation
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code syntax highlighting

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
app/
├── [slug]/page.tsx        # Article detail page
├── category/[category]/   # Category pages
├── about/page.tsx         # About page
├── components/            # Reusable UI components
│   ├── ArticleCard.tsx
│   ├── ArticleContent.tsx
│   ├── BackToTop.tsx
│   ├── Pagination.tsx
│   ├── SearchModal.tsx
│   ├── TableOfContents.tsx
│   └── ...
├── sections/              # Page sections
│   ├── ArticleList.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── data/articles/         # Article content (markdown files)
└── lib/                   # Utilities and constants
```

## Adding New Articles

1. Add article metadata to `app/data/articles.ts`
2. Create a markdown file in `app/data/articles/` (e.g., `my-article.md`)
3. Import and export the file in `app/data/articles/content.ts`

## License

MIT
