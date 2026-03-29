# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is the root of the project. It has two independent packages with separate `node_modules` and `package.json`:
- Frontend root: `.` (this directory)
- Backend root: `backend/`

## Commands

### Frontend (run from project root)
```bash
npm run dev        # Vite dev server on http://localhost:5173
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # Preview production build
```

### Backend (run from `backend/`)
```bash
npm run dev        # nodemon src/server.js — hot reload on http://localhost:3001
npm run start      # node src/server.js
npm run test       # jest
```

Backend health check: `GET http://localhost:3001/health`

## Architecture

### Frontend (React 19 + TypeScript + Vite + Tailwind CSS v3)

**Routing** — react-router-dom v7, all routes defined in `src/App.tsx`:
- `/` → `Home`, `/sobre-nosotros` → `About`, `/servicios` → `Services`, `/contacto` → `Contact`, `*` → `NotFound`
- `ScrollToTop` component in `App.tsx` resets scroll on every route change.

**Component organization:**
- `src/components/sections/` — Page-level components (one per route)
- `src/components/ui/` — Reusable UI components (Navbar, Footer, ErrorBoundary, SEOHead, contact-form, counter-animation, services-tabs, usePreventScroll)

**SEO** — `SEOHead` is a renderless component that imperatively mutates `document.title` and meta tags on each page. It also injects/replaces `<script type="application/ld+json" id="dynamic-schema">` for structured data.

**Environment variables** — All `VITE_*` vars are centralized in `src/config/env.ts` as a typed `env` const. Always import from there, never use `import.meta.env` directly in components.

### Backend (Node.js/Express, ESM modules)

Single API endpoint: `POST /api/contact`

Request flow: `contactValidation` (express-validator rules in route) → `validateContactData` middleware → `sendContactEmail` service → response.

**Email service** (`backend/src/services/emailService.js`) — provider selected at runtime:
1. If `BREVO_API_KEY` is set → uses Brevo (transactional email)
2. Otherwise → falls back to Ethereal (test accounts, preview URLs returned in response)
3. Set `MOCK_EMAIL=true` to skip all real sending (useful for dev/test)

### Contact Form Data Flow

Client-side validation in `useContactForm.ts` (XSS/SQL injection detection + field rules) → `POST /api/contact` → server-side validation with express-validator → `sendContactEmail` → two emails sent in parallel (one to team, one to submitter).

## Environment Variables

**Frontend** (`.env` at project root):
```
VITE_API_URL=http://localhost:3001
VITE_SITE_URL=http://localhost:5173
```

**Backend** (`.env` at `backend/`):
```
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
BREVO_API_KEY=           # If set, uses Brevo; otherwise Ethereal
EMAIL_FROM=              # Sender address/name
EMAIL_TO=                # Recipient for team notifications
MOCK_EMAIL=true          # Skip real email sending
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```
