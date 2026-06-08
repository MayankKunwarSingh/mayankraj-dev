<<<<<<< HEAD
# Mayank Raj Portfolio

Production-ready futuristic portfolio for Mayank Raj, built with Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN-style UI primitives, Framer Motion, GSAP, Three.js, React Three Fiber, Lenis, Lottie, Firebase, Resend, and Vercel Analytics.

## Folder Structure

```txt
my website/
  frontend/   Next.js app, UI, API routes, SEO, PWA, analytics
  backend/    Backend notes; Vercel API routes live in frontend/src/app/api
  database/   Firebase rules, indexes, and schema notes
```

## Local Setup

Ultimate AI Prompt for Professional Portfolio Website

Create a world-class futuristic personal portfolio website for “Mayank Raj” that is production-ready, fully deployable, recruiter-friendly, ATS-optimized, SEO-optimized, ultra-fast, and visually stunning.

The website must be designed like a premium Silicon Valley startup product with cinematic UI/UX, advanced animations, AI-inspired graphics, 3D visuals, glassmorphism, smooth scrolling, and interactive effects.

The portfolio should help recruiters instantly understand:

My skills
My projects
My resume
My certifications
My GitHub activity
My LinkedIn profile
My technical expertise
My achievements
My experience

The website should look more premium than a normal developer portfolio and feel like a high-end tech company landing page.

Mandatory Tech Stack (VERY IMPORTANT)

Use ONLY modern industry-standard technologies that are highly scalable, recruiter-friendly, and easy to host globally.

Frontend:

Next.js 15 (App Router)
React 19
TypeScript
Tailwind CSS
ShadCN UI

Animations & Graphics:

Framer Motion
GSAP
Three.js
React Three Fiber
Lenis Smooth Scroll
Lottie Animations

Backend / APIs:

Next.js API Routes
Node.js

Database & Storage:

Firebase
OR
Supabase

Authentication:

Clerk Authentication
OR
Firebase Auth

Deployment & Hosting:

Vercel (PRIMARY)
Cloudflare CDN
GitHub Integration for CI/CD

SEO & Performance:

Next SEO
Dynamic Metadata
Open Graph SEO
Structured Data
Sitemap.xml
Robots.txt
Image Optimization
Lazy Loading
Server-Side Rendering (SSR)
Static Site Generation (SSG)

Analytics:

Vercel Analytics
Google Analytics

Forms & Email:

Resend API
OR
EmailJS

Version Control:

Git + GitHub

Optional AI Features:

OpenAI API integration
AI chatbot assistant
AI cover letter generator
Website Sections
1. Hero Section
Full-screen cinematic intro
Animated text:
“Hi, I’m Mayank Raj”
Dynamic rotating roles:
Software Developer
AI Enthusiast
Data Analyst
Android Developer
Animated futuristic background
CTA Buttons:
View Projects
Download Resume
Contact Me
2. About Me
Professional summary
Career goals
Passion for AI & Development
Animated timeline journey
Stats counters
3. Skills Section

Interactive animated skill cards with categories:

Python
Java
JavaScript
TypeScript
React
Next.js
Firebase
SQL
Power BI
Machine Learning
NLP
Android Development
Tailwind CSS
GitHub
APIs
Excel
4. Projects Showcase

Create premium animated project cards with:

Live Demo
GitHub Link
Tech Stack
Project Details
Animated hover effects
Video/image preview

Projects:

- Smart Resume Analyzer
- AI SEO Blog Automation
- Find your Book (Android: https://play.google.com/store/apps/details?id=com.devindramaya.findyourbook&pcampaignid=web_share)
- Student-Senior Social Platform
- AI Chatbot
- Analytics Dashboard
5. Resume Section
Resume preview
ATS-friendly downloadable PDF
Experience timeline
Education timeline
6. Certifications Section

Animated carousel/grid.

7. Experience / Internship Section

Professional timeline layout.

8. GitHub & Coding Profiles

Add:

GitHub stats
Contribution graph
LinkedIn
LeetCode
HackerRank
Kaggle
9. Cover Letter Section

Dynamic AI-based cover letter generator.

10. Contact Section

Beautiful futuristic form with:

Email
LinkedIn
GitHub
Social icons
Resume download
Advanced Features

Include:

AI chatbot
Command palette
Theme switcher
Custom cursor
Particle effects
3D globe
Interactive backgrounds
Scroll animations
Mouse tracking glow
Loading animations
PWA support
Dark/light mode
Keyboard shortcuts
Visitor analytics dashboard
Hosting & Deployment Requirements

VERY IMPORTANT:
The project MUST be:

Easily deployable on Vercel
SEO optimized for Google ranking
Fast loading globally
Mobile optimized
Lighthouse score above 95
Secure and scalable
ATS recruiter-friendly

Generate:

Complete production-ready code
Folder structure
README.md
Deployment guide
Environment variables setup
GitHub upload instructions
Vercel deployment steps
UI Inspiration

The design should feel inspired by:

Apple
Stripe
Linear
Framer
Vercel
Tesla
Final Goal

The final portfolio should:

Impress recruiters within 5 seconds
Feel like a billion-dollar startup website
Showcase strong frontend + AI + development skills
Help me get internships/jobs remotely and globally
Look unique compared to normal portfolio websites
Be visually unforgettable yet professional

The result should look like it was built by an elite frontend engineer from a top Silicon Valley company.
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `frontend/.env.local` from `frontend/.env.example`.

Required for production contact email:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

Required for Firebase features:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Optional AI generation:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

## Vercel Deployment

1. Push this folder to GitHub.
2. Go to Vercel and import the GitHub repository.
3. Set the project root to `frontend`.
4. Add the environment variables from `.env.example`.
5. Deploy.
6. Add your custom domain when ready.

## GitHub Upload

```bash
git init
git add .
git commit -m "Build premium Mayank Raj portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Firebase Deployment

Install Firebase CLI, then deploy the rules in the `database` folder:

```bash
firebase login
firebase init firestore
firebase deploy --only firestore:rules,firestore:indexes
```

## Production Checklist

- Replace placeholder profile URLs with exact GitHub, LinkedIn, LeetCode, HackerRank, and Kaggle usernames.
- Replace `frontend/public/Mayank-Raj-Resume.pdf` with your final resume PDF.
- Add real project live demo links.
- Configure Resend and Firebase environment variables.
- Run `npm run build` before deploying.
- Audit Lighthouse after deployment and compress any custom media you add.
=======
# mayankraj-dev
Personal portfolio showcasing my projects, skills, certifications, and experience in Data Analytics, Machine Learning, Python, SQL, Power BI, and Android Development.
>>>>>>> 81ff80fe0847f5974f482d01236c9d6b4d5abe1c
