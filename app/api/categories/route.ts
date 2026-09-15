import { NextResponse } from "next/server";
import { getDbCategories, getDbMainCategories } from "@/lib/db/categories";

export async function GET() {
  try {
    const [categories, mainCategories] = await Promise.all([
      getDbCategories(),
      getDbMainCategories(),
    ]);
    return NextResponse.json({ success: true, categories, mainCategories });
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load categories." },
      { status: 500 }
    );
  }
}
