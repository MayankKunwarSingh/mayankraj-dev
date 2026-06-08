import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mayank-raj-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mayank Raj | Software Developer, AI Enthusiast, Data Analyst",
    template: "%s | Mayank Raj",
  },
  description:
    "Portfolio of Mayank Raj, a Computer Science student building projects in software development, AI, data analytics, and Android.",
  keywords: [
    "Mayank Raj",
    "Software Developer",
    "AI Enthusiast",
    "Data Analyst",
    "Android Developer",
    "Next.js Developer",
    "Machine Learning",
    "Portfolio",
    "Remote Internship",
  ],
  authors: [{ name: "Mayank Raj" }],
  creator: "Mayank Raj",
  openGraph: {
    title: "Mayank Raj | Developer Portfolio",
    description:
      "Explore Mayank Raj's projects, resume, certifications, research, and coding profiles.",
    url: siteUrl,
    siteName: "Mayank Raj Portfolio",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Mayank Raj portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Raj | Software Developer",
    description:
      "Projects, resume, certifications, research, and coding profiles by Mayank Raj.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mayank Raj",
    jobTitle: "Software Developer",
    url: siteUrl,
    sameAs: [
      "https://github.com/MayankKunwarSingh",
      "https://www.linkedin.com/in/mayank-raj-b6939526a/",
      "https://scholar.google.com/citations?view_op=list_works&hl=en&user=InERkpUAAAAJ",
      "https://www.instagram.com/mayank_kunwar_singh/",
    ],
    knowsAbout: [
      "Python",
      "Java",
      "React",
      "Next.js",
      "Firebase",
      "Machine Learning",
      "NLP",
      "Power BI",
      "Android Development",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
