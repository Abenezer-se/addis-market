<p align="center">
  <img src="public/brand/logo.svg" alt="Addis Market logo" width="130" />
</p>

<h1 align="center">Addis Market</h1>

<p align="center"><strong>Local products. Real people. Simple buying.</strong></p>

<p align="center">
  A mobile-first marketplace for Addis Ababa that works as a website and as a Telegram Mini App.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-082D34?style=for-the-badge&logo=nextdotjs&logoColor=F1F8DD" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-082D34?style=for-the-badge&logo=typescript&logoColor=F1F8DD" />
  <img alt="Telegram" src="https://img.shields.io/badge/Telegram%20Mini%20App-229ED9?style=for-the-badge&logo=telegram&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-082D34?style=for-the-badge&logo=vercel&logoColor=F1F8DD" />
</p>

<p align="center">
  <a href="https://YOUR-VERCEL-DOMAIN.vercel.app"><strong>Live website</strong></a>
  ·
  <a href="https://t.me/YOUR-BOT/YOUR-APP-SHORT-NAME"><strong>Open in Telegram</strong></a>
</p>

---

## ✨ About

Addis Market helps people in Addis Ababa find and share local products. Every listing shows the price in **ETB**, whether it is negotiable, the condition and the area, so buyers know what they are getting before they message a seller.

The same app runs in a normal browser and inside Telegram, so there is only one project to maintain.

## 🛍️ Features

- Home page with hero slider, About, featured products, location map and Sell section
- Smooth-scroll navigation that highlights the section you are viewing
- Live search by product name, category or area
- Filters and sorting (category, area, condition, price)
- Product pages with photo gallery, specifications, seller details and related items
- Favorites saved in the browser
- Share a listing with the Web Share API, a copied link or Telegram
- Telegram Mini App with Back Button, Main Button and deep links to a single listing
- Responsive design for phones, tablets and desktops

## 🧰 Built with

Next.js (App Router) · TypeScript · React · plain CSS · Telegram Web App · Vercel

Listings are typed local data in `data/listings.ts`. There is no database in this version.

## 🚀 Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/YOUR-USERNAME/addis-market.git
cd addis-market
npm install
```

Create your settings file (on Windows PowerShell use `Copy-Item` instead of `cp`):

```bash
cp .env.example .env.local
```

Start the app and open <http://localhost:3000>:

```bash
npm run dev
```

For a production build use `npm run build` and then `npm start`.

## ⚙️ Settings

Edit `.env.local` on your computer. On Vercel, add the same names under **Settings → Environment Variables** and redeploy. The real values are never committed to GitHub.

```env
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
NEXT_PUBLIC_TELEGRAM_APP_SHORT_NAME=market
NEXT_PUBLIC_TELEGRAM_CONTACT_USERNAME=your_contact_username
```

| Setting | What it is |
| --- | --- |
| `SITE_URL` | The public address of the website |
| `BOT_USERNAME` | Your Telegram bot, without `@` |
| `APP_SHORT_NAME` | The Mini App short name from BotFather |
| `CONTACT_USERNAME` | The Telegram account opened by "Message us on Telegram" and "Help on Telegram" |

Never put a bot token in any `NEXT_PUBLIC_` setting. This app does not need the token.

## 📝 Adding listings and photos

- **Listings:** edit `data/listings.ts` (title, price in ETB, negotiable, description, area, seller).
- **Photos:** save them as `public/listings/<listing-id>/1.jpg`, `2.jpg` and so on, and set `imageCount`.
- **Logo:** replace `public/brand/logo.svg`.
- **About and hero photos:** `public/about.jpg` and `public/hero/1.jpg`, `2.jpg`, `3.jpg`.

## 📱 Telegram Mini App setup

1. Open **@BotFather** in Telegram and send `/newbot`.
2. Send `/newapp`, choose your bot, and set the **Web App URL** to your Vercel address.
3. Choose a short name such as `market`.
4. Add the settings above and redeploy.
5. Open `https://t.me/<bot-username>/<short-name>`.

Telegram needs an `https` address. To test locally, use a tunnel such as ngrok or Cloudflare Tunnel.

**Deep links:** `https://t.me/<bot-username>/<short-name>?startapp=<listing-id>` opens that exact listing inside Telegram.

## ☁️ Deploy

1. Push the project to GitHub.
2. Import it in [Vercel](https://vercel.com).
3. Add the settings and deploy.
4. Use the new address as the Web App URL in BotFather.

Every push to `main` redeploys automatically.

## 🔒 Security

Telegram user data is never trusted for anything sensitive, and the project contains no secrets. If accounts or payments are added later, check Telegram's `initData` on a server.

## 🧭 Not included yet

Database, user accounts, seller-created listings, payments and an admin dashboard. For now, sellers message the team on Telegram and listings are added in `data/listings.ts`.

---

<p align="center">
  Made by <strong>Abenezer Samson Zewdu</strong><br />
  Frontend Engineer &amp; UI/UX Designer<br />
  <sub>Addis Market · © 2026</sub>
</p>