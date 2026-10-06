# Addis Market
Local products. Real people. Simple buying. A Next.js 14 (App Router, TypeScript) marketplace that works as a website and a Telegram Mini App.

## Features
Hero slider (swipe/keyboard), search, category browse, filters + sort + load more (state in URL, e.g. `/listings?cat=phones&loc=Bole&sort=low`), listing page with gallery, seller card, specs, related listings, localStorage favorites, Web Share + Telegram share, custom 404, mobile bottom nav and sticky contact bar, SEO metadata per listing.

## Install
```bash
npm install
cp .env.example .env.local
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Edit content
- Listings: `data/listings.ts` (title, price in ETB, `negotiable`, description, address, seller, specs).
- Photos: `public/listings/<listing-id>/1.jpg, 2.jpg…` and set `imageCount`.
- Logo: replace `public/brand/logo.svg` (or edit `components/Logo.tsx` to point at your PNG).
- Seller Telegram: `seller.telegram` (username without @). Demo usernames are placeholders; replace them.

## Telegram setup
1. In Telegram open **@BotFather** → `/newbot` → get the bot username (keep the token private; this app does not need it).
2. `/newapp` → choose your bot → set title, description, photo, and **Web App URL** = your deployed https URL. Choose a short name (e.g. `market`).
3. Set in `.env.local` / Vercel: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_TELEGRAM_BOT_USERNAME`, `NEXT_PUBLIC_TELEGRAM_APP_SHORT_NAME`.
4. Open `https://t.me/<bot>/<shortname>` — the app runs as a Mini App.
5. Optional: BotFather → `/setmenubutton` to add a menu button that opens the app.
Local testing: expose localhost with an https tunnel (ngrok/cloudflared) and use that URL in BotFather.

## How the integration works
- `lib/telegram.ts` safely detects `window.Telegram.WebApp`; nothing breaks in a normal browser.
- `components/TelegramBridge.tsx`: calls ready/expand, shows Telegram's Back Button on inner pages, and opens `startapp=listing_<id>` deep links at `/listings/<id>`.
- Listing page shows Telegram's Main Button ("Message Seller") only inside Telegram; browser users get the normal buttons.
- "Open in Telegram" links look like `https://t.me/<bot>/<app>?startapp=listing_<id>`.

## Security notes
`initDataUnsafe` is untrusted. Do not use Telegram user IDs or URL params for authorization. If you add accounts or posting, validate `initData` server-side with the bot token (kept in a non-`NEXT_PUBLIC_` env var).

## Deploy
Push to GitHub, import in Vercel, set the three env vars, deploy. Use the resulting URL in BotFather.

## Not included yet
Sell form with backend, accounts, category pages, image lightbox, dark mode, real database. Listings currently come from `data/listings.ts`.
