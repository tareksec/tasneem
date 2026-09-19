import React from "react";
import Image from "next/image";

export function AuthSunsetBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between p-4 sm:p-6 lg:px-12 lg:py-8 font-sans selection:bg-[#E11D48] selection:text-white bg-slate-950">
      {/* Background Image of Textile Circular Machinery Mill */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/auth-bg.jpg"
          alt="Tasneem Knitting Industry Circular Machinery Mill Floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right lg:object-center scale-[1.02]"
        />
        {/* Cinematic Vignette & Atmospheric Contrast Overlays */}
        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/60" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
