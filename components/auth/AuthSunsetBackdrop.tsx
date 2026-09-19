import React from "react";
import Image from "next/image";

export function AuthSunsetBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans selection:bg-[#E8592E] selection:text-white">
      {/* Background Image of Textile Circular Machinery Mill */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/auth-bg.jpg"
          alt="Tasneem Knitting Industry Circular Machinery Mill Floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Cinematic Vignette & Atmospheric Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        
        {/* Subtle Warm Accent Glow Matching the Circular Machinery LED Accents */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[450px] h-[450px] rounded-full bg-[#DF3826]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#E8592E]/10 blur-[100px] pointer-events-none" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
