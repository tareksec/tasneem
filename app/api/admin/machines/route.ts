import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

function revalidateProductCache(machine?: {
  id: string;
  category?: string | null;
  mainCategory?: string | null;
  subCategory?: string | null;
} | null) {
  revalidatePath("/machines");
  revalidatePath("/en/machines");
  revalidatePath("/bn/machines");
  revalidatePath("/products");
  revalidatePath("/en/products");
  revalidatePath("/bn/products");
  revalidatePath("/machines/[category]", "page");
  revalidatePath("/machines/[category]/[id]", "page");
  revalidatePath("/");

  if (machine) {
    const categories = Array.from(
      new Set([machine.category, machine.mainCategory, machine.subCategory].filter(Boolean))
    ) as string[];

    for (const cat of categories) {
      revalidatePath(`/machines/${cat}`);
      revalidatePath(`/en/machines/${cat}`);
      revalidatePath(`/bn/machines/${cat}`);
      revalidatePath(`/machines/${cat}/${machine.id}`);
      revalidatePath(`/en/machines/${cat}/${machine.id}`);
      revalidatePath(`/bn/machines/${cat}/${machine.id}`);
    }

    revalidatePath(`/products/${machine.id}`);
    revalidatePath(`/en/products/${machine.id}`);
    revalidatePath(`/bn/products/${machine.id}`);
  }
}

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

    revalidateProductCache(savedMachine);

    return NextResponse.json({ success: true, machine: savedMachine });
  } catch (error) {
    console.error("POST /api/admin/machines error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save machine to the database." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  return POST(request);
}

export async function DELETE(request: Request) {
  try {
    let id: string | null = null;
    try {
      const body = await request.json();
      id = body?.id;
    } catch {
      // Body may be empty if passed via query params
    }
    if (!id) {
      const { searchParams } = new URL(request.url);
      id = searchParams.get("id");
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "Machine ID is required." }, { status: 400 });
    }

    const existingMachine = await prisma.machine.findUnique({
      where: { id },
    });

    if (existingMachine) {
      await prisma.machine.delete({ where: { id } });
      revalidateProductCache(existingMachine);
    } else {
      revalidateProductCache();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/machines error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete machine." }, { status: 500 });
  }
}
