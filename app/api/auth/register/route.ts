import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

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

    const customer = await prisma.customer.create({
      data: {
        name,
        company,
        email,
        phone,
        passwordHash: await bcrypt.hash(password, 12),
        status: "pending",
        isApproved: false,
      },
    });

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
        createdAt: customer.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("POST /api/auth/register error:", error);
    return NextResponse.json({ success: false, error: "Registration could not be completed." }, { status: 500 });
  }
}
