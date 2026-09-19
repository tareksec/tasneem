import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    // Don't leak whether an email exists or not
    if (!customer) {
      return NextResponse.json({
        success: true,
        message: "If that email address is registered, a new verification link has been sent.",
      });
    }

    if (customer.email_verified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        message: "This email address is already verified. You can proceed to sign in.",
      });
    }

    // Generate new token & 24h expiration
    const newToken = crypto.randomBytes(32).toString("hex");
    const newExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        verification_token: newToken,
        verification_token_expires: newExpires,
      },
    });

    console.log(`[Resend Route] Sending verification email to ${customer.email}...`);
    const mailResult = await sendVerificationEmail({
      email: customer.email,
      name: customer.name,
      token: newToken,
    }).catch((mailErr) => {
      console.error("[Resend Route] Error resending verification email:", mailErr);
      return { success: false, error: mailErr?.message };
    });
    console.log(`[Resend Route] Mail dispatch result:`, mailResult);

    return NextResponse.json({
      success: true,
      message: "A new verification link has been sent to your email. Please check your inbox or spam folder.",
    });
  } catch (error) {
    console.error("POST /api/auth/resend-verification error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to send verification email right now. Please try again later." },
      { status: 500 }
    );
  }
}
