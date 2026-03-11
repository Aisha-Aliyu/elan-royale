# 🍽️ Elan Royale

> A next-generation luxury dining reservation platform — blending elegance, speed, and modern full-stack engineering.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge)](https://elan-royale.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

-----

## 🌐 Live Demo

👉 **[elan-royale.vercel.app](https://elan-royale.vercel.app/)**

-----

## 📖 About

Elan Royale is a full-stack luxury restaurant web application inspired by high-end dining experiences. It features a refined UI, smooth animations, and a complete reservation system — built to production standards with TypeScript, Next.js App Router, Prisma ORM, and Tailwind CSS.

The project demonstrates end-to-end full-stack architecture: from database design and API routes, to a polished, responsive frontend.

-----

## ✨ Features

- 🏠 **Immersive Landing Page** — Cinematic hero section with elegant typography and motion design
- 📅 **Table Reservation System** — Full booking flow with form validation and database persistence
- 🍴 **Dynamic Menu** — Browse dishes by category with rich visuals
- 📱 **Fully Responsive** — Optimised for all screen sizes from mobile to widescreen
- ⚡ **Performance Optimised** — SSR/SSG via Next.js App Router for fast page loads
- 🔒 **Type-Safe** — End-to-end TypeScript with Prisma-generated types
- 🎨 **Luxury UI** — Custom Tailwind design system with refined colour palette and animations

-----

## 🛠️ Tech Stack

|Layer     |Technology             |
|----------|-----------------------|
|Framework |Next.js 14 (App Router)|
|Language  |TypeScript             |
|Styling   |Tailwind CSS           |
|ORM       |Prisma                 |
|Database  |PostgreSQL             |
|Deployment|Vercel                 |

-----

## 📂 Project Structure

```
src/
├─ app/
│  ├─ api/             # API route handlers (reservations, menu)
│  ├─ components/      # Reusable UI components
│  ├─ menu/            # Menu page
│  ├─ reservations/    # Booking page & confirmation
│  ├─ globals.css      # Global styles
│  ├─ layout.tsx       # Root layout
│  └─ page.tsx         # Landing page
├─ lib/
│  └─ prisma.ts        # Prisma client instance
prisma/
└─ schema.prisma       # Database schema
```

-----

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted e.g. Supabase, Neon)

### 1. Clone the repo

```bash
git clone https://github.com/Aisha-Aliyu/elan-royale.git
cd elan-royale
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/elan_royale"
```

### 4. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run locally

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

-----

## 🚀 Deployment

Deployed on **Vercel** with a hosted PostgreSQL database:

1. Push your code to GitHub
1. Import the repo into [Vercel](https://vercel.com/)
1. Add `DATABASE_URL` in the Vercel environment variables
1. Deploy ✅

-----

## 🗺️ Roadmap

- [ ] User authentication & booking history
- [ ] Admin dashboard for reservation management
- [ ] Email confirmation on booking
- [ ] Payment integration (Stripe)
- [ ] Reviews & ratings system

-----

## 👩‍💻 Author

**Aisha Aliyu** — Full-Stack & Frontend Engineer

- 🌐 Portfolio: [humairah.netlify.app](https://humairah.netlify.app)
- 💼 LinkedIn: [https://www.linkedin.com/in/aisha-aliyu-dev](https://www.linkedin.com/in/aisha-aliyu-dev)
- 🐙 GitHub: [@Aisha-Aliyu](https://github.com/Aisha-Aliyu)

-----

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
