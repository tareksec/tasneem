import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const customer = await prisma.customer.findUnique({ where: { email: String(email || "").trim().toLowerCase() } });

    if (!customer) {
      return NextResponse.json({ success: false, error: "No account found with this email." }, { status: 404 });
    }

    const validPassword = customer.passwordHash
      ? await bcrypt.compare(String(password || ""), customer.passwordHash)
      : true;
    if (!validPassword) {
      return NextResponse.json({ success: false, error: "Incorrect password." }, { status: 401 });
    }

    if (customer.status === "rejected") {
      return NextResponse.json(
        {
          success: false,
          code: "ACCOUNT_REJECTED",
          error: "ACCOUNT_REJECTED: This registration was not approved. Please contact support.",
        },
        { status: 403 }
      );
    }

    // State 1: Neither email verified nor admin approved
    if (!customer.email_verified && customer.status === "pending") {
      return NextResponse.json(
        {
          success: false,
          code: "NEITHER_DONE",
          email: customer.email,
          error: "EMAIL_NOT_VERIFIED: Please verify your email address. We sent a verification link to your inbox. (Admin approval is also pending).",
        },
        { status: 403 }
      );
    }

    // State 2: Not verified yet (even if admin approved)
    if (!customer.email_verified) {
      return NextResponse.json(
        {
          success: false,
          code: "EMAIL_NOT_VERIFIED",
          email: customer.email,
          error: "EMAIL_NOT_VERIFIED: Please verify your email address to access your account.",
        },
        { status: 403 }
      );
    }

    // State 3: Email is verified, but awaiting admin approval
    if (customer.status === "pending" || !customer.isApproved) {
      return NextResponse.json(
        {
          success: false,
          code: "PENDING_APPROVAL",
          email: customer.email,
          error: "PENDING_APPROVAL: Your email is verified and your account is awaiting admin approval.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phoneOrWhatsApp: customer.phone || "",
        status: customer.status,
        isApproved: customer.isApproved,
        email_verified: customer.email_verified,
        createdAt: customer.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return NextResponse.json({ success: false, error: "Login service is unavailable." }, { status: 500 });
  }
}
