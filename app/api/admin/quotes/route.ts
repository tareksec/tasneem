import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = quotes.map((q) => ({
      ...q,
      submittedAt: q.submittedAt.toISOString(),
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, quotes: formatted });
  } catch (error) {
    console.error("GET /api/admin/quotes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Quote ID required." }, { status: 400 });
    }

    const updated = await prisma.quote.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(adminNotes !== undefined ? { adminNotes } : {}),
      },
    });

    return NextResponse.json({ success: true, quote: updated });
  } catch (error) {
    console.error("PATCH /api/admin/quotes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update quote." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Quote ID required." }, { status: 400 });
    }

    await prisma.quote.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/quotes error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete quote." },
      { status: 500 }
    );
  }
}
