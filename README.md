# Naseeh AN — Portfolio

Personal portfolio of Naseeh AN, full-stack developer. Built with Next.js (App Router), React and Redux Toolkit, with a retro-gaming visual theme, light/dark modes and reduced-motion support.

Live site: https://www.naseeh.in

## Run locally

1. Install Node.js 22.
2. `npm install`
3. `npm run dev` and open http://localhost:3000

Other scripts:

- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint (Next.js core web vitals rules)
- `npm test` — Jest data-integrity tests (`src/App.test.js`)

## Project structure

- `src/app/` — routes (`/`, `/about`, `/skills`, `/projects`, `/experience`, `/contact`). Each route renders the full one-page portfolio and scrolls to its section. `/service` and `/services` redirect to `/experience` for old links.
- `src/components/` — page sections, navbar, footer, theme toggle, intro curtain, custom cursor, pixel cat.
- `src/data/portfolioData.js` — all personal info, skills, projects and experience content. Edit this file to update the site.
- `public/` — static files (images, manifest). `public/images/og-image.jpg` is the social share preview.
- `src/data/site.js` — site URL, title and description used for SEO metadata, structured data, `sitemap.xml` (`src/app/sitemap.js`) and `robots.txt` (`src/app/robots.js`).

## Contact form server

The contact form posts to an Express + Resend API in `server/`, deployed separately (currently `https://portfolio-phdb.onrender.com/contact`, set in `src/components/ContactSection.jsx`).

1. `cd server && npm install`
2. Copy `server/.env.example` to `server/.env` and set `RESEND_API_KEY` and `EMAIL_RECEIVER`.
3. `npm start`

The server validates input before rate limiting (2 messages per IP per minute) and sets the sender's address as reply-to.

## Analytics

Google Analytics (gtag) is loaded in `src/app/layout.jsx`; Vercel Analytics and Speed Insights are enabled there too.

Do not commit `.env` files or API keys.
