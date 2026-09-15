import prisma from "@/lib/prisma";
import { Review, ReviewStatus } from "@/lib/types";

function formatDbReview(raw: any): Review {
  return {
    id: raw.id,
    name: raw.name,
    company: raw.company || null,
    rating: typeof raw.rating === "number" ? raw.rating : 5,
    message: raw.message,
    status: (raw.status as ReviewStatus) || "pending",
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : new Date().toISOString(),
  };
}

export async function getDbReviews(options: {
  status?: ReviewStatus;
} = {}): Promise<Review[]> {
  const { status } = options;

  try {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    const records = await prisma.review.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (records && records.length > 0) {
      return records.map(formatDbReview);
    }
  } catch (error) {
    console.warn("Prisma getDbReviews fallback:", error);
  }

  return [];
}

export async function createDbReview(data: {
  name: string;
  company?: string | null;
  rating: number;
  message: string;
  status?: ReviewStatus;
}): Promise<Review | null> {
  try {
    const record = await prisma.review.create({
      data: {
        name: data.name.trim(),
        company: data.company ? data.company.trim() : null,
        rating: Math.max(1, Math.min(5, Math.round(data.rating))),
        message: data.message.trim(),
        status: data.status || "pending",
      },
    });

    return formatDbReview(record);
  } catch (error) {
    console.warn("Prisma createDbReview fallback:", error);
    return null;
  }
}

export async function updateDbReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<Review | null> {
  try {
    const record = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return formatDbReview(record);
  } catch (error) {
    console.warn(`Prisma updateDbReviewStatus(${id}) fallback:`, error);
    return null;
  }
}

export async function deleteDbReview(id: string): Promise<boolean> {
  try {
    await prisma.review.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.warn(`Prisma deleteDbReview(${id}) fallback:`, error);
    return false;
  }
}
