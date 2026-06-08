import { NextResponse } from "next/server";
import { z } from "zod";

const coverLetterSchema = z.object({
  company: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(120),
  focus: z.string().trim().max(800).optional(),
});

export async function POST(request: Request) {
  const payload = coverLetterSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid cover letter input" }, { status: 400 });
  }

  const { company, role, focus } = payload.data;

  if (process.env.OPENAI_API_KEY) {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: `Write a concise and natural cover letter for Mayank Raj applying to ${role} at ${company}. Keep it honest and student-friendly. Mention software development, AI, data analytics, Android development, Next.js, Firebase, and projects where relevant. Extra focus: ${focus || "internship or entry-level software role"}.`,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const generated =
        data.output_text ||
        data.output?.[0]?.content?.[0]?.text ||
        "";

      if (generated) {
        return NextResponse.json({ coverLetter: generated });
      }
    }
  }

  return NextResponse.json({
    coverLetter: `Dear ${company} Hiring Team,

I am excited to apply for the ${role} role at ${company}. I am Mayank Raj, a Computer Science student interested in software development, AI, data analytics, and Android development.

My work includes projects such as a Smart Resume Analyzer, AI SEO Blog Automation system, Find your Book, Student-Senior Social Platform, AI Chatbot, and Analytics Dashboard. These projects helped me practice Python, Java, TypeScript, React, Next.js, Firebase, SQL, Power BI, machine learning, NLP, APIs, and GitHub workflows.

${focus ? `For this opportunity, I would especially like to highlight ${focus}.` : "I am looking for a team where I can learn quickly, contribute sincerely, and keep improving through real work."}

I would be grateful for the chance to contribute, learn from your team, and build software that creates real value for users.

Sincerely,
Mayank Raj`,
  });
}
