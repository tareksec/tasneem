import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { InfinityBandScroll } from "@/components/ui/InfinityBandScroll";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedMachines } from "@/components/home/FeaturedMachines";
import { SourcingWhyTasneemStack } from "@/components/home/SourcingWhyTasneemStack";
import { SpotlightInstallation } from "@/components/home/SpotlightInstallation";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProjectsGalleryPlaceholder } from "@/components/home/ProjectsGalleryPlaceholder";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { QuoteCtaBanner } from "@/components/home/QuoteCtaBanner";

export default function HomePage() {
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
      <FeaturedMachines />

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

      {/* 11. Quote CTA Banner */}
      <QuoteCtaBanner />
    </>
  );
}
