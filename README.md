# 🧠 DevAssess — Developer Assessment & Coding Platform

**DevAssess** is a modern, fully responsive **full-stack** developer assessment and coding platform. It gives recruiters a structured way to build MCQ-based assessments, manage a reusable question bank, invite candidates, and publish paid assessments — while candidates get a focused workspace to accept invitations, sit timed assessments, and track their scores.

The platform has two parts, **both developed by the same author**: a **Next.js 16 App Router frontend** (React 19, TypeScript, Tailwind CSS v4 — this repository) and a **custom REST API backend** (Node.js, Express, TypeScript, Prisma, PostgreSQL) built specifically for DevAssess.

---

## 🌐 Links

DevAssess is a full-stack project — both the frontend and the backend were developed by the same author.

* 🖥️ **Frontend Repository:** [https://github.com/mdalamin0/Developer-Assessment-Coding-Platform-Frontend](https://github.com/mdalamin0/Developer-Assessment-Coding-Platform-Frontend) — Next.js 16 client *(this repository)*
* ⚙️ **Backend Repository:** [https://github.com/mdalamin0/Developer-Assessment-Coding-Platform](https://github.com/mdalamin0/Developer-Assessment-Coding-Platform) — custom REST API (Node.js + Express + Prisma + PostgreSQL)
* 🚀 **Live Application:** [https://developer-assessment-coding-platfor-pi.vercel.app](https://developer-assessment-coding-platfor-pi.vercel.app)

---

## 🛠️ Main Technologies

* **Next.js 16** (App Router, Route Groups, Dynamic Segments, Server/Client Components)
* **React 19** with the **React Compiler** enabled (`babel-plugin-react-compiler`)
* **TypeScript** in strict mode with path alias `@/* → ./src/*`
* **Tailwind CSS v4** (CSS-first `@theme` config) + `tw-animate-css`
* **TanStack Query v5** — server state, caching, and targeted cache invalidation after mutations
* **TanStack Form v1** — type-safe form state for every auth and profile form
* **Zod v4** — schema validation shared across forms
* **ofetch** — typed fetch wrapper with cookie credentials
* **shadcn/ui** (`base-maia` style on `@base-ui/react`) + a hand-rolled component library
* **next-themes** — light/dark/system theming
* **Sonner** — toast notifications
* **Biome 2** — linter and formatter (replaces ESLint + Prettier)
* **lucide-react / react-icons** — iconography
* **date-fns** — date & time formatting
* **input-otp** and **react-day-picker** — OTP entry and schedule/date picking
* **Node.js + Express + Prisma + PostgreSQL** — the custom REST API backend that powers DevAssess (see below)

---

## 🏗️ Full-Stack Architecture

DevAssess is a full-stack application. Every request follows a single path:

```
User → Next.js Frontend → REST API (Express) → PostgreSQL
```

### Frontend Technologies

* **Next.js 16** (App Router, Route Groups, Server/Client Components)
* **React 19** with the React Compiler
* **TypeScript** in strict mode
* **TanStack Query** for server state and **TanStack Form** for forms
* **Tailwind CSS v4** with a shadcn/ui component layer
* **Zod** for client-side validation

### Backend Technologies

* **Node.js** + **Express (v5)** — web framework
* **TypeScript** — type-safe development
* **Prisma ORM** — data access with a **PostgreSQL** database
* **Redis** — OTP storage, session/token caching, and bKash token caching
* **Passport.js** — authentication strategies via `passport-local` and `passport-google-oauth20`
* **JWT** — access and refresh token authentication
* **bKash Tokenized Checkout** — payment gateway integration
* **Zod** — request validation
* **Nodemailer + EJS** — transactional email and email templates

The frontend consumes this API through a single configured `ofetch` client, so switching environments only requires changing one environment variable.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Email/password **register** with role selection (`CANDIDATE` or `RECRUITER`)
* **Email OTP verification** with resend-code support (`input-otp`)
* **Forgot password** → **Reset password** with OTP confirmation
* **Google sign-in** for candidates (redirects to the backend OAuth route)
* Cookie-based session managed by the backend; current user resolved via `/users/me`
* `AuthGuard` for authenticated areas and `RoleGuard` for role-scoped dashboards
* Unauthorized users are redirected to `/login`; signed-in users with the wrong role see an **Access Denied** screen
* One-click demo-account autofill buttons for Candidate / Recruiter / Admin on the login screen

### 👨‍💼 Recruiter Workspace

* Dashboard with assessment, candidate, and average-score stats plus recent activity
* **Assessment builder** — create and edit assessments (duration, passing marks, start/end schedule)
* **Problem bank** — full CRUD over MCQ problems (title, description, difficulty, marks, 4 options, correct answer)
* **Attach / detach problems** to any assessment from a searchable picker
* **Candidate directory** with search, pagination, and an invite-to-assessment modal
* **Pay & Publish** flow — a draft assessment is published only after a successful payment
* **Payments history** with status filters, search, copyable transaction IDs, and retry for failed payments
* **Company profile** — company name, website, description, designation, and company logo upload

### 🧑‍💻 Candidate Workspace

* Dashboard with assigned/completed counts, average score, recent assessments, and recent results
* **My Assessments** and **My Invitations** lists with search, status tabs, and pagination
* Accept or decline invitations (decline requires confirmation)
* **Timed assessment runner** — one question at a time, live countdown timer with a low-time warning state, per-question answer saving, and progress bar
* **Instant result screen** — score, percentage, pass/fail against passing marks
* **My Results** history with search, status filter, and pagination
* **Candidate profile** — bio, skills, experience, GitHub/LinkedIn links, and resume upload

### 🛡️ Admin Workspace

* Platform overview: total users, total assessments, active users, and recent activity
* **User management** — search, status filtering, pagination, and activate/suspend with confirmation
* **Audit logs** — searchable, sortable by `createdAt`, paginated, showing action, entity, and old/new values

### 🎨 UI/UX

* Light, dark, and system themes with no flash on load
* Fully responsive layouts — desktop data tables collapse into mobile card lists
* Purpose-built **skeleton**, **empty**, and **error-with-retry** states for every data view
* Custom branded loading screen, global error boundary, and 404 page
* Toasts for success/error feedback, reusable confirm/form modals, and debounced search inputs

---

## 👥 Roles

| Role | Access | Landing Area |
| --- | --- | --- |
| `CANDIDATE` | Accept invitations, take timed assessments, view results, manage profile & resume | `/candidate` |
| `RECRUITER` | Create assessments & problems, invite candidates, manage payments, company profile | `/recruiter` |
| `ADMIN` | Platform stats, user status management, audit logs, profile | `/admin` |

Self-registration offers **Candidate** and **Recruiter** only — no registration flow can create an `ADMIN` account.

---

## 🗺️ Routes

### Public

| Route | Description |
| --- | --- |
| `/` | Marketing landing page (hero, how-it-works, features, CTA) |
| `/about` | Mission, features, and audience split |
| `/assessments` | Public assessments page (shows an empty state — no public catalogue is seeded yet) |
| `/login` | Sign in + demo autofill + Google login |
| `/register` | Sign up with role selection |
| `/register/verify-account` | Email OTP verification (requires `?email=`) |
| `/forgot-password` | Request a password reset OTP |
| `/reset-password` | Set a new password with OTP |

### Protected (role-guarded)

| Route | Description |
| --- | --- |
| `/candidate` | Candidate overview |
| `/candidate/assessments` | Assigned assessments |
| `/candidate/assessments/[assessmentId]` | Assessment details |
| `/candidate/attempts/[attemptId]` | Timed assessment runner |
| `/candidate/invitations` | Invitations with accept/decline |
| `/candidate/results` | Results history |
| `/candidate/profile` | Profile & resume |
| `/recruiter` | Recruiter overview |
| `/recruiter/assessments` | Assessment management |
| `/recruiter/assessments/[assessmentId]/problems` | Attach/detach problems |
| `/recruiter/problems` | Problem bank CRUD |
| `/recruiter/candidates` | Candidate directory & invites |
| `/recruiter/payments` | Payment history & retries |
| `/recruiter/profile` | Company profile |
| `/admin` | Admin overview |
| `/admin/users` | User management |
| `/admin/audit-logs` | Audit log explorer |
| `/admin/profile` | Admin profile |

---


## 📦 Dependencies

```json
{
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "@tanstack/react-form": "^1.33.5",
    "@tanstack/react-query": "^5.102.8",
    "class-variance-authority": "^0.7.1",
    "cn": "^0.2.6",
    "date-fns": "^4.4.0",
    "input-otp": "^1.5.0",
    "lucide-react": "^1.43.0",
    "next": "16.3.4",
    "next-themes": "^0.4.6",
    "ofetch": "^1.5.1",
    "react": "19.2.8",
    "react-day-picker": "^10.0.1",
    "react-dom": "19.2.8",
    "react-icons": "^5.7.0",
    "shadcn": "^4.21.0",
    "sonner": "^2.0.8",
    "tw-animate-css": "^1.4.0",
    "zod": "^4.6.1"
  },
  "devDependencies": {
    "@biomejs/biome": "2.4.2",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mdalamin0/Developer-Assessment-Coding-Platform-Frontend
```

### 2️⃣ Navigate to the project directory

```bash
cd Developer-Assessment-Coding-Platform-Frontend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Configure environment variables

Create a `.env.local` file in the project root and point it at your DevAssess backend instance (see the [backend repository](https://github.com/mdalamin0/Developer-Assessment-Coding-Platform) for how to run the API locally). This is the **only** environment variable the app reads.

```env
# Base URL of the DevAssess backend REST API (no trailing slash)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

> `NEXT_PUBLIC_*` variables are inlined into the client bundle at build time. Never place server secrets here, and never commit `.env.local` (it is git-ignored).

### 5️⃣ Run the development server

```bash
npm run dev
```

### 6️⃣ Open your browser

```text
http://localhost:3000
```

---


## 🗂️ Project Structure

```
src/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, providers, toaster
│   ├── loading.tsx / error.tsx / not-found.tsx
│   ├── (dashboard)/                # Auth-protected, role-scoped dashboards
│   │   ├── admin/  candidate/  recruiter/
│   └── (public)/
│       ├── (auth)/                 # login, register, verify, reset
│       └── (merketing)/            # /, /about, /assessments
├── assets/logo/                    # Brand logo component
├── components/
│   ├── guards/                     # AuthGuard, RoleGuard, AccessDenied, AuthLoading
│   ├── layout/                     # Navbar, Footer, Dashboard shell/header/sidebar
│   ├── shared/                     # Modal, theme toggle, dashboard primitives
│   └── ui/                         # shadcn-style primitives
├── features/                       # Domain modules (api / hooks / types / schema / components)
│   ├── admin/  assessments/  attempt/  auth/  candidates/  home/
│   ├── invitations/  payment/  problems/  profile/  recruiter/  results/
├── hooks/                          # Shared hooks (useDebounce)
├── lib/                            # apiClient, cn utility
├── providers/                      # TanStack Query + Theme providers
├── routes/                         # Role-based navigation config
└── types/                          # Shared types
```

Each `features/*` module follows the same shape: `*.api.ts` (endpoint functions), `*.hooks.ts` (React Query wrappers), `*.types.ts`, optional `*.schema.ts` (Zod), and `components/`.



---

## 👨‍💻 Author

**Al-amin** — [@mdalamin0](https://github.com/mdalamin0) — author of both the frontend and the backend.

---

## ⭐ Support

If this project helped you or you like the architecture, please consider giving it a ⭐ on GitHub. It keeps the work visible and motivates continued development.