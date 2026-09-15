import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, ...machine } = body;
    delete machine.createdAt;
    delete machine.updatedAt;

    if (!id || !machine.name || !machine.category) {
      return NextResponse.json(
        { success: false, error: "Machine ID, name, and category are required." },
        { status: 400 }
      );
    }

    const savedMachine = await prisma.machine.upsert({
      where: { id },
      update: machine,
      create: { id, ...machine },
    });

    return NextResponse.json({ success: true, machine: savedMachine });
  } catch (error) {
    console.error("POST /api/admin/machines error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save machine to the database." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "Machine ID is required." }, { status: 400 });
    await prisma.machine.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/machines error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete machine." }, { status: 500 });
  }
}
