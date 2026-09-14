"use client";

import { useState } from "react";
import Image from "next/image";
import { MachineGalleryImage } from "@/lib/types";
import { Maximize2, Sparkles } from "lucide-react";

interface MachineGalleryProps {
  images: string[];
  galleryImages?: MachineGalleryImage[];
  machineName: string;
  brand?: string;
}

export function MachineGallery({
  images,
  galleryImages,
  machineName,
  brand,
}: MachineGalleryProps) {
  // Normalize items
  const items: { id: string; url: string; alt: string; isPrimary: boolean }[] =
    galleryImages && galleryImages.length > 0
      ? galleryImages.map((g, idx) => ({
          id: g.id || `img-${idx}`,
          url: g.url,
          alt: g.alt_en || `${machineName} photo ${idx + 1}`,
          isPrimary: !!g.isPrimary || idx === 0,
        }))
      : (images || []).map((url, idx) => ({
          id: `img-${idx}`,
          url,
          alt: `${machineName} photography ${idx + 1}`,
          isPrimary: idx === 0,
        }));

  const fallbackItems =
    items.length > 0
      ? items
      : [
          {
            id: "fallback-0",
            url: "/images/machines/machine-placeholder.svg",
            alt: machineName,
            isPrimary: true,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = fallbackItems[activeIndex] || fallbackItems[0];
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  return (
    <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 sm:p-5 shadow-sm flex flex-col gap-3">
      {/* Main High-Resolution Showcase */}
      <div className="relative w-full aspect-[4/3] rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] overflow-hidden group">
        <Image
          src={activeImage.url}
          alt={activeImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />

        {/* Brand Tag */}
        {brand && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs border border-[#E5E5E5] px-2.5 py-1 rounded-md text-xs font-bold text-[#2D2D2D] shadow-xs">
            {brand}
          </div>
        )}

        {/* Primary / Cover Tag */}
        {activeImage.isPrimary && (
          <div className="absolute top-3 right-3 bg-[#800020] text-white px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase shadow-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Primary View</span>
          </div>
        )}

        {/* Fullscreen Expansion Button - visible on touch devices, hover-revealed on desktop */}
        <button
          onClick={() => setFullscreenOpen(true)}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-sm border border-slate-200 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:opacity-100"
          aria-label="Expand image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails Navigation Strip */}
      {fallbackItems.length > 1 && (
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar touch-pan-x">
          {fallbackItems.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-14 h-12 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer min-w-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${
                  isSelected
                    ? "border-[#800020] ring-2 ring-[#800020]/20 shadow-xs scale-102"
                    : "border-[#E5E5E5] hover:border-[#800020]/40 opacity-70 hover:opacity-100"
                }`}
                aria-label={`View photo ${idx + 1}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setFullscreenOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[80vh]">
              <Image
                src={activeImage.url}
                alt={activeImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs text-slate-300 mt-2 text-center">
              {activeImage.alt} (Click anywhere to close)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
