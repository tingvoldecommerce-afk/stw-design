# STW Design

Jeg hedder Sebastian og driver STW Design.
Vi sælger hjemmesider, AI chatbots og SEO til danske virksomheder.

## Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS v4 (`@import "tailwindcss"` i globals.css)
- motion/react (animationer)
- lucide-react (ikoner)
- @anthropic-ai/sdk (chatbot)
- Vercel + Speed Insights

## Farver (sort/hvid tema)
- `--bg: #ffffff`
- `--bg-dark: #0a0a0a`
- `--text: #0a0a0a`
- `--text-muted: #6b7280`

## Fonts
- Playfair Display (serif) → overskrifter via `var(--font-playfair)`
- Inter (sans-serif) → brødtekst via `var(--font-inter)`

## Vigtige filer
- `app/layout.tsx` – root layout med Playfair + Inter, LangProvider, LayoutShell
- `app/page.tsx` – forside (client component, bruger useLang)
- `app/ydelser/page.tsx` – ydelser med accordion
- `app/om-os/page.tsx` – om os
- `app/kontakt/page.tsx` – kontaktformular (Formspree xjgejojz)
- `app/api/chat/route.ts` – chatbot API (ANTHROPIC_API_KEY i .env.local)
- `components/LangProvider.tsx` – DA/EN context + useLang hook
- `components/Navbar.tsx` – fixed, transparent → hvid ved scroll, mobil overlay
- `components/Footer.tsx` – sort footer, stor Playfair CTA
- `components/FadeIn.tsx` – scroll-animation komponent
- `components/ChatbotWidget.tsx` – NEXUS chatbot
- `components/CookieBanner.tsx` – cookie-banner + privatlivs-/cookiepolitik-modaler
- `components/LayoutShell.tsx` – client wrapper til Navbar, Footer, Chatbot, Cookie

## Regler
- Kode pushes altid til GitHub efter ændringer
- Vercel bruges til hosting (auto-deploy på main)
- DA/EN sprogskifter via LangProvider – brug `useLang()` hook i client components
- Kontaktformular: Formspree ID = xjgejojz
- Chatbot kræver ANTHROPIC_API_KEY i .env.local
