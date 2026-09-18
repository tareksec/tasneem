import { NextResponse } from "next/server";
import { getDbReviews, createDbReview } from "@/lib/db/reviews";

export async function GET() {
  try {
    const reviews = await getDbReviews({ status: "approved" });
    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load reviews." },
      { status: 500 }
    );
  }
}

function isGarbageOrDebugReview(name: string, message: string): boolean {
  const combined = `${name || ""} ${message || ""}`.toLowerCase();
  const garbagePatterns = [
    "pendingdiffsession",
    "floatingwidget",
    "dsfbhsdbdb",
    "console.",
    "typeerror",
    "400 (bad request)",
    "net::err",
    "net::",
    "[object object]",
    "webpack",
    "evalmachine",
    "stack trace",
  ];
  if (garbagePatterns.some((p) => combined.includes(p))) {
    return true;
  }
  if (/^[bcdfghjklmnpqrstvwxyz]{8,}$/i.test(message.trim())) {
    return true;
  }
  return false;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, rating, message } = body;

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim() || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Review message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    if (isGarbageOrDebugReview(name, message)) {
      return NextResponse.json(
        { success: false, error: "Review contains invalid debug/console output or spam text." },
        { status: 400 }
      );
    }

    const numRating = Number(rating);
    if (!numRating || isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid rating between 1 and 5 stars." },
        { status: 400 }
      );
    }

    const newReview = await createDbReview({
      name: name.trim(),
      company: company && typeof company === "string" ? company.trim() : null,
      rating: Math.round(numRating),
      message: message.trim(),
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      review: newReview,
      message: "Your review has been submitted for moderation. Thank you!",
    });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while submitting your review." },
      { status: 500 }
    );
  }
}
