import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Creates and returns the Nodemailer transporter configured with Hostinger SMTP.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.hostinger.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const isSecure = port === 465;

  if (!user || !pass) {
    console.warn(
      "[Mailer] Warning: SMTP_USER or SMTP_PASS is missing. Emails will not be sent to real inboxes until credentials are configured."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: isSecure, // true for port 465, false for 587
    auth: {
      user,
      pass,
    },
    // Useful timeout settings for cloud hosting
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

/**
 * Base app URL resolver (supports APP_URL, NEXTAUTH_URL, or defaults to production)
 */
export function getAppBaseUrl(): string {
  const url = process.env.APP_URL || process.env.NEXTAUTH_URL || "https://tasneemknitindustry.com";
  return url.replace(/\/+$/, "");
}

/**
 * Low-level email sending function
 */
export async function sendMail({ to, subject, html, text }: SendMailOptions) {
  const from = process.env.SMTP_FROM || `"Tasneem Knitting Industry" <${process.env.SMTP_USER || "no-reply@tasneemknitindustry.com"}>`;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // In development without credentials, log details for testing
  if (!user || !pass) {
    console.log("------------------------------------------------------------");
    console.log(`[Mailer Mock/Dev] Would send email to: ${to}`);
    console.log(`[Mailer Mock/Dev] Subject: ${subject}`);
    console.log(`[Mailer Mock/Dev] Body preview:\n${text || html.slice(0, 300)}...`);
    console.log("------------------------------------------------------------");
    return { success: true, mocked: true };
  }

  try {
    const transporter = getMailTransporter();
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Mailer] Error sending email to ${to}:`, error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}

/**
 * Send email verification link to newly registered user
 */
export async function sendVerificationEmail({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) {
  const baseUrl = getAppBaseUrl();
  const verifyUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token)}`;

  const subject = "Verify your email address — Tasneem Knitting Industry";
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);" cellspacing="0" cellpadding="0">
          
          <!-- Burgundy Brand Header -->
          <tr>
            <td style="background-color: #800020; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                TASNEEM KNITTING INDUSTRY
              </h1>
              <p style="margin: 4px 0 0 0; color: #f9e6ea; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Industrial Machinery & Circular Knitting Solutions
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 19px; color: #1f2937; font-weight: 700;">
                Confirm Your Email Address
              </h2>
              
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #4b5563;">
                Dear <strong>${name || "Valued Buyer"}</strong>,
              </p>

              <p style="margin: 0 0 20px 0; font-size: 14px; color: #4b5563;">
                Thank you for creating an account with <strong>Tasneem Knitting Industry</strong>. To activate your buyer portal access and verify your email address, please click the confirmation button below:
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px auto;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #800020;">
                    <a href="${verifyUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">
                      Verify Email Address →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry Note -->
              <p style="margin: 20px 0 16px 0; font-size: 12px; color: #6b7280; text-align: center;">
                ⏳ This verification link will expire in <strong>24 hours</strong>.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

              <!-- Fallback URL -->
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                If the button above does not work, copy and paste this link into your web browser:
              </p>
              <p style="margin: 0 0 20px 0; font-size: 11px; word-break: break-all;">
                <a href="${verifyUrl}" style="color: #800020; text-decoration: underline;">
                  ${verifyUrl}
                </a>
              </p>

              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                If you did not register for an account with Tasneem Knitting Industry, please disregard this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #6b7280;">
                <strong>Tasneem Knitting Industry</strong> • Dhaka, Bangladesh
              </p>
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                WhatsApp / Support: +880 1715-024479 • Website: <a href="${baseUrl}" style="color: #800020; text-decoration: none;">tasneemknitindustry.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return sendMail({
    to: email,
    subject,
    html,
    text: `Confirm Your Email Address - Tasneem Knitting Industry\n\nDear ${name},\n\nPlease verify your email address by clicking the following link:\n${verifyUrl}\n\nThis link expires in 24 hours.\n\nIf you did not register, please ignore this email.`,
  });
}

/**
 * Send password reset link to user
 */
export async function sendPasswordResetEmail({
  email,
  name,
  token,
}: {
  email: string;
  name?: string;
  token: string;
}) {
  const baseUrl = getAppBaseUrl();
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

  const subject = "Reset your password — Tasneem Knitting Industry";
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);" cellspacing="0" cellpadding="0">
          
          <!-- Burgundy Brand Header -->
          <tr>
            <td style="background-color: #800020; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                TASNEEM KNITTING INDUSTRY
              </h1>
              <p style="margin: 4px 0 0 0; color: #f9e6ea; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Password Reset Request
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px 28px 32px;">
              <h2 style="margin: 0 0 16px 0; font-size: 19px; color: #1f2937; font-weight: 700;">
                Reset Your Password
              </h2>
              
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #4b5563;">
                Hello${name ? ` <strong>${name}</strong>` : ""},
              </p>

              <p style="margin: 0 0 20px 0; font-size: 14px; color: #4b5563;">
                We received a request to reset the password for your buyer account with <strong>Tasneem Knitting Industry</strong>. Click the button below to choose a new password:
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 28px auto;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #800020;">
                    <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.5px; border-radius: 8px;">
                      Reset My Password →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry & Single-use Note -->
              <p style="margin: 20px 0 16px 0; font-size: 12px; color: #6b7280; text-align: center;">
                ⏳ This link is single-use and will expire in <strong>1 hour</strong>.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />

              <!-- Fallback URL -->
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
                If the button above does not work, copy and paste this link into your web browser:
              </p>
              <p style="margin: 0 0 20px 0; font-size: 11px; word-break: break-all;">
                <a href="${resetUrl}" style="color: #800020; text-decoration: underline;">
                  ${resetUrl}
                </a>
              </p>

              <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 12px 16px; margin: 20px 0 0 0;">
                <p style="margin: 0; font-size: 12px; color: #92400e;">
                  <strong>Did not request this?</strong> You can safely disregard this email. Your current password remains secure and will not change until you access the link above.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #6b7280;">
                <strong>Tasneem Knitting Industry</strong> • Industrial Machinery & Circular Knitting
              </p>
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                Direct inquiries: +880 1715-024479 • <a href="${baseUrl}" style="color: #800020; text-decoration: none;">tasneemknitindustry.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return sendMail({
    to: email,
    subject,
    html,
    text: `Reset Your Password - Tasneem Knitting Industry\n\nClick the link below to reset your password:\n${resetUrl}\n\nThis single-use link expires in 1 hour.\n\nIf you did not request a password reset, please disregard this message.`,
  });
}

/**
 * Send notification to administrator when a new buyer registers and needs approval
 */
export async function sendAdminNewRegistrationNotice({
  user,
}: {
  user: {
    name: string;
    company: string;
    email: string;
    phoneOrWhatsApp?: string;
  };
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@tasneemknitindustry.com";
  const baseUrl = getAppBaseUrl();
  const adminPortalUrl = `${baseUrl}/admin/users?status=pending`;

  const subject = `Action Required: New Buyer Registration Pending Approval — ${user.company}`;
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333333; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f7; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);" cellspacing="0" cellpadding="0">
          
          <!-- Burgundy Brand Header -->
          <tr>
            <td style="background-color: #800020; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 19px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                TASNEEM KNITTING INDUSTRY
              </h1>
              <p style="margin: 4px 0 0 0; color: #f9e6ea; font-size: 11px; letter-spacing: 1px; text-transform: uppercase;">
                Admin Portal Alert • New Buyer Account Request
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 32px 32px 24px 32px;">
              <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; font-weight: 600; color: #92400e;">
                  ⚠️ New registration pending your review and approval.
                </p>
              </div>

              <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #1f2937; font-weight: 700;">
                Buyer Registration Details
              </h2>
              
              <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280; width: 140px; font-weight: 600;">Factory / Mill:</td>
                  <td style="padding: 10px 0; color: #111827; font-weight: 700;">${user.company}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Contact Person:</td>
                  <td style="padding: 10px 0; color: #111827;">${user.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Business Email:</td>
                  <td style="padding: 10px 0; color: #111827; font-family: monospace;">${user.email}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Phone / WhatsApp:</td>
                  <td style="padding: 10px 0; color: #111827; font-family: monospace;">${user.phoneOrWhatsApp || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-weight: 600;">Submission Time:</td>
                  <td style="padding: 10px 0; color: #111827;">${formattedDate} (BST)</td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px auto;">
                <tr>
                  <td align="center" style="border-radius: 8px; background-color: #800020;">
                    <a href="${adminPortalUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; border-radius: 8px;">
                      Open Admin Pending Approvals →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
                Direct admin link: <a href="${adminPortalUrl}" style="color: #800020;">${adminPortalUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 18px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                This is an automated system notification for Tasneem Knitting Industry Administrative Staff.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return sendMail({
    to: adminEmail,
    subject,
    html,
    text: `New Buyer Account Pending Approval - Tasneem Knitting Industry\n\nFactory: ${user.company}\nContact: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phoneOrWhatsApp || "N/A"}\nDate: ${formattedDate}\n\nReview and approve here:\n${adminPortalUrl}`,
  });
}

