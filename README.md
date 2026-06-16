# 23films.studio

Modern corporate portfolio site for **23 Production LLC** — commercial, automotive, and luxury real estate video production.

## Stack

- Next.js 15 (App Router, static generation)
- TypeScript + Tailwind CSS v4
- Content in `src/data/` (edit projects in Cursor)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a project

Edit `src/data/projects.ts` and add a new entry with `slug`, `vimeoId`, `thumbnail`, and `featured`.

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add custom domain `23films.studio` and update DNS records

## Pages

- `/` — Hero + featured work
- `/work` — Full portfolio with filters
- `/work/[slug]` — Case study
- `/services` — Corporate services
- `/about` — Company story
- `/contact` — Inquiry form (mailto)
