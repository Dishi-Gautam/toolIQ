Tooliq

Tooliq is a modern, content-driven directory to discover and explore AI tools across different use cases.
It focuses on clean UI, fast discovery, and programmatically generated pages from a static dataset.

🚀 What this project does

Displays a curated directory of AI tools

Provides listing pages with search, filter, and sort

Generates detailed pages for each tool programmatically

Creates multiple page permutations (by category, use case, etc.)

Optimized for performance and SEO using static generation

🧱 Features

📄 Home page describing the dataset and purpose

📂 Listing page with client-side search, filters, and sorting

🔍 Detail pages for each AI tool

🔁 Category-based pages generated from the same dataset

🧭 Clean global navigation and footer

🔎 SEO-ready metadata, sitemap, and robots configuration

🌗 Responsive design with light & dark mode

🗂 Dataset

Source: Public AI tools directory (inspired by There’s An AI For That)

Collection method: One-time browser-based extraction using Instant Data Scraper

Storage: Static JSON file committed to the repository

No live scraping or external API calls in production

Fields used:

name

slug

category

description

pricing

tags

website

This approach keeps the site lightweight, fast, and deterministic.

🛠 Tech Stack

Next.js 14+ (App Router)

TypeScript

Tailwind CSS

shadcn/ui

Static Site Generation (SSG) + ISR

ESLint & Prettier

Deployed on Vercel

🧠 Design Approach

Visual inspiration from modern directory and SaaS products (Product Hunt–style layouts)

Focus on:

Clear hierarchy

Generous spacing

Minimal but polished UI

Built mobile-first and fully responsive

📈 Performance & SEO

Static generation for fast load times

Programmatic routing using dynamic segments

SEO metadata per page

Sitemap and robots configuration included

🔮 Future Improvements

Scheduled data refresh using ISR and cron jobs

User-submitted tools with moderation

Advanced ranking (trending, most-used, featured)

External API integrations for live updates

🌐 Live Demo

Deployed on Vercel


📄 License

This project is built for learning and evaluation purposes.