"use client";

import { Hero3DScene } from "@/components/hero-3d-scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
} from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import Lottie from "lottie-react";
import {
    ArrowDown,
    Bot,
    BriefcaseBusiness,
    ChevronRight,
    Code2,
    Command,
    Download,
    ExternalLink,
    Globe2,
    GraduationCap,
    Mail,
    Menu,
    Moon,
    Send,
    Sparkles,
    Sun,
    Trophy,
    X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const roles = [
  "Software Developer",
  "AI Enthusiast",
  "Data Analyst",
  "Android Developer",
];

const navItems = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Certifications", "#global-certifications"],
  ["Awards", "#awards"],
  ["Research", "#research"],
  ["Resume", "#resume"],
  ["Contact", "#contact"],
] as const;

const skills = [
  ["Python", "Data analysis, automation scripts, and ML practice", "AI"],
  ["Java", "OOP, DSA practice, and Android basics", "Core"],
  ["Firebase", "Auth, Firestore, and simple realtime features", "Cloud"],
  ["SQL", "Queries, joins, reports, and data cleanup", "Data"],
  ["Power BI", "Dashboards, charts, and business reports", "Data"],
  ["Machine Learning", "Classification, prediction, and model experiments", "AI"],
  ["NLP", "Text analysis, resume parsing, and matching logic", "AI"],
  ["LLM Workflows", "LLM Workflows and Prompt Engineering with APIs", "AI"],
  ["Android Development", "Mobile app screens and Firebase-connected flows", "Mobile"],
  ["GitHub", "Version control, project history, and collaboration", "DevOps"],
  ["APIs", "Connecting forms, data, and third-party services", "Backend"],
  ["Excel", "Cleaning data, formulas, and quick analysis", "Data"],
  ["Pandas & NumPy", "Data manipulation, transformation, and analysis", "Data"],
];

const projects = [
  {
    title: "Smart Resume Analyzer",
    type: "AI + ATS",
    description:
      "Compares a resume with a job description, finds missing skills, and suggests clear improvements.",
    stack: ["Next.js", "NLP", "Firebase", "Resend"],
    demo: "#contact",
    github: "https://github.com/MayankKunwarSingh/smart-resume-analyzer",
  },
  {
    title: "AI SEO Blog Automation",
    type: "Automation",
    description:
      "Creates blog outlines, SEO notes, metadata, and a simple publishing checklist.",
    stack: ["Python", "OpenAI", "Next.js", "APIs"],
    github: "https://github.com/MayankKunwarSingh/ai-seo-blog-automation",
  },
  {
    title: "Find your Book",
    type: "ML Product",
    description:
      "Suggests books based on user preferences and similarity between books.",
    stack: ["Python", "ML", "React", "Firebase"],
    demo: "#projects",
    github: "https://github.com/MayankKunwarSingh/book-recommendation-app",
    playStore: "https://play.google.com/store/apps/details?id=com.devindramaya.findyourbook&pcampaignid=web_share",
  },
  {
    title: "Student-Senior Social Platform",
    type: "Community",
    description:
      "A platform idea for students to connect with seniors, ask questions, and share useful resources.",
    stack: ["Next.js", "Firebase Auth", "Firestore"],
    demo: "#projects",
    github: "https://github.com/MayankKunwarSingh/student-senior-platform",
  },
  {
    title: "Demand Forecasting System",
    type: "ML Product",
    description:
      "Built a predictive system to forecast product demand using historical sales data and trend analysis to support better inventory planning. Implemented data preprocessing, feature engineering, and model-based predictions to improve accuracy and reduce overstock/stockouts.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "APIs"],
    demo: "#projects",
    github: "https://github.com/MayankKunwarSingh/demand-forecasting-system",
  },
  {
    title: "Analytics Dashboard",
    type: "Data Viz",
    description:
      "A dashboard concept for tracking KPIs, trends, filters, and reports in one place.",
    stack: ["Power BI", "SQL", "TypeScript"],
    demo: "#github",
    github: "https://github.com/MayankKunwarSingh/analytics-dashboard",
  },
];

const timeline = [
  ["2026", "Preparing for internships and full-time opportunities", "Currently focused on improving my projects, strengthening problem-solving skills, and getting industry-ready before graduation."],
  ["2025", "Building larger real-world projects", "Worked on projects using Next.js, Firebase, dashboards, automation tools, and AI-integrated applications."],
  ["2024", "Exploring data analytics and AI", "Learned and practiced Python, SQL, Power BI, machine learning, and NLP through coursework and personal projects."],
  ["2023", "Developing strong programming fundamentals", "Started with Java, Python, DSA, GitHub, and Android development while building consistency in coding and problem solving."],
];

const internships = [
  {
    company: "Upflairs Pvt. Ltd.",
    position: "Generative AI Intern",
    duration: "Jun 2025 - Jul 2025",
    certificate: "/upflairs-generative-ai-achievement.png",
    responsibilities: [
      "Worked with Python libraries such as Pandas and NumPy to collect, clean, and validate data for Generative AI projects.",
      "Assisted in preparing high-quality datasets by performing data preprocessing and validation tasks.",
      "Created interactive dashboards and visualizations using Power BI and Matplotlib to present insights and project outcomes.",
      "Conducted exploratory data analysis to identify trends, patterns, and data quality issues.",
      "Collaborated with team members on AI-driven projects and contributed to data-focused problem-solving activities.",
    ],
  },
  {
    company: "Matrix Computers",
    position: "Data Science with Python Intern",
    duration: "Jul 2024 - Aug 2024",
    certificate: "/matrix-data-science-achievement.jpg",
    responsibilities: [
      "Cleaned, organized, and analyzed datasets using Python and Microsoft Excel to support business analysis tasks.",
      "Used Excel features such as Pivot Tables, Lookup functions, and charts to generate meaningful reports and insights.",
      "Applied ETL and data preprocessing techniques to prepare datasets for analysis and modeling.",
      "Performed data mining and exploratory analysis to uncover trends and support data-driven decision-making.",
      "Assisted in developing analytical workflows and reporting solutions for business requirements.",
    ],
  },
  {
    company: "IIHT Jaipur",
    position: "Core Python Training Program",
    duration: "Aug 2023",
    certificate: "/python-certification.jpeg",
    responsibilities: [
      "Completed a 15-day intensive training program covering Python fundamentals, data types, control structures, functions, modules, file handling, and object-oriented programming concepts.",
      "Developed hands-on programming skills through coding exercises and problem-solving activities.",
      "Gained practical experience in writing efficient Python programs and debugging applications.",
      "Learned foundational concepts that support software development, data analysis, and automation tasks.",
      "Awarded Grade A for successful completion of the training program.",
    ],
  },
];

export const advancedCertifications = [
  "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
  "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
  "BCG Data Science Job Simulation – Forage",
];

const globalCertifications = [
  {
    name: "Oracle Certification",
    issuer: "Oracle University",
    focus: "Oracle credential with an official badge and certificate PDF.",
    status: "View credential",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=7FE9F89548161F88327549C5298D7EF97CE1F9AAEE965F795AADCDAC76A626D2",
    certificate: "/oracle-certificate.pdf",
  },
  {
    name: "Oracle Certification II",
    issuer: "Oracle University",
    focus: "Another Oracle credential with an official badge and certificate PDF.",
    status: "View credential",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=74F4967A3F4BD844BBF0DD43785A870083D4D188202BFE8A509CE363B8057D04",
    certificate: "/oracle-certificate-2.pdf",
  },
  {
    name: "BCG Certification",
    issuer: "Boston Consulting Group",
    focus: "A BCG learning certificate with a downloadable PDF.",
    status: "View PDF",
    link: "/bcg-certificate.pdf",
    certificate: "/bcg-certificate.pdf",
  },
  {
    name: "Blockchain",
    issuer: "Certified Learning Program",
    focus: "Blockchain basics, distributed ledgers, and decentralization concepts.",
    status: "View PDF",
    link: "/blockchain-certificate.pdf",
    certificate: "/blockchain-certificate.pdf",
  },
  {
    name: "Data Analytics with Python",
    issuer: "Certified Learning Program",
    focus: "Python for data cleaning, analysis, and visual reports.",
    status: "View PDF",
    link: "/data-analytics-python-certificate.pdf",
    certificate: "/data-analytics-python-certificate.pdf",
  },
  {
    name: "Database Management System",
    issuer: "Certified Learning Program",
    focus: "DBMS concepts, relational models, SQL basics, and database design.",
    status: "View PDF",
    link: "/database-management-system-certificate.pdf",
    certificate: "/database-management-system-certificate.pdf",
  },
  {
    name: "Google Cloud Computing Foundations",
    issuer: "Google Cloud",
    focus: "Cloud basics, compute, storage, networking, and security fundamentals.",
    status: "View PDF",
    link: "/google-cloud-computing-foundations-certificate.pdf",
    certificate: "/google-cloud-computing-foundations-certificate.pdf",
  },
  {
    name: "Scalable Data Science",
    issuer: "Certified Learning Program",
    focus: "Data science workflows and ideas for working with larger datasets.",
    status: "View PDF",
    link: "/scalable-data-science-certificate.pdf",
    certificate: "/scalable-data-science-certificate.pdf",
  },
];

export const awards = [
  {
    title: "Generative AI Internship & Training",
    issuer: "Upflairs Pvt. Ltd.",
    detail: "Completed a 45-day summer internship and training program on Generative AI from 2 June 2025 to 17 July 2025.",
    year: "2025",
    image: "/upflairs-generative-ai-achievement.png",
    link: "/upflairs-generative-ai-achievement.png",
  },
  {
    title: "Data Science Python Internship",
    issuer: "Matrix Computers",
    detail: "Completed a Data Science Python training and internship at Jaipur Centre from 8 July 2024 to 18 August 2024.",
    year: "2024",
    image: "/matrix-data-science-achievement.jpg",
    link: "/matrix-data-science-achievement.jpg",
  },
  {
    title: "Award of Excellence",
    issuer: "Poornima Institute of Engineering and Technology",
    detail: "Received Best Non Final Year Project award for the 2024-25 session during Kalanidhi, the annual award ceremony.",
    year: "2025",
    image: "/poornima-award-of-excellence.jpg",
    link: "/poornima-award-of-excellence.jpg",
  },
];

export const publications = [
  {
    title: "AI-Driven Smart Resume Analyzer and Job Recommendation System",
    venue: "International Journal of Research Publication and Reviews, Vol. 7, Issue 4, pp. 467-473, April 2026",
    summary: "A published paper based on my resume analyzer project, covering resume evaluation, skill extraction, Firebase support, Android UI, and job recommendations.",
    link: "https://ijrpr.com/uploads/V7ISSUE4/IJRPR61566.pdf",
  },
];

const socials = [
  ["Email", "mailto:mayankithari@gmail.com", Mail],
  ["GitHub", "https://github.com/MayankKunwarSingh", Code2],
  ["LinkedIn", "https://www.linkedin.com/in/mayank-raj-b6939526a/", BriefcaseBusiness],
  ["Google Scholar", "https://scholar.google.com/citations?view_op=list_works&hl=en&user=InERkpUAAAAJ", GraduationCap],
  ["LeetCode", "https://leetcode.com/mayankraj", Code2],
  ["Kaggle", "https://www.kaggle.com/mayankraj55", Globe2],
] as const;

const orbitAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 220,
  h: 220,
  nm: "ai-orbit",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "pulse",
      sr: 1,
      ks: {
        o: { a: 0, k: 85 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 90, s: [360] }] },
        p: { a: 0, k: [110, 110, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [150, 150] },
        },
        {
          ty: "st",
          c: { a: 0, k: [0.22, 0.74, 0.98, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
    },
  ],
};

function SectionTitle({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="mx-auto mb-16 max-w-4xl text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-1.5 backdrop-blur-md">
        <Sparkles size={14} className="text-sky-400" />
        <span className="font-mono text-xs uppercase tracking-widest text-sky-300">{eyebrow}</span>
      </div>
      <h2 className="text-balance text-4xl font-bold tracking-tight text-white md:text-6xl text-gradient">
        {title}
      </h2>
      <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
        {copy}
      </p>
    </motion.div>
  );
}

export default function PortfolioExperience() {
  const [theme, setTheme] = useState("dark");
  const [roleIndex, setRoleIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState("");
  
  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  const glowX = useTransform(cursorX, (value) => `${value - 300}px`);
  const glowY = useTransform(cursorY, (value) => `${value - 300}px`);

  const stats = useMemo(
    () => [
      ["16+", "Tools I work with"],
      ["6", "Main projects"],
      ["8.5", "Current CGPA"],
      ["2026", "Graduation year"],
    ],
    [],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mayank-theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("mayank-theme");
    if (storedTheme) setTheme(storedTheme);

    const lenis = new Lenis({ lerp: 0.05, smoothWheel: true, wheelMultiplier: 1.2 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const roleTimer = window.setInterval(
      () => setRoleIndex((index) => (index + 1) % roles.length),
      2500,
    );

    gsap.fromTo(
      ".hero-chip",
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
    );

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(roleTimer);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [mouseX, mouseY]);

  async function submitContact(formData: FormData) {
    setContactStatus("Sending...");
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = await response.json().catch(() => ({}));

    if (data.mailto) {
      window.location.href = data.mailto;
      setContactStatus("Opening your email app with the message filled in.");
      return;
    }

    setContactStatus(
      response.ok
        ? "Message sent. Thanks for reaching out."
        : "Could not send right now. Please email mayankithari@gmail.com directly.",
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040a] text-white">
      <div className="grid-mask pointer-events-none fixed inset-0 z-0" />
      
      {/* Ambient Premium Glows */}
      <motion.div
        className="pointer-events-none fixed z-10 hidden size-[600px] rounded-full bg-sky-500/10 blur-[120px] mix-blend-screen md:block"
        style={{ x: glowX, y: glowY }}
      />
      <div className="pointer-events-none fixed top-[-20%] left-[-10%] z-0 size-[800px] rounded-full bg-indigo-500/10 blur-[150px] mix-blend-screen" />
      
      {/* Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed z-[100] hidden size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/50 bg-white/5 backdrop-blur-[2px] md:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <motion.div
        className="pointer-events-none fixed z-[100] hidden size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 md:block"
        style={{ x: cursorX, y: cursorY }}
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#02040a]/40 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-white to-slate-300 text-sm font-black text-slate-950 shadow-lg shadow-white/10 transition-transform group-hover:scale-105">
              MR
            </span>
            <span className="hidden text-sm font-bold tracking-wide sm:block text-slate-200">Mayank Raj</span>
          </a>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md lg:flex shadow-2xl">
            {navItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button
              aria-label="Open command palette"
              size="icon"
              variant="secondary"
              className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => setPaletteOpen(true)}
            >
              <Command size={18} />
            </Button>
            <Button
              aria-label="Toggle theme"
              size="icon"
              variant="secondary"
              className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hidden sm:flex"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            <Button
              aria-label="Open menu"
              size="icon"
              variant="secondary"
              className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 lg:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={18} />
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#02040a]/95 p-6 backdrop-blur-3xl lg:hidden"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-end">
              <Button size="icon" variant="secondary" className="rounded-full" onClick={() => setMenuOpen(false)}>
                <X size={20} />
              </Button>
            </div>
            <div className="mt-12 grid gap-4">
              {navItems.map(([label, href], i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass flex items-center justify-between rounded-2xl px-6 py-5 text-xl font-bold tracking-tight"
                >
                  {label}
                  <ChevronRight size={20} className="text-slate-500" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section id="top" className="relative min-h-screen overflow-hidden px-5 pt-32 pb-20">
        <Hero3DScene />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,transparent_0%,rgba(2,4,10,1)_100%)] z-10" />
        
        <div className="relative z-20 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hero-copy-depth">
            <motion.div style={{ y: y1 }} className="flex flex-col items-start">
              <div className="mb-8 flex flex-wrap gap-3">
                {["Next.js 15", "React 19", "Data Science", "Open to Work"].map((chip) => (
                  <motion.span
                    className="hero-chip rounded-full border border-sky-300/20 bg-sky-900/10 px-5 py-2 text-xs font-bold tracking-wide text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.1)] backdrop-blur-md"
                    key={chip}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
              <motion.h1
                className="text-balance text-6xl font-extrabold leading-[1.1] tracking-tighter text-white md:text-[5rem] lg:text-[5.5rem]"
                initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              >
                Hi, I&apos;m <br className="hidden md:block"/>
                <span className="text-gradient-accent">Mayank Raj</span>
              </motion.h1>
              <div className="mt-6 min-h-[5rem] overflow-hidden text-3xl font-bold tracking-tight text-slate-300 md:text-5xl">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="block origin-center transform-style-3d"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <motion.p 
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Computer Science student architecting practical solutions across AI, data analytics, and full-stack development. Building the future, one project at a time.
              </motion.p>
              
              <motion.div 
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button className="button-primary button-default rounded-full" onClick={() => location.assign("#projects")}>
                  View Projects <ChevronRight size={18} />
                </Button>
                <a href="/Mayank-Raj-Resume.pdf" download>
                  <Button variant="secondary" className="button-secondary button-default rounded-full">
                    <Download size={18} /> Download Resume
                  </Button>
                </a>
              </motion.div>

              <motion.div 
                className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {stats.map(([value, label]) => (
                  <motion.div 
                    key={label}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="glass rounded-2xl p-5 border border-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="text-3xl font-black text-white">{value}</div>
                      <div className="mt-2 text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="hero-portrait-stage relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
            <motion.div style={{ y: y2 }} className="w-full relative">
              {/* Premium Glow Behind Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[110%] rounded-[40px] bg-gradient-to-br from-sky-400/20 via-indigo-500/10 to-purple-500/20 blur-3xl" />
              
              <div className="hero-portrait-card relative z-20 mx-auto max-w-[420px] aspect-[4/5] overflow-hidden rounded-[32px] border border-white/20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),rgba(0,0,0,0.8)_60%)] p-2 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-[32px]" />
                <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                  <Image
                    src="/mayank-raj-photo.png"
                    alt="Mayank Raj professional portrait"
                    width={900}
                    height={900}
                    priority
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/40 to-transparent" />
                  
                  {/* Glassmorphic overlay info */}
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
                    <p className="font-mono text-xs uppercase tracking-widest text-sky-300">
                      Profile
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-white">
                      Mayank Raj
                    </h2>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-medium text-slate-300">Available for Opportunities</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Chips around Portrait */}
              <div className="absolute -inset-10 z-30 pointer-events-none hidden md:block">
                {[
                  { text: "Data Science", top: "10%", left: "-10%", delay: 0 },
                  { text: "AI & GenAI", top: "20%", right: "-5%", delay: 0.2 },
                  { text: "Full Stack", bottom: "30%", left: "-15%", delay: 0.4 },
                  { text: "Android", bottom: "15%", right: "-10%", delay: 0.6 }
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    className="absolute depth-chip rounded-full border border-white/10 bg-slate-900/60 px-5 py-2.5 backdrop-blur-xl shadow-2xl flex items-center gap-2 pointer-events-auto"
                    style={{ top: item.top, left: item.left, right: item.right }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + item.delay, type: "spring" }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(15, 23, 42, 0.9)" }}
                  >
                    <Sparkles className="text-sky-400" size={14} />
                    <span className="text-sm font-bold text-white whitespace-nowrap">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.a
          href="#about"
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 z-30 hidden -translate-x-1/2 rounded-full border border-white/10 bg-white/5 p-4 text-slate-300 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white md:block shadow-2xl"
          aria-label="Scroll to about"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.a>
      </section>

      {/* About Section */}
      <section id="about" className="relative px-5 py-32 z-20 bg-[#02040a]">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="About"
            title="Building the bridge between data and user experience."
            copy="My journey is driven by a passion for solving complex problems through elegant code, intelligent algorithms, and intuitive design."
          />
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="depth-card h-full p-8 lg:p-12 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Lottie animationData={orbitAnimation} loop className="mx-auto size-56 mb-8 drop-shadow-2xl" />
                <h3 className="text-3xl font-bold text-white mb-6">Continuous Learner.</h3>
                <p className="text-lg leading-relaxed text-slate-300 mb-6 font-medium">
                  I'm a developer who enjoys building practical projects and continuously learning new technologies. Most of my work revolves around frontend development, AI-based ideas, automation, and data analytics.
                </p>
                <p className="text-lg leading-relaxed text-slate-400">
                  I like turning ideas into real applications while improving my problem-solving and development skills through hands-on projects, rigorous research, and relentless experimentation.
                </p>
              </Card>
            </motion.div>
            
            <div className="grid gap-5">
              {timeline.map(([year, title, copy], i) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card className="glass group grid gap-6 p-6 sm:grid-cols-[100px_1fr] items-start transition-all hover:bg-white/[0.03]">
                    <div className="font-mono text-2xl font-black text-sky-400/50 group-hover:text-sky-300 transition-colors">{year}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                      <p className="mt-3 leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{copy}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative px-5 py-32 z-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Expertise"
            title="A robust arsenal of modern technologies."
            copy="Equipped with the right tools to architect scalable backends, design beautiful frontends, and train intelligent models."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {skills.map(([name, copy, group], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              >
                <Card className="depth-card h-full p-6 flex flex-col justify-between group cursor-default">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-sky-300">
                        {group}
                      </span>
                      <Code2 size={20} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">{name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{copy}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative px-5 py-32 z-20 bg-slate-950/30">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Selected Work"
            title="Featured Projects & Applications."
            copy="Showcasing end-to-end solutions, from predictive ML models to responsive web apps."
          />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="depth-card group h-full flex flex-col overflow-hidden p-0 border border-white/10 bg-white/[0.02]">
                  <div className="depth-card-img-wrapper relative h-56 overflow-hidden border-b border-white/10 bg-slate-950">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 via-transparent to-purple-500/20 mix-blend-overlay group-hover:opacity-100 opacity-50 transition-opacity duration-500" />
                    
                    {/* Abstract Project Preview Graphic */}
                    <div className="depth-card-img absolute inset-0 flex items-center justify-center p-6">
                       <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-5 flex flex-col shadow-2xl">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-mono text-xs font-bold text-sky-400">{project.type}</span>
                            <span className="text-xs font-bold text-slate-500">0{index + 1}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-4">
                            <div className="h-full w-2/3 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full" />
                          </div>
                          <div className="flex gap-2 mt-auto">
                            <div className="h-10 w-1/3 rounded bg-white/5" />
                            <div className="h-10 w-2/3 rounded bg-white/10" />
                          </div>
                       </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">{project.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400 flex-grow">
                      {project.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex gap-3">
                      <a href={project.demo} className="flex-1">
                        <Button className="w-full button-primary rounded-xl" size="sm">
                          View Project <ExternalLink size={16} />
                        </Button>
                      </a>
                      <a href={project.github} target="_blank" rel="noreferrer">
                        <Button size="icon" variant="secondary" className="rounded-xl border border-white/10" aria-label={`${project.title} GitHub`}>
                          <Code2 size={18} />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume & Experience Section */}
      <section id="resume" className="relative px-5 py-32 z-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Experience & Resumes"
            title="Professional history and role-specific CVs."
            copy="Download the resume that best fits the role you are looking to fill."
          />
          
          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {[
              { role: "Data Science & Analyst", color: "text-sky-400", file: "/Mayank-Raj-Resume-Data.pdf", icon: BriefcaseBusiness },
              { role: "Android Developer", color: "text-amber-400", file: "/Mayank-Raj-Resume-Android.pdf", icon: Code2 },
              { role: "Software Developer", color: "text-rose-400", file: "/Mayank-Raj-Resume-Software-Developer.pdf", icon: Command }
            ].map((resume, i) => (
              <motion.div
                key={resume.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass p-8 text-center flex flex-col items-center group hover:bg-white/[0.05]">
                  <span className={`grid size-16 place-items-center rounded-2xl bg-white/5 mb-6 group-hover:scale-110 transition-transform ${resume.color}`}>
                    <resume.icon size={28} />
                  </span>
                  <h3 className="text-xl font-bold text-white">{resume.role}</h3>
                  <a href={resume.file} download className="mt-8 w-full block">
                    <Button variant="secondary" className="w-full rounded-xl group-hover:bg-white/10 group-hover:border-white/20">
                      <Download size={18} /> Download PDF
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-12 mb-24">
            <h3 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Trophy className="text-sky-400" /> Internship Experience
            </h3>
            <div className="grid gap-6">
              {internships.map((internship, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="depth-card p-6 md:p-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_240px] lg:items-center">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-4 mb-2">
                          <h4 className="text-2xl font-bold text-white">{internship.company}</h4>
                          <span className="rounded-full bg-sky-400/10 border border-sky-400/20 px-3 py-1 text-sm font-bold text-sky-400">{internship.position}</span>
                        </div>
                        <p className="text-sm font-mono text-slate-500 mb-6">{internship.duration}</p>
                        <ul className="space-y-3">
                          {internship.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex gap-4 text-slate-300">
                              <span className="shrink-0 text-sky-400 mt-1">✦</span>
                              <span className="leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={internship.certificate}
                        target="_blank"
                        rel="noreferrer"
                        className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-black/40 aspect-[4/3] shadow-2xl"
                      >
                        <Image
                          src={internship.certificate}
                          alt={`${internship.position} certificate`}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-80"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                           <ExternalLink size={32} className="text-white" />
                        </div>
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Certifications & Awards Combined */}
      <section id="global-certifications" className="relative px-5 py-32 z-20 bg-slate-950/40">
        <div className="mx-auto max-w-7xl">
           <SectionTitle
            eyebrow="Recognition"
            title="Global Certifications & Awards."
            copy="Official credentials from industry leaders like Oracle, Google Cloud, and BCG."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {globalCertifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="depth-card h-full p-6 group">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-600/20 border border-amber-400/20 group-hover:scale-110 transition-transform">
                      <Trophy size={20} className="text-amber-400" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{cert.name}</h3>
                  <p className="mt-2 text-xs font-mono uppercase tracking-wider text-slate-500">{cert.issuer}</p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400 flex-grow">
                    {cert.focus}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex gap-4">
                     <a href={cert.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-sky-400 hover:text-sky-300">
                       View Credential
                     </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-5 py-32 z-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle
              eyebrow="Contact"
              title="Let's build something amazing together."
              copy="I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!"
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {socials.map(([label, href, Icon], i) => (
                <motion.a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="glass flex items-center gap-4 p-5 hover:bg-white/[0.05] hover:-translate-y-1 transition-all group">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/5 group-hover:bg-sky-400/20 transition-colors">
                      <Icon size={20} className="text-slate-400 group-hover:text-sky-400 transition-colors" />
                    </span>
                    <span className="font-bold text-slate-200 group-hover:text-white">{label}</span>
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="depth-card p-8 lg:p-10 border border-white/10 bg-slate-900/50">
              <form action={submitContact} className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Name</label>
                    <input name="name" required placeholder="John Doe" className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-medium placeholder:text-slate-600" />
                  </div>
                  <div className="grid gap-2">
                     <label className="text-sm font-bold text-slate-400 ml-1">Email</label>
                    <input name="email" required type="email" placeholder="john@example.com" className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-medium placeholder:text-slate-600" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Message</label>
                  <textarea name="message" required placeholder="Hello Mayank, I'd like to talk about..." className="min-h-[200px] resize-none rounded-xl border border-white/10 bg-black/40 px-5 py-4 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all font-medium placeholder:text-slate-600" />
                </div>
                <Button className="button-primary h-14 text-lg rounded-xl mt-2">
                  Send Message <Send size={20} className="ml-2" />
                </Button>
                {contactStatus ? (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-center font-bold text-sky-400 mt-2"
                  >
                    {contactStatus}
                  </motion.p>
                ) : null}
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#02040a] px-5 py-12 relative z-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
             <span className="grid size-8 place-items-center rounded-lg bg-white text-xs font-black text-slate-950">
              MR
            </span>
            <p className="font-medium text-slate-500">© 2026 Mayank Raj. All rights reserved.</p>
          </div>
          <p className="text-sm font-medium text-slate-600">Built with Next.js, React Three Fiber & Framer Motion.</p>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <Button
        className="fixed bottom-6 right-6 z-50 shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:shadow-[0_0_60px_rgba(56,189,248,0.5)] rounded-full h-14 w-14 border border-sky-400/30 bg-slate-950"
        size="icon"
        aria-label="Open AI assistant"
        onClick={() => setChatOpen((value) => !value)}
      >
        <Bot size={24} className="text-sky-400" />
      </Button>

      <AnimatePresence>
        {chatOpen ? (
          <motion.aside
            id="assistant"
            className="fixed bottom-24 right-6 z-50 w-[min(400px,calc(100vw-48px))] rounded-2xl border border-white/10 bg-slate-950/90 p-5 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-full bg-sky-400/20 text-sky-400">
                  <Bot size={16} />
                </div>
                <h3 className="font-bold text-white">Portfolio AI</h3>
              </div>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10" onClick={() => setChatOpen(false)}>
                <X size={16} />
              </Button>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <p className="rounded-xl bg-white/5 border border-white/5 p-4 leading-relaxed font-medium">
                Hello! I'm an AI assistant. I can help you find projects, explain my skills, or guide you to my resume. How can I assist you today?
              </p>
              <div className="grid gap-2 mt-2">
                {["Summarize Mayank's Experience", "Show Machine Learning Projects", "What is his tech stack?"].map((prompt) => (
                  <button
                    key={prompt}
                    className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-left font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {paletteOpen ? (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-start bg-[#02040a]/80 px-5 pt-[15vh] backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90 shadow-2xl"
              initial={{ scale: 0.98, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Command size={20} className="text-slate-400" />
                <input 
                  autoFocus 
                  placeholder="Search portfolio..." 
                  className="w-full bg-transparent text-lg font-medium text-white placeholder:text-slate-500 outline-none"
                />
                <kbd className="hidden rounded border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-400 sm:block">ESC</kbd>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-2">
                <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-500">Navigation</div>
                {[...navItems, ["GitHub", "#github"]].map(
                  ([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setPaletteOpen(false)}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition-colors hover:bg-sky-500/20 hover:text-sky-300"
                    >
                      {label}
                      <ChevronRight size={16} className="opacity-50" />
                    </a>
                  ),
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
