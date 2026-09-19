import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mail/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    // Generic response message to prevent email enumeration
    const genericResponse = {
      success: true,
      message: "If that email is registered in our system, a password reset link has been sent.",
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      // Return identical success response to avoid leaking email existence
      return NextResponse.json(genericResponse);
    }

    // Secure single-use token with 1-hour expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        reset_token: resetToken,
        reset_token_expires: resetExpires,
      },
    });

    sendPasswordResetEmail({
      email: customer.email,
      name: customer.name,
      token: resetToken,
    }).catch((mailErr) => {
      console.error("Failed to send password reset email:", mailErr);
    });

    return NextResponse.json(genericResponse);
  } catch (error) {
    console.error("POST /api/auth/forgot-password error:", error);
    return NextResponse.json(
      { success: false, error: "Service temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }
}
