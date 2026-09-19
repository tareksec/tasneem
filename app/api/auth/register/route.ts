import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendVerificationEmail, sendAdminNewRegistrationNotice } from "@/lib/mail/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phoneOrWhatsApp || "").trim();
    const password = String(body.password || "");

    if (!name || !company || !email || !phone || !password) {
      return NextResponse.json({ success: false, error: "All registration fields are required." }, { status: 400 });
    }

    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: existing.status === "pending" ? "This registration is already pending approval." : "An account with this email already exists." },
        { status: 409 }
      );
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const customer = await prisma.customer.create({
      data: {
        name,
        company,
        email,
        phone,
        passwordHash: await bcrypt.hash(password, 12),
        status: "pending",
        isApproved: false,
        email_verified: false,
        verification_token: verificationToken,
        verification_token_expires: verificationExpires,
      },
    });

    // Await both user verification email and admin notification email concurrently
    console.log(`[Register Route] Triggering email dispatches for user ${customer.email} and admin...`);
    const [userMailRes, adminMailRes] = await Promise.allSettled([
      sendVerificationEmail({
        email: customer.email,
        name: customer.name,
        token: verificationToken,
      }),
      sendAdminNewRegistrationNotice({
        user: {
          name: customer.name,
          company: customer.company,
          email: customer.email,
          phoneOrWhatsApp: customer.phone || "",
        },
      }),
    ]);

    if (userMailRes.status === "rejected") {
      console.error("[Register Route] Verification email promise rejected:", userMailRes.reason);
    } else {
      console.log("[Register Route] Verification email result:", userMailRes.value);
    }

    if (adminMailRes.status === "rejected") {
      console.error("[Register Route] Admin alert email promise rejected:", adminMailRes.reason);
    } else {
      console.log("[Register Route] Admin alert email result:", adminMailRes.value);
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
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json({ success: false, error: "Registration could not be completed." }, { status: 500 });
  }
}
