# Mellow Gadgets 🎧

A premium gadgets & tech accessories e-commerce site built with Vite + React + Tailwind CSS.

## Tech Stack

- **Vite** — Lightning-fast dev server & build
- **React 18** — Component-based UI
- **Tailwind CSS v3** — Utility-first styling
- **React Router v6** — Client-side routing
- **Framer Motion (motion)** — TiltedCard animations
- **Lucide React** — Icons

## Features

- 🎨 Deep blue glassmorphism design system
- ✨ GlareHover effect on all product cards
- 🖱️ ClickSpark — canvas spark animation on every click (site-wide)
- 🃏 TiltedCard — 3D tilt on hero product
- 🔄 LogoLoop — animated gadget icons in footer
- 🛒 Cart with localStorage persistence
- ❤️ Wishlist with localStorage persistence
- 🌙 Dark/Light mode toggle
- 🔍 Live search in navbar
- ⏱️ Flash deals countdown timer
- 💸 Coupon code (try: MELLOW10)
- 📱 Fully mobile responsive

## Pages

| Page | Route |
|------|-------|
| Homepage | `/` |
| Shop | `/shop` |
| Product | `/product/:slug` |
| Cart | `/cart` |
| Wishlist | `/wishlist` |
| Contact | `/contact` |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Customization

- **Colors**: Edit CSS variables in `src/index.css`
- **Products**: Edit `src/data/products.js`
- **Brand name**: Search & replace "Mellow Gadgets" 
- **Images**: Replace picsum URLs with real product images

## Project Structure

```
src/
├── components/
│   ├── ui/              ← GlareHover, ClickSpark, TiltedCard, LogoLoop
│   ├── sections/        ← Hero, Categories, Deals, etc.
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProductCard.jsx
├── context/             ← Cart, Wishlist, Theme
├── data/products.js     ← All product data
├── pages/               ← Home, Shop, Product, Cart, Contact, Wishlist
└── index.css            ← Design system
```
