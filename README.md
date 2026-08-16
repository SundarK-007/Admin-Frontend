# admin-frontend

Sri Siva Durga Temple — Admin Panel. React + TypeScript + Vite + Tailwind v4 + Framer Motion.

## What's built (Plan 1)

- **Login** (`/login`)
- **Set Password / Activation** (`/activate/:token`) — reached from the "set your password" email
  sent when an admin creates a user
- **Reset Password** (`/reset-password/:token`) — same screen, reset mode
- **Forgot Password** (`/forgot-password`) — accepts email or mobile, always emails the registered address
- **Admin Panel shell** (`src/layouts/AdminLayout.tsx`) — sidebar + topbar, everything signed-in lives inside it.
  Sidebar lists every module with the Build Sequence day it arrives (Day 2 Users & Roles, Day 3–7
  Masters, ...) so the nav shape is visible even before those screens exist.
- **Dashboard** (`/dashboard`) — the shell's first real page: who you're signed in as, your access
  level, and what's coming next. No fabricated stats — nothing here is invented data.

Deliberately calmer than the auth pages inside the shell: no starfield/embers in the work area — that
cinematic treatment is a once-a-day arrival moment, not something you want running behind you for
hours of actual work. Brand continuity comes from the palette/type/logo, not from re-running the animation.

**No Register page here on purpose.** The Admin Panel is admin-created-accounts-only (FSD §2.3) —
every account, admin or customer, is created by an authorized admin, never self-registered from
this app. `User-Service`'s `POST /auth/register` endpoint still exists and still creates a
CUSTOMER account + linked Customer profile — it's just waiting for its real UI home, the future
`customer-frontend` (Phase 2), instead of living in the Admin Panel. To get your own Super Admin
login for testing right now, see `User-Service`'s `pnpm run create:super-admin`.

Visual language: navy-and-gold "divine cinematic" theme built from `SSD_Logo.png` / `SSD_Full_Logo.png` —
animated starfield, rising embers, slow-rotating mandala rings, and a faint gopuram skyline, all behind
a glass card with gold filigree corners. `prefers-reduced-motion` is respected throughout.

Shared building blocks live in `src/components/divine/` (UI kit) and `src/lib/` (validation, the
`useAsyncAction` submit hook, password-strength checking, the API client) — every new page should
reach for these first rather than re-implementing form/async/validation logic locally.

## Port

`5001` (set with `strictPort: true` in `vite.config.ts` — it fails loudly instead of silently
picking a different port if 5001 is already taken). Part of the fixed sequence across every SSD
repo:

| Port | Repo |
|---|---|
| **5001** | **admin-frontend** |
| 5002 | pos-frontend |
| 5003 | User-Service |
| 5004 | Catalog-Service |
| 5005 | notification-worker |
| 5006 | local-print-agent |
| 5007 | customer-frontend (Phase 2) |

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:5001
```

Needs two backend services running — `User-Service` (5003, login/activate/forgot-password) and
`Catalog-Service` (5004, everything else as it lands) — see their own READMEs. `VITE_AUTH_API_BASE_URL`
and `VITE_API_BASE_URL` in `.env` point at them respectively.

## Password policy

Enforced client-side (instant feedback) and re-checked server-side (the real gate). 12+ characters,
all four character classes, a `zxcvbn` strength score ≥ 3, no name/email/mobile substring, no
sequential/repeated runs — see `src/lib/password.ts` and Blueprint §05.