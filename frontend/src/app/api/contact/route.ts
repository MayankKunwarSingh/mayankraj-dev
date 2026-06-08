import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  const payload = contactSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json({ error: "Invalid contact form data" }, { status: 400 });
  }

  const { name, email, message } = payload.data;
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_TO_EMAIL || "mayankithari@gmail.com";
  const subject = `Portfolio inquiry from ${name}`;
  const text = `Name: ${name}
Email: ${email}

Message:
${message}`;
  const mailto = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

  if (!apiKey) {
    return NextResponse.json({
      ok: true,
      mode: "mailto",
      mailto,
      message: "Email provider is not configured. Opening the visitor email app instead.",
    });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: inbox,
      replyTo: email,
      subject,
      text,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        mode: "mailto",
        mailto,
        message: "Email service failed. Use the mailto fallback.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
