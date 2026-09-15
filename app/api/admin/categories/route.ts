import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { CATEGORIES } from "@/lib/machines-data";

const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function revalidateCategoryPaths(slug?: string) {
  try {
    revalidatePath("/");
    revalidatePath("/machines");
    if (slug) {
      revalidatePath(`/machines/${slug}`);
    }
  } catch (err) {
    console.warn("revalidateCategoryPaths error:", err);
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    const dynamicCategories = categories.filter((category) => !CATEGORIES.some((legacy) => legacy.slug === category.slug));
    return NextResponse.json({ success: true, categories: [...CATEGORIES, ...dynamicCategories] });
  } catch (error) {
    console.error("GET /api/admin/categories error:", error);
    return NextResponse.json({ success: false, error: "Failed to load categories." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const slug = slugify(String(body.slug || name));
    if (!name || !slug) return NextResponse.json({ success: false, error: "Category name is required." }, { status: 400 });
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        name_bn: body.name_bn?.trim() || null,
        description: body.description?.trim() || null,
        description_bn: body.description_bn?.trim() || null,
        icon: body.icon?.trim() || null,
      },
    });
    revalidateCategoryPaths(category.slug);
    return NextResponse.json({ success: true, category });
  } catch (error) {
    const message = error && typeof error === "object" && "code" in error && error.code === "P2002"
      ? "That category slug already exists."
      : "Failed to create category.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ success: false, error: "Category ID is required." }, { status: 400 });
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        slug: body.slug ? slugify(body.slug) : undefined,
        name_bn: body.name_bn?.trim() || null,
        description: body.description?.trim() || null,
        description_bn: body.description_bn?.trim() || null,
        icon: body.icon?.trim() || null,
      },
    });
    revalidateCategoryPaths(category.slug);
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("PATCH /api/admin/categories error:", error);
    return NextResponse.json({ success: false, error: "Failed to update category." }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return NextResponse.json({ success: false, error: "Category not found." }, { status: 404 });
    const machineCount = await prisma.machine.count({ where: { category: category.slug } });
    if (machineCount > 0) return NextResponse.json({ success: false, error: "Move or delete machines in this category first." }, { status: 409 });
    await prisma.category.delete({ where: { id } });
    revalidateCategoryPaths(category.slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/categories error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete category." }, { status: 400 });
  }
}
