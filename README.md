## OmniVerse

OmniVerse is a modern, production-ready blogging website **frontend** built with:

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- Dark + light mode (via `next-themes`)

It ships with dummy blog data, premium UI components, search/category filters, pagination, and legal pages (Privacy Policy, Terms, Disclaimer).

## Getting Started

From the `omniverse` folder, run the dev server:

```bash
cd omniverse
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

Key folders:

- `src/app`: App Router pages (Home, Blog, Single Post, About, Contact, Legal)
- `src/components`: Reusable UI + site components
- `src/lib`: Dummy data and small utilities

## Notes

- Search/filter/newsletter are **UI only** in this starter. Connect a CMS and providers when ready.
- Update email/social placeholders before deploying a real site.

## Deploy

Deploy on Vercel or any Node host that supports Next.js.
