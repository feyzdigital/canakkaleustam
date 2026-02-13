// ===========================================
// SMS Gönderim Servisi
// ===========================================

interface SendSMSParams {
  to: string;
  message: string;
}

interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function sendViaTwilio(params: SendSMSParams): Promise<SMSResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.error("Twilio yapılandırması eksik");
    return { success: false, error: "SMS servisi yapılandırılmamış" };
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          To: params.to,
          From: fromNumber,
          Body: params.message,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true, messageId: data.sid };
    } else {
      return { success: false, error: data.message || "SMS gönderilemedi" };
    }
  } catch (error) {
    console.error("Twilio SMS hatası:", error);
    return { success: false, error: "SMS gönderim hatası" };
  }
}

async function sendViaNetGSM(params: SendSMSParams): Promise<SMSResult> {
  const username = process.env.NETGSM_USERNAME;
  const password = process.env.NETGSM_PASSWORD;
  const header = process.env.NETGSM_HEADER;

  if (!username || !password || !header) {
    console.error("NetGSM yapılandırması eksik");
    return { success: false, error: "SMS servisi yapılandırılmamış" };
  }

  try {
    const response = await fetch(
      `https://api.netgsm.com.tr/sms/send/get/?usercode=${username}&password=${password}&gsmno=${params.to}&message=${encodeURIComponent(params.message)}&msgheader=${header}`,
      { method: "GET" }
    );

    const text = await response.text();
    const code = text.split(" ")[0];

    if (code === "00" || code === "01" || code === "02") {
      return { success: true, messageId: text };
    } else {
      return { success: false, error: `NetGSM hata kodu: ${code}` };
    }
  } catch (error) {
    console.error("NetGSM SMS hatası:", error);
    return { success: false, error: "SMS gönderim hatası" };
  }
}

export async function sendSMS(params: SendSMSParams): Promise<SMSResult> {
  const provider = process.env.SMS_PROVIDER || "twilio";

  // Geliştirme ortamında SMS'i konsola yazdır
  if (process.env.NODE_ENV === "development") {
    console.log(`[SMS DEV] To: ${params.to}, Message: ${params.message}`);
    return { success: true, messageId: "dev-" + Date.now() };
  }

  switch (provider) {
    case "netgsm":
      return sendViaNetGSM(params);
    case "twilio":
    default:
      return sendViaTwilio(params);
  }
}

export function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
