import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function formatCustomer(customer: {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string | null;
  status: string;
  isApproved: boolean;
  email_verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: customer.id,
    name: customer.name,
    company: customer.company,
    email: customer.email,
    phoneOrWhatsApp: customer.phone || "",
    status: customer.status,
    isApproved: customer.isApproved,
    email_verified: customer.email_verified,
    createdAt: customer.createdAt.toISOString(),
    updatedAt: customer.updatedAt.toISOString(),
  };
}

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ success: true, customers: customers.map(formatCustomer) });
  } catch (error) {
    console.error("GET /api/admin/customers error:", error);
    return NextResponse.json({ success: false, error: "Failed to load customer registrations." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, error: "Customer ID and valid status are required." }, { status: 400 });
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: { status, isApproved: status === "approved" },
    });
    return NextResponse.json({ success: true, customer: formatCustomer(customer) });
  } catch (error) {
    console.error("PATCH /api/admin/customers error:", error);
    return NextResponse.json({ success: false, error: "Failed to update customer approval." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "Customer ID is required." }, { status: 400 });
    await prisma.customer.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/customers error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete customer." }, { status: 500 });
  }
}
