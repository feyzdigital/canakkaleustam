// ===========================================
// E-posta Gönderim Servisi
// ===========================================

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "noreply@canakkaleustam.com";

  // Geliştirme ortamında e-postayı konsola yazdır
  if (process.env.NODE_ENV === "development") {
    console.log(`[EMAIL DEV] To: ${params.to}, Subject: ${params.subject}`);
    console.log(`[EMAIL DEV] Body: ${params.html.substring(0, 200)}...`);
    return { success: true, messageId: "dev-" + Date.now() };
  }

  if (!apiKey) {
    console.error("Resend API anahtarı yapılandırılmamış");
    return { success: false, error: "E-posta servisi yapılandırılmamış" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: params.to,
        subject: params.subject,
        html: params.html,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, messageId: data.id };
    } else {
      return { success: false, error: data.message || "E-posta gönderilemedi" };
    }
  } catch (error) {
    console.error("E-posta gönderim hatası:", error);
    return { success: false, error: "E-posta gönderim hatası" };
  }
}

// E-posta şablonları
export function getVerificationEmailHTML(code: string): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1E40AF; font-size: 24px;">Çanakkale Ustam</h1>
      </div>
      <div style="background: #F8FAFC; border-radius: 12px; padding: 30px; text-align: center;">
        <h2 style="color: #1E293B; margin-bottom: 16px;">E-posta Doğrulama</h2>
        <p style="color: #64748B; margin-bottom: 24px;">
          Hesabınızı doğrulamak için aşağıdaki kodu kullanın:
        </p>
        <div style="background: #1E40AF; color: white; font-size: 32px; letter-spacing: 8px; padding: 16px 32px; border-radius: 8px; display: inline-block; font-weight: bold;">
          ${code}
        </div>
        <p style="color: #94A3B8; margin-top: 24px; font-size: 14px;">
          Bu kod 3 dakika süreyle geçerlidir.
        </p>
      </div>
      <div style="text-align: center; margin-top: 30px; color: #94A3B8; font-size: 12px;">
        <p>Bu e-postayı siz talep etmediyseniz, lütfen dikkate almayın.</p>
        <p>&copy; ${new Date().getFullYear()} Çanakkale Ustam. Tüm hakları saklıdır.</p>
      </div>
    </div>
  `;
}

export function getWelcomeEmailHTML(name: string): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1E40AF; font-size: 24px;">Çanakkale Ustam</h1>
      </div>
      <div style="background: #F8FAFC; border-radius: 12px; padding: 30px;">
        <h2 style="color: #1E293B; margin-bottom: 16px;">Hoş Geldiniz, ${name}!</h2>
        <p style="color: #64748B; line-height: 1.6;">
          Çanakkale Ustam platformuna kayıt olduğunuz için teşekkür ederiz.
          Artık Çanakkale'nin güvenilir ustalarını bulabilir ve hizmet talebinde bulunabilirsiniz.
        </p>
        <div style="text-align: center; margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" 
             style="background: #1E40AF; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
            Platformu Keşfedin
          </a>
        </div>
      </div>
    </div>
  `;
}
