import { NextResponse } from "next/server";
import {
  getDbReviews,
  updateDbReviewStatus,
  deleteDbReview,
} from "@/lib/db/reviews";
import { ReviewStatus } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as ReviewStatus | null;

    const reviews = await getDbReviews(
      status && ["pending", "approved", "rejected"].includes(status)
        ? { status }
        : {}
    );

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("GET /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch admin reviews." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Review ID is required." },
        { status: 400 }
      );
    }

    if (!status || !["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid review status. Must be 'approved', 'rejected', or 'pending'.",
        },
        { status: 400 }
      );
    }

    const updated = await updateDbReviewStatus(id, status as ReviewStatus);

    return NextResponse.json({
      success: true,
      review: updated,
      message: `Review marked as ${status}.`,
    });
  } catch (error) {
    console.error("PATCH /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update review status." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {
        // No body
      }
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Review ID is required." },
        { status: 400 }
      );
    }

    const deleted = await deleteDbReview(id);

    return NextResponse.json({
      success: deleted,
      message: deleted ? "Review deleted successfully." : "Review could not be deleted.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete review." },
      { status: 500 }
    );
  }
}
