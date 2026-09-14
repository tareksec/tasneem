"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SpotlightSourcing } from "@/components/home/SpotlightSourcing";
import { WhyTasneem } from "@/components/home/WhyTasneem";

export function SourcingWhyTasneemStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1 subtle scale and dimming as Section 2 slides over (from user example)
  const sourcingScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldReduceMotion ? 1 : 0.92]
  );
  const sourcingOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, shouldReduceMotion ? 1 : 0.75]
  );

  return (
    <div ref={containerRef} className="relative w-full bg-[#F8F9FA]">
      {/* Section 1: Transparent Sourcing (Natural on mobile, Sticky top-0 on md+) */}
      <motion.section
        style={{ scale: sourcingScale, opacity: sourcingOpacity }}
        className="relative md:sticky md:top-0 h-auto md:h-screen w-full z-10 overflow-visible md:overflow-hidden origin-top"
      >
        <SpotlightSourcing />
      </motion.section>

      {/* Section 2: Why Tasneem (Natural on mobile, Sticky top-0 on md+ with elevated shadow sliding up) */}
      <section className="relative md:sticky md:top-0 min-h-0 md:min-h-screen w-full z-20 rounded-t-[28px] sm:rounded-t-[48px] lg:rounded-t-[56px] border-t-2 border-white/80 shadow-[0_-25px_60px_rgba(0,0,0,0.12)] overflow-visible md:overflow-hidden bg-white">
        <WhyTasneem />
      </section>
    </div>
  );
}
