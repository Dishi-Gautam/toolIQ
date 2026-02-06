# Tooliq

Tooliq is a content-driven directory for discovering and exploring AI tools across categories and use cases. It is built for fast browsing, clean presentation, and SEO-friendly, programmatically generated pages powered by a static dataset.

## What it does

- Displays a curated directory of AI tools
- Provides listing pages with client-side search, filtering, and sorting
- Generates detail pages programmatically per tool
- Builds category- and collection-style pages from the same dataset
- Optimizes for performance and SEO using static generation

## Key features

- Next.js App Router with TypeScript
- Static generation + incremental regeneration patterns where applicable
- SEO-friendly routing and metadata
- Sitemap and robots configuration
- Responsive UI with Tailwind CSS (dark mode via `class` strategy)
- Component primitives from shadcn/ui and Radix

## Dataset

The directory is generated from a one-time extracted dataset (inspired by public AI tool directories).

- Collection method: browser-based extraction (Instant Data Scraper)
- Runtime behavior: no live scraping or external API calls in production

Common fields:

- `name`
- `slug`
- `category`
- `description`
- `pricing`
- `tags`
- `website`

This approach keeps the application lightweight, deterministic, and easy to deploy.

## Tech stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS + `tailwindcss-animate`
- shadcn/ui + Radix UI

## Getting started

### Prerequisites

- Node.js 18+ recommended
- npm (project includes a `package-lock.json`)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open `http://localhost:3000` (or the next available port if 3000 is in use).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run ESLint

## Deployment

This project is compatible with common Next.js hosting platforms (for example Vercel). For a production deployment, run `npm run build` and `npm run start` or configure the platform to build and serve the Next.js app.

## Roadmap

- Scheduled data refresh (ISR + cron)
- User-submitted tools with moderation
- Advanced ranking (featured, trending, most used)
- Optional external API integrations for enriched metadata

## License

Built for learning and evaluation purposes.