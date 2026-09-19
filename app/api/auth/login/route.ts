import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const customer = await prisma.customer.findUnique({ where: { email: String(email || "").trim().toLowerCase() } });

    if (!customer) return NextResponse.json({ success: false, error: "No account found with this email." }, { status: 404 });
    if (customer.status === "pending") return NextResponse.json({ success: false, error: "PENDING_APPROVAL: Your account is waiting for admin approval." }, { status: 403 });
    if (customer.status === "rejected") return NextResponse.json({ success: false, error: "ACCOUNT_REJECTED: This registration was not approved." }, { status: 403 });

    const validPassword = customer.passwordHash ? await bcrypt.compare(String(password || ""), customer.passwordHash) : true;
    if (!validPassword) return NextResponse.json({ success: false, error: "Incorrect password." }, { status: 401 });

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
