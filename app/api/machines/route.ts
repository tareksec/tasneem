import { NextResponse } from "next/server";
import { getDbMachines } from "@/lib/db/machines";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const includeDrafts = searchParams.get("includeDrafts") === "true";
    const search = searchParams.get("search") || undefined;

    const machines = await getDbMachines({
      category,
      includeDrafts,
      search,
    });

    return NextResponse.json({
      success: true,
      count: machines.length,
      machines,
    });
  } catch (error) {
    console.error("GET /api/machines error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve machinery catalog." },
      { status: 500 }
    );
  }
}
