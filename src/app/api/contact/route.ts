import { NextResponse } from "next/server";

// POST /api/contact
// Body: { name: string; email: string; message: string; subject?: string; phone?: string; plan?: string }
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, message, subject, phone, plan } = body || {};

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    const TO = process.env.CONTACT_TO || process.env.NEXT_PUBLIC_CONTACT_TO;
    const FROM = process.env.CONTACT_FROM || "Acme <onboarding@resend.dev>"; // Resend sandbox from works for testing
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY not configured on server" },
        { status: 500 }
      );
    }
    if (!TO) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO (destination email) not configured on server" },
        { status: 500 }
      );
    }

    // Dynamic import so the project builds even before installing the dependency
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    const subjectLine = subject || `New Lead from Website${plan ? ` • ${plan}` : ""}`;

    const html = `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin:0 0 8px;">New website inquiry</h2>
        <p style="margin:0 0 16px;color:#555;">You received a new message from your funnel.</p>
        <table cellpadding="6" style="border-collapse: collapse;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>` : ""}
          ${plan ? `<tr><td><strong>Selected Plan</strong></td><td>${escapeHtml(plan)}</td></tr>` : ""}
        </table>
        <h3 style="margin:16px 0 8px;">Message</h3>
        <pre style="white-space: pre-wrap; background:#f7f7f8; padding:12px; border-radius:8px;">${escapeHtml(message)}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: subjectLine,
      html,
    } as any);

    if (error) {
      return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}

// Simple HTML escaper to prevent injection in email body
function escapeHtml(input: string) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
