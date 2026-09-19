import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Reset token is required." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { reset_token: token },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "This password reset link is invalid or has already been used." },
        { status: 400 }
      );
    }

    if (customer.reset_token_expires && customer.reset_token_expires < new Date()) {
      return NextResponse.json(
        { success: false, error: "This password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      valid: true,
      email: customer.email,
    });
  } catch (error) {
    console.error("GET /api/auth/reset-password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to validate reset token." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = String(body.token || "").trim();
    const password = String(body.password || "");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Reset token is required." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { reset_token: token },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "This password reset link is invalid or has already been used." },
        { status: 400 }
      );
    }

    if (customer.reset_token_expires && customer.reset_token_expires < new Date()) {
      return NextResponse.json(
        { success: false, error: "This password reset link has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Update password and invalidate the token (single-use)
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        passwordHash,
        reset_token: null,
        reset_token_expires: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("POST /api/auth/reset-password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset password. Please try again later." },
      { status: 500 }
    );
  }
}
