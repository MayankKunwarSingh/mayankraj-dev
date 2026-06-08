# Mayank Raj Portfolio Frontend

This folder contains the production-ready Next.js portfolio website.

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- ShadCN-style UI components
- Framer Motion
- GSAP
- Three.js and React Three Fiber
- Lenis smooth scrolling
- Lottie animations
- Firebase
- Resend email API
- Vercel Analytics

## Run Locally

Open a terminal in the project root, then run:

```bash
cd frontend
npm install
copy .env.example .env.local
npm run dev
```

Open the website at:

```txt
http://localhost:3000
```

## Main Commands

```bash
npm run dev
```

Starts the local development server.

```bash
npm run lint
```

Checks code quality with ESLint.

```bash
npm run build
```

Creates the production build.

```bash
npm run start
```

Runs the production build locally after `npm run build`.

## Environment Variables

Create this file:

```txt
frontend/.env.local
```

Use `frontend/.env.example` as the template.

Required for site URL:

```env
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

Required for Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Required for contact form email:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=mayankithari@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

Optional for AI cover letter generation:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

Optional for Google Analytics:

```env
NEXT_PUBLIC_GA_ID=
```

## Important Files

```txt
src/app/page.tsx
```

Main page entry.

```txt
src/components/portfolio-experience.tsx
```

Main portfolio UI, animations, 3D hero, sections, chatbot shell, command palette, and contact UI.

Includes these portfolio sections:

- Hero
- About
- Skills
- Projects
- Resume
- Global Certifications
- Awards and Achievements
- Research and Publications
- GitHub and coding profiles
- AI cover letter generator
- Contact

```txt
src/app/layout.tsx
```

SEO metadata, Open Graph setup, structured data, PWA manifest link, and Vercel Analytics.

```txt
src/app/api/contact/route.ts
```

Backend API route for the contact form.

```txt
src/app/api/cover-letter/route.ts
```

Backend API route for AI cover letter generation.

```txt
src/lib/firebase.ts
```

Firebase app, auth, and Firestore setup.

```txt
public/Mayank-Raj-Resume.pdf
```

Resume PDF used by the Download Resume buttons.

## Customize Before Deployment

Update these before publishing:

- Replace placeholder GitHub, LinkedIn, LeetCode, HackerRank, and Kaggle URLs.
- Current contact links are set to Mayank's email, LinkedIn, GitHub, Google Scholar, and Instagram.
- Replace `public/Mayank-Raj-Resume.pdf` with your final resume.
- Add real project demo links.
- Add real credential links in the Global Certifications section.
- Add real awards in the `awards` list.
- Add papers, Google Scholar work, or case studies in the `publications` list.
- Add real Firebase environment variables.
- Add Resend credentials for the contact form.
- Without `RESEND_API_KEY`, the contact form opens the visitor's email app with Mayank's email filled in.
- Add `OPENAI_API_KEY` if you want live AI cover letter generation.

## Deploy on Vercel

1. Push the full project to GitHub.
2. Open Vercel.
3. Import the GitHub repository.
4. Set the root directory to:

```txt
frontend
```

5. Add environment variables from `.env.example`.
6. Click Deploy.

## Production Check

Before deployment, run:

```bash
npm run lint
npm run build
```

Both commands should pass successfully.
