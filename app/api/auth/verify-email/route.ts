import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token")?.trim();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Verification token is required." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { verification_token: token },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "This email verification link is invalid or has already been used." },
        { status: 400 }
      );
    }

    if (customer.verification_token_expires && customer.verification_token_expires < new Date()) {
      return NextResponse.json(
        { success: false, error: "This email verification link has expired. Please request a new verification link." },
        { status: 400 }
      );
    }

    // Mark verified and clear the token
    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        email_verified: true,
        verification_token: null,
        verification_token_expires: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your email address has been successfully verified! You can now sign in.",
      email: customer.email,
    });
  } catch (error) {
    console.error("GET /api/auth/verify-email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify email address. Please try again." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = String(body.token || "").trim();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Verification token is required." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { verification_token: token },
    });

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "This email verification link is invalid or has already been used." },
        { status: 400 }
      );
    }

    if (customer.verification_token_expires && customer.verification_token_expires < new Date()) {
      return NextResponse.json(
        { success: false, error: "This email verification link has expired. Please request a new verification link." },
        { status: 400 }
      );
    }

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        email_verified: true,
        verification_token: null,
        verification_token_expires: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Your email address has been successfully verified! You can now sign in.",
      email: customer.email,
    });
  } catch (error) {
    console.error("POST /api/auth/verify-email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify email address. Please try again." },
      { status: 500 }
    );
  }
}
