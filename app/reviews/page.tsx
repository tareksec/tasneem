import type { Metadata } from "next";
import { getDbReviews } from "@/lib/db/reviews";
import { ReviewsView } from "@/components/reviews/ReviewsView";

export const metadata: Metadata = {
  title: "Client Reviews & Testimonials | Tasneem Knitting Industry",
  description:
    "Authentic client feedback and field reports from textile mill owners and knitting factory engineers regarding circular knitting machinery imports, CFR Chattogram logistics, and turnkey commissioning by Tasneem Knit Industry.",
  openGraph: {
    title: "Client Reviews & Factory Testimonials | Tasneem Knitting Industry",
    description:
      "Read genuine feedback from Bangladesh knitting factories on imported machinery quality, CFR Chattogram customs clearance, and after-sales maintenance.",
  },
};

export default async function ReviewsPage() {
  const approvedReviews = await getDbReviews({ status: "approved" });

  return <ReviewsView initialReviews={approvedReviews} />;
}
