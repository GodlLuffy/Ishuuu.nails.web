# 💅 SLEEK POLISH BY ISH — Production E-Commerce & Nail Art Lookbook

> **Handcrafted Luxury Press-On Nails, Bridal Couture, and Nail Artistry by Ish**  
> Official Instagram: [@sleekpolishbyish](https://www.instagram.com/sleekpolishbyish?utm_source=ig_web_button_share_sheet&bqrl=ZDNlZDc0MzIxNw==)  
> Inspired by the clean editorial luxury layout and high-conversion flow of [Zoee India](https://zoeeindia.com/).

---

## 🌟 Live Demo & Quick Launch

The production server is currently running locally at:
👉 **[http://localhost:3005](http://localhost:3005)**

To restart or launch the server at any time, run:
```bash
cd sleek-polish
npm run build
npm run start -- -p 3005
```
Or double-click `start-server.bat` in the project root folder.

---

## 🔑 Pre-Configured Demo Accounts & Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@sleekpolishbyish.com` | `Admin@123` | Full Admin Dashboard (`/admin`), Product Manager, Orders, Bookings, Promos |
| **Customer** | `priya@example.com` | `Customer@123` | Browsing, Wishlist, Bag, Checkout, Order Tracking |

*Tip: A one-click **"Auto-Fill Admin Login"** button is built into the [`/login`](http://localhost:3005/login) page for instant review.*

### 🎁 Seeded Promo Codes
- `SLEEK10` — **10% OFF** your order (Min. Order ₹499)
- `BRIDAL20` — **20% OFF** bridal sets (Min. Order ₹1,499)
- `FIRST15` — **15% OFF** first purchase (Min. Order ₹799)

### 📦 Sample Orders Ready for Live Tracking (`/track`)
- `SPB-2026-1001` + `priya@example.com` — Status: **Shipped** (Tracking: `DTDC1234567890`)
- `SPB-2026-1002` + `ananya@example.com` — Status: **Handcrafting Your Set**

---

## 🎨 Visual Design System (Porcelain & Champagne Gold)

Inspired by Zoee India's warm porcelain whitespace and editorial aesthetics:
- **Warm Porcelain White (`#FAF8F6`)**: Subtle warm backdrop that makes nail imagery pop.
- **Blush / Nude Sand (`#F3E8E2`)**: Soft luxury accent for category circles and drawer backdrops.
- **Deep Charcoal / Espresso (`#1F1A18`)**: High-contrast, elegant typography and primary CTAs.
- **Champagne Gold (`#C5A059`)**: Accent color for badges, star ratings, and promo bars.
- **Typography**: Editorial Serif (`Cormorant Garamond` / `Playfair Display`) paired with crisp sans-serif (`Plus Jakarta Sans`).

---

## 💎 Page Breakdown & Features

### 1. Global Header & Announcement Bar
- **Rotating Promo Ribbon**: 4 cycling announcements every 4 seconds (Prepaid 5% off, `SLEEK10`, worldwide delivery, handcrafted notice).
- **Live Search Modal**: Instant keyword filter with popular suggested pills (*Rose Quartz, Bridal Luxe, French Tip, Cat-Eye*).
- **Slide-out Cart & Wishlist Drawers**: Real-time quantity controls, size badges, prepaid savings callout, and subtotal.

### 2. Editorial Home Page (`/`)
1. **Hero Banner**: Full-width luxury typography with dual CTAs and signature nail spotlight.
2. **Category Carousel**: 5 circular cards (*Press-On Sets, Bridal & Festive, Minimalist, Nail Care, Combos*).
3. **Bestsellers Grid**: Product cards with image hover angle swap, discount badge, star ratings, and instant bag add.
4. **Shoppable Reels**: 9:16 vertical cards mimicking Instagram Reels with mute toggle and direct "Shop This Set" action.
5. **Portfolio Preview**: Masonry lookbook preview with artist style tags.
6. **Booking Banner**: Dual-action banner for salon visits and virtual consultations.
7. **Brand Story**: Founder profile on Ish's salon-grade builder gel formula, 3x reusability, and hygiene.
8. **4-Column Trust Pillars**: Handcrafted Quality, Express Pan-India Delivery, Custom Sizing Guarantee, Direct WhatsApp Support.
9. **Instagram Feed**: 6-photo aesthetic grid linking to `@sleekpolishbyish`.
10. **Luxury Footer & Floating WhatsApp**: Instant 1-click chat with Ish.

### 3. Shop & Product Detail Pages (`/shop`, `/shop/[slug]`)
- **Filter Sidebar**: Category, Nail Shape (*Almond, Coffin, Square, Stiletto, Short Round*), Finish (*Glossy, Matte, Chrome, Glitter, 3D Art*), and Price slider.
- **Press-On Specific Customization**:
  - Nail Shape & Length selectors.
  - Sizing selector (`XS`, `S`, `M`, `L`, or **Custom Measurements** with millimeter inputs for Thumb, Index, Middle, Ring, Pinky).
  - Interactive **"How to Measure Your Nails"** modal with 3-step tape guide & size chart.
  - Collapsible **"What's in the Box"** accordion.
  - Real Customer Reviews + submission form.

### 4. Interactive Lookbook (`/portfolio`)
- Filter by style (*Bridal, Minimalist, Chrome & Glaze, 3D & Charms, French Tips, Seasonal*).
- **Lightbox Modal** showing high-res imagery, shape/length specs, artistry notes, *"Request This Custom Set"* action, and *"Shop Similar"* link.

### 5. Appointments & Video Consultations (`/book`)
- **Studio Appointment**: Service selection (*Gel Extensions, Acrylics, Bridal Nails, Nail Art, Refill*), date picker, and time slot.
- **Online Consultation**: Occasion notes, reference image URL, and virtual sizing call.
- Generates a **1-click "Confirm on WhatsApp" button** pre-filled with booking details and confirmation ID (`BK-2026-XXXX`).

### 6. Order Tracking (`/track`)
- Lookup with **Order Number** + **Email**.
- Visual **5-Step Status Stepper**: `Order Placed` ➔ `Handcrafting Your Set` ➔ `Quality Check & Packed` ➔ `Shipped` ➔ `Delivered`.

### 7. Full Admin Dashboard (`/admin`)
- **Overview KPIs**: Total Revenue (₹), Active Orders count, Pending Bookings count, Catalog count.
- **Product Manager**: Add, edit, or delete products with prices, discount %, shapes, lengths, and stock.
- **Order Manager**: View customer details (including custom mm nail sizes), update status phases, and assign courier tracking numbers.
- **Portfolio Manager**: Upload/manage lookbook photos, style tags, and linked shop products.
- **Bookings Manager**: Review appointment requests and change statuses (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
- **Promo Codes Manager**: Create and toggle discount voucher codes.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15+ (App Router, Server Components & Client Components)
- **Language**: TypeScript (Strict typing, zero compile errors)
- **Styling**: Tailwind CSS with custom Luxury Beauty palette
- **Database & ORM**: SQLite (`dev.db`) for immediate local preview with Prisma ORM (1-line switch to PostgreSQL on Supabase/Neon)
- **Icons**: Lucide React + Custom Instagram SVG
- **State Management**: Zustand with persistent storage (`useCartStore`, `useWishlistStore`)
- **Authentication**: NextAuth.js (Credentials + Role-based access for `CUSTOMER` and `ADMIN`)

---

## 🚀 Deployment Guide (PostgreSQL & Vercel)

When ready to launch to your custom domain (e.g. `sleekpolishbyish.com`):

### 1. Database (PostgreSQL)
In `prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Set `DATABASE_URL` in `.env` to your Supabase, Neon, or Railway connection string, then run:
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 2. Vercel Deployment
1. Push the repo to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Root Directory to `sleek-polish`.
4. Add the Environment Variables:
   - `DATABASE_URL` = your PostgreSQL URL
   - `NEXTAUTH_URL` = `https://your-domain.com`
   - `NEXTAUTH_SECRET` = `any-random-32-char-string`
5. Deploy!
