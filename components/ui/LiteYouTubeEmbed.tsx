"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface LiteYouTubeEmbedProps {
  videoId: string;
  title: string;
  poster?: string;
  className?: string;
}

export function LiteYouTubeEmbed({
  videoId,
  title,
  poster,
  className = "",
}: LiteYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = poster || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (isPlaying) {
    return (
      <div className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={`Play video: ${title}`}
      className={`group relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer select-none shadow-inner border border-neutral-800 ${className}`}
    >
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 700px"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        unoptimized={thumbnailUrl.startsWith("http")}
      />
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

      {/* YouTube Play Button Facade */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-12 sm:w-18 sm:h-13 bg-[#FF0000] group-hover:bg-[#CC0000] text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:scale-110">
          <Play className="w-6 h-6 fill-current text-white ml-0.5" />
        </div>
      </div>

      <span className="sr-only">Click to play video</span>
    </div>
  );
}
