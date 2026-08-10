# DAVNS Industries - Official Web Platform (V5-2026)

Welcome to the official repository for **DAVNS Industries** website built with **Next.js 15**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, and **EmailJS**.

---

## 📌 Executive Overview & Company Details

- **Company Name:** DAVNS Industries
- **Primary Business:** AI Automation, Custom Enterprise Software, AI Team Agents, Omnichannel Lead Solutions & Dealership Automation
- **Location:** Chennai, Tamil Nadu, India (Serving clients in IN, US, GB, AE)
- **Primary Email:** `davnsindustries@gmail.com`
- **Working Hours:** Mon – Fri, 9:00 AM – 6:00 PM IST
- **Social Profiles:**
  - **LinkedIn:** [DAVNS Industries LinkedIn](https://www.linkedin.com/company/davnsindustriesoffi)
  - **Instagram:** [@davnsindustries](https://instagram.com/@davnsindustries)
  - **YouTube:** [@davns](https://www.youtube.com/@davns)

---

## 🛠️ Technology Stack & Dependencies

### Core Architecture
- **Framework:** [Next.js 15.2](https://nextjs.org/) (App Router)
- **Runtime & Language:** React 19, TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`), Radix UI primitives, Lucide Icons, Sonner Toasts
- **Animations & 3D Graphics:**
  - `framer-motion` / `motion`
  - `ogl` (WebGL Shader canvas backgrounds)
  - `three` & `postprocessing`
- **Analytics:** `@vercel/analytics`, `@vercel/speed-insights`

---

## ✉️ Email System & Backend Integrations

The website uses **EmailJS** (`@emailjs/browser`) for direct, client-side email delivery without requiring an explicit custom Node.js server endpoint.

### Configuration (`lib/emailjs.ts`)
Emails sent via `/contact` and `/get-started` are processed using the EmailJS service.

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_3ru1s5i',
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_lh0zo5q',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'HsDBI6lNCSlgjv75A',
};
```

### Credentials & Keys
| Setting / Env Variable | Default / Key Value | Description |
|---|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_3ru1s5i` | EmailJS Service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_lh0zo5q` | EmailJS Mail Template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `HsDBI6lNCSlgjv75A` | EmailJS Public Account API Key |

### Form Payloads Passed to EmailJS
The forms map user input into standardized template fields for high email delivery compatibility:
- `user_name` / `from_name` / `name`: User's full name
- `user_email` / `from_email` / `email` / `reply_to`: User's email address
- `company`: Optional company name
- `subject`: Subject line of inquiry
- `message`: Detailed message content

---

## 🗺️ Website Structure & Page Routes

| Route | File Path | Description |
|---|---|---|
| `/` | `app/page.tsx` | Main Homepage featuring Hero, WebGL effects, AI Team overview, ROI calculator, and WhatsApp lead demo |
| `/about` | `app/about/page.tsx` | About DAVNS Industries, mission, core values, location info |
| `/car-dealerships` | `app/car-dealerships/page.tsx` | Automotive & dealership AI automation showcase |
| `/contact` | `app/contact/page.tsx` | Contact page with interactive EmailJS message form, social links, contact info |
| `/get-started` | `app/get-started/page.tsx` | Project onboarding & lead capture form connected to EmailJS |
| `/projects` | `app/projects/page.tsx` | Portfolio & enterprise project showcases |
| `/services` | `app/services/page.tsx` | Full breakdown of enterprise AI development, custom web/app dev, & platform integration services |
| `/solutions` | `app/solutions/page.tsx` | Industry solution overviews |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy |
| `/terms` | `app/terms/page.tsx` | Terms of Service |
| `/sitemap.xml` | `app/sitemap.ts` | Dynamic SEO XML Sitemap |
| `/robots.txt` | `app/robots.ts` | Search Engine Crawler directives |

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### 2. Installation

Navigate into the project directory:
```bash
cd DavnsV5-2026
```

Install dependencies:
```bash
npm install
```
> **Note for Windows PowerShell Users:** If PowerShell blocks `.ps1` script execution, use `npm.cmd install` or run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.

### 3. Run Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📄 License
All rights reserved © DAVNS Industries.
