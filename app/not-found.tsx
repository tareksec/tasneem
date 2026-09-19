"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Cpu, Search, PhoneCall } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-white font-sans selection:bg-[#E11D48] selection:text-white flex flex-col justify-between p-4 sm:p-6 lg:px-14 lg:py-10">
      
      {/* Background Industrial Circular Machinery Image */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/auth-bg.jpg"
          alt="Tasneem Knitting Industry Circular Machinery Mill Floor"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right lg:object-center scale-[1.02]"
        />
        {/* Soft Vignette & Left Gradient for Maximum Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 lg:via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      </div>

      {/* Main Foreground Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between">
        
        {/* Top-Left Brand Header */}
        <div className="w-full flex items-start justify-between">
          <Link href="/" className="group flex items-center gap-3 sm:gap-3.5 focus:outline-none">
            {/* Red Stylized Wing/Bird Logo Mark */}
            <div className="w-11 h-9 sm:w-13 sm:h-11 shrink-0 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 100 65" fill="none" className="w-full h-full drop-shadow-md">
                <path d="M50 42 L8 10 L18 28 L2 36 L32 50 L50 44 Z" fill="#E11D48" />
                <path d="M50 42 L92 10 L82 28 L98 36 L68 50 L50 44 Z" fill="#E11D48" />
                <polygon points="44,43 56,43 53,62 47,62" fill="#E11D48" />
              </svg>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white leading-none">
                TASNEEM
              </h2>
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#E11D48] block mt-1">
                KNITTING INDUSTRY
              </span>
            </div>
          </Link>
        </div>

        {/* Center-Left 404 Hero Content */}
        <div className="my-auto py-10 sm:py-16 max-w-xl text-left">
          
          {/* Custom 404 with Glowing Red Torus Zero */}
          <div className="flex items-center text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight select-none">
            <span className="text-white drop-shadow-md">4</span>
            
            {/* Glowing Red Torus Zero */}
            <div className="relative inline-flex items-center justify-center mx-1 sm:mx-2 w-[0.72em] h-[0.72em] align-middle">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_35px_rgba(225,29,72,0.9)]">
                <defs>
                  <radialGradient id="redRingGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                    <stop offset="0%" stopColor="#FF3366" />
                    <stop offset="60%" stopColor="#DF1E38" />
                    <stop offset="100%" stopColor="#7F0E1E" />
                  </radialGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  stroke="url(#redRingGrad)"
                  strokeWidth="20"
                  fill="none"
                />
              </svg>
            </div>

            <span className="text-white drop-shadow-md">4</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            Page Not Found
          </h1>

          {/* Subtitle / Explanatory Text */}
          <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-3 max-w-md">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Primary Red Button with Left Arrow */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-lg shadow-red-950/60 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back Home</span>
            </Link>

            {/* Quick Machinery Catalog Link */}
            <Link
              href="/machines"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all"
            >
              <Cpu className="w-3.5 h-3.5 text-rose-400" />
              <span>Browse Machines</span>
            </Link>
          </div>

          {/* Secondary Text Link */}
          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>

        {/* Bottom-Left Brand Tagline */}
        <div className="pt-6">
          <div className="flex items-center gap-2.5 text-xs text-slate-400 font-normal">
            <span className="w-6 h-[2px] bg-[#E11D48]" />
            <span>Quality Knitwear</span>
            <span className="text-slate-600">|</span>
            <span>Better Tomorrow</span>
          </div>
        </div>

      </div>
    </div>
  );
}
