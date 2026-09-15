import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { InfinityBandScroll } from "@/components/ui/InfinityBandScroll";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedMachines } from "@/components/home/FeaturedMachines";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { SourcingWhyTasneemStack } from "@/components/home/SourcingWhyTasneemStack";
import { SpotlightInstallation } from "@/components/home/SpotlightInstallation";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProjectsGalleryPlaceholder } from "@/components/home/ProjectsGalleryPlaceholder";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { QuoteCtaBanner } from "@/components/home/QuoteCtaBanner";
import { ReviewsMarqueeSection } from "@/components/home/ReviewsMarqueeSection";
import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";
import { getDbFeaturedMachines } from "@/lib/db/machines";
import { getDbReviews } from "@/lib/db/reviews";

export const metadata: Metadata = {
  title: "Tasneem Knitting Industry | Industrial Circular Knitting Machine Importer Bangladesh",
  description:
    "Direct overseas importer of industrial circular knitting machines in Bangladesh. Double Jersey, Single Jersey, Interlock, Jacquard & Terry machines with 3rd-party pre-shipment inspection, CFR Chattogram sea delivery, and factory installation. বাংলাদেশে উচ্চমানের সার্কুলার নিটিং মেশিন সরাসরি আমদানি।",
  alternates: {
    canonical: COMPANY_INFO.domain,
    languages: {
      en: `${COMPANY_INFO.domain}/en`,
      bn: `${COMPANY_INFO.domain}/bn`,
      "x-default": COMPANY_INFO.domain,
    },
  },
};

export default async function HomePage() {
  const featuredMachines = await getDbFeaturedMachines(4);
  const approvedReviews = await getDbReviews({ status: "approved" });

  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 2.1 Infinite Band Scroll */}
      <InfinityBandScroll />

      {/* 3. Machine Categories */}
      <CategoriesSection />

      {/* 4. Featured Machines */}
      <FeaturedMachines initialMachines={featuredMachines} />

      {/* 4.1 Home About & Factory Video Section */}
      <HomeAboutSection />

      {/* 5 & 6. Sticky Card Overlap: Sourcing & Why Tasneem */}
      <SourcingWhyTasneemStack />

      {/* 7. Spotlight: Installation & After-Sales */}
      <SpotlightInstallation />

      {/* 8. Industries/Applications Served */}
      <IndustriesSection />

      {/* 9. Projects/Installations Gallery */}
      <ProjectsGalleryPlaceholder />

      {/* 10. FAQ Accordion */}
      <HomeFaqSection />

      {/* 10.1 Customer Reviews & Testimonials Slider */}
      <ReviewsMarqueeSection initialReviews={approvedReviews} />

      {/* 11. Quote CTA Banner */}
      <QuoteCtaBanner />
    </>
  );
}
