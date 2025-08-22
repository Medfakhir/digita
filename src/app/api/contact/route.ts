import { NextResponse } from "next/server";
export const runtime = "nodejs";

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
    const FROM = process.env.CONTACT_FROM || "Your Website <noreply@your-domain.com>";
    const BREVO_API_KEY = process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "BREVO_API_KEY not configured on server" },
        { status: 500 }
      );
    }
    if (!TO) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO (destination email) not configured on server" },
        { status: 500 }
      );
    }

    // Dynamic import of Brevo SDK
    const { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } = await import("@getbrevo/brevo");
    
    const apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

    const subjectLine = subject || `New Lead from Website${plan ? ` • ${plan}` : ""}`;

    const html = `
      <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin:0 0 8px;">New website inquiry</h2>
        <p style="margin:0 0 16px;color:#555;">You received a new message from your pricing funnel.</p>
        <table cellpadding="6" style="border-collapse: collapse; border: 1px solid #ddd;">
          <tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Name</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px; font-weight:bold;">Email</td><td style="padding:8px;">${escapeHtml(email)}</td></tr>
          ${phone ? `<tr style="background:#f9f9f9;"><td style="padding:8px; font-weight:bold;">Phone</td><td style="padding:8px;">${escapeHtml(phone)}</td></tr>` : ""}
          ${plan ? `<tr><td style="padding:8px; font-weight:bold;">Selected Plan</td><td style="padding:8px; color:#0066cc; font-weight:bold;">${escapeHtml(plan)}</td></tr>` : ""}
        </table>
        <h3 style="margin:16px 0 8px;">Message/Notes</h3>
        <div style="white-space: pre-wrap; background:#f7f7f8; padding:12px; border-radius:8px; border-left: 4px solid #0066cc;">${escapeHtml(message)}</div>
        <p style="margin-top:16px; font-size:12px; color:#666;">Sent from your website pricing form</p>
      </div>
    `;

    const sendSmtpEmail = new SendSmtpEmail();
    sendSmtpEmail.subject = subjectLine;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: "Website Contact Form", email: FROM.includes('<') ? FROM.match(/<(.+)>/)?.[1] || FROM : FROM };
    sendSmtpEmail.to = [{ email: TO, name: "Website Owner" }];
    sendSmtpEmail.replyTo = { email: email, name: name };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    // Send confirmation email to client
    if (plan) {
      const clientConfirmationHtml = `
        <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">We've received your inquiry</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin: 0 0 20px;">Your Selected Package</h2>
            
            <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #667eea; margin: 0 0 10px; font-size: 24px;">${escapeHtml(plan)}</h3>
              <p style="color: #64748b; margin: 0;">Perfect choice for your business needs!</p>
            </div>
            
            <div style="margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 15px;">What happens next?</h3>
              <div style="display: flex; align-items: center; margin: 10px 0;">
                <div style="width: 30px; height: 30px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-weight: bold;">1</span>
                </div>
                <span style="color: #374151;">We'll review your requirements within 2 hours</span>
              </div>
              <div style="display: flex; align-items: center; margin: 10px 0;">
                <div style="width: 30px; height: 30px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-weight: bold;">2</span>
                </div>
                <span style="color: #374151;">Schedule a free consultation call</span>
              </div>
              <div style="display: flex; align-items: center; margin: 10px 0;">
                <div style="width: 30px; height: 30px; background: #8b5cf6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                  <span style="color: white; font-weight: bold;">3</span>
                </div>
                <span style="color: #374151;">Receive your custom proposal</span>
              </div>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #92400e;"><strong>Quick Response Guarantee:</strong> We respond to all inquiries within 24 hours, but usually much faster!</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #6b7280; margin: 0;">Questions? Reply to this email or call us directly.</p>
              <p style="color: #6b7280; margin: 5px 0 0;">We're here to help make your project a success!</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 14px;">
            <p style="margin: 0;">This is an automated confirmation. Please don't reply to this email.</p>
          </div>
        </div>
      `;

      const clientEmail = new SendSmtpEmail();
      clientEmail.subject = `Thank you for choosing ${plan} - We'll be in touch soon!`;
      clientEmail.htmlContent = clientConfirmationHtml;
      clientEmail.sender = { name: "DigitalPro", email: FROM.includes('<') ? FROM.match(/<(.+)>/)?.[1] || FROM : FROM };
      clientEmail.to = [{ email: email, name: name }];

      try {
        await apiInstance.sendTransacEmail(clientEmail);
        console.log("[Contact] Confirmation email sent to client:", email);
      } catch (clientEmailError) {
        console.error("[Contact] Failed to send client confirmation:", clientEmailError);
        // Don't fail the main request if client email fails
      }
    }

    console.log("[Contact] Email sent via Brevo", {
      messageId: result.body?.messageId || 'sent',
      name,
      email,
      plan,
      to: TO
    });

    return NextResponse.json({ ok: true, messageId: result.body?.messageId || 'sent' });
  } catch (err: any) {
    console.error("[Contact] Brevo error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "Failed to send email" }, { status: 500 });
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

