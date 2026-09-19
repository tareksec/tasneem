import { NextResponse } from "next/server";
import { getMailTransporter, sendMail } from "@/lib/mail/mailer";

function sanitize(val?: string) {
  if (!val) return "";
  let clean = val.trim();
  if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
    clean = clean.slice(1, -1).trim();
  }
  return clean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sendTest = searchParams.get("sendTest");
  const testRecipient = searchParams.get("to") || sanitize(process.env.ADMIN_EMAIL) || sanitize(process.env.SMTP_USER) || "admin@tasneemknitindustry.com";

  const host = sanitize(process.env.SMTP_HOST) || "smtp.hostinger.com";
  const port = parseInt(sanitize(process.env.SMTP_PORT) || "465", 10);
  const user = sanitize(process.env.SMTP_USER);
  const pass = sanitize(process.env.SMTP_PASS);
  const from = sanitize(process.env.SMTP_FROM);
  const adminEmail = sanitize(process.env.ADMIN_EMAIL);
  const appUrl = sanitize(process.env.APP_URL);

  const envInspection = {
    SMTP_HOST: host,
    SMTP_PORT: port,
    SMTP_USER_DEFINED: Boolean(user),
    SMTP_USER_VALUE: user ? `${user.slice(0, 3)}***@${user.split("@")[1] || "unknown"}` : "NOT_SET",
    SMTP_PASS_DEFINED: Boolean(pass),
    SMTP_PASS_LENGTH: pass ? pass.length : 0,
    SMTP_FROM_DEFINED: Boolean(from),
    SMTP_FROM_VALUE: from || "DEFAULT",
    ADMIN_EMAIL_DEFINED: Boolean(adminEmail),
    ADMIN_EMAIL_VALUE: adminEmail || "NOT_SET",
    APP_URL_DEFINED: Boolean(appUrl),
    APP_URL_VALUE: appUrl || "DEFAULT",
    NODE_ENV: process.env.NODE_ENV,
  };

  console.log("[SMTP Diagnostics] Runtime environment inspection:", envInspection);

  if (!user || !pass) {
    return NextResponse.json({
      success: false,
      stage: "env_check",
      error: "SMTP_USER or SMTP_PASS is missing in Hostinger environment variables.",
      envInspection,
    }, { status: 500 });
  }

  // Stage 1: Verify transporter connection and authentication handshake
  let verifyResult: any = null;
  try {
    const transporter = getMailTransporter();
    console.log("[SMTP Diagnostics] Running transporter.verify()...");
    await transporter.verify();
    verifyResult = { success: true, message: "SMTP connection and credentials successfully verified with Hostinger!" };
    console.log("[SMTP Diagnostics] transporter.verify() PASSED!");
  } catch (verifyErr: any) {
    console.error("[SMTP Diagnostics] transporter.verify() FAILED:", {
      message: verifyErr.message,
      code: verifyErr.code,
      command: verifyErr.command,
      response: verifyErr.response,
      responseCode: verifyErr.responseCode,
    });
    return NextResponse.json({
      success: false,
      stage: "transporter_verify",
      error: verifyErr.message,
      code: verifyErr.code,
      response: verifyErr.response,
      envInspection,
    }, { status: 500 });
  }

  // Stage 2: Optional test send
  let sendResult: any = null;
  if (sendTest === "true") {
    try {
      console.log(`[SMTP Diagnostics] Sending live test email to: ${testRecipient}...`);
      sendResult = await sendMail({
        to: testRecipient,
        subject: "Hostinger SMTP Live Test — Tasneem Knitting Industry",
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #800020; border-radius: 8px;">
            <h2 style="color: #800020;">Hostinger SMTP Live Test Successful!</h2>
            <p>This confirms that your Node.js application running on Hostinger successfully connected to <strong>${host}:${port}</strong> and delivered this message.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
      });
      console.log("[SMTP Diagnostics] Live test send result:", sendResult);
    } catch (sendErr: any) {
      console.error("[SMTP Diagnostics] Live test send error:", sendErr);
      sendResult = { success: false, error: sendErr?.message };
    }
  }

  return NextResponse.json({
    success: true,
    stage: "all_checks_passed",
    envInspection,
    verifyResult,
    sendResult,
    hint: sendTest !== "true" ? "Add &sendTest=true to this URL to trigger an actual test email delivery to " + testRecipient : undefined,
  });
}
