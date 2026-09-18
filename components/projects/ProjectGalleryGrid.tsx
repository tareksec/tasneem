"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Image as ImageIcon, MapPin, Play, Video } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import styles from "./ProjectGalleryGrid.module.css";

interface ProjectGalleryGridProps {
  items: GalleryItem[];
}

export function ProjectGalleryGrid({ items }: ProjectGalleryGridProps) {
  const { locale } = useTranslation();
  const groups = Array.from({ length: Math.ceil(items.length / 6) }, (_, index) =>
    items.slice(index * 6, index * 6 + 6)
  );

  return (
    <div className={styles.gallery}>
      {groups.map((group) => (
        <div className={styles.grid} data-complete={group.length === 6} key={group[0].id}>
          {group.map((item, index) => {
            const isVideo = item.type === "video";
            const title = locale === "bn" && item.title_bn ? item.title_bn : item.title_en;
            const source = item.thumbnail || (!isVideo ? item.file : "");
            const action = isVideo
              ? locale === "bn" ? "ভিডিও দেখুন" : "Watch video"
              : locale === "bn" ? "প্রজেক্ট দেখুন" : "View project";

            return (
              <Link
                href={`/projects/${encodeURIComponent(item.id)}`}
                key={item.id}
                className={[styles.card, isVideo ? styles.videoCard : ""].filter(Boolean).join(" ")}
                aria-label={`${action}: ${title}`}
              >
                <span className={styles.media}>
                  {source ? (
                    <Image
                      src={source}
                      alt=""
                      fill
                      sizes={group.length === 6 && (index === 0 || index === 5)
                        ? "(min-width: 1280px) 592px, (min-width: 640px) 50vw, 100vw"
                        : "(min-width: 1280px) 288px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                      unoptimized={source.startsWith("http")}
                      className={styles.image}
                    />
                  ) : (
                    <Video className={styles.placeholder} aria-hidden="true" />
                  )}
                  <span className={styles.content}>
                    <span className={styles.category}>
                      {isVideo ? <Video size={13} /> : <ImageIcon size={13} />}
                      <span>{isVideo ? (locale === "bn" ? "ভিডিও প্রজেক্ট" : "Video project") : item.relatedCategory?.replaceAll("-", " ") ||
                        (locale === "bn" ? "ফ্যাক্টরি ইনস্টলেশন" : "Factory installation")}</span>
                    </span>
                    {isVideo && (
                      <span className={styles.playButton} aria-hidden="true">
                        <Play size={24} fill="currentColor" />
                      </span>
                    )}
                    <span className={styles.footer}>
                      {item.location && (
                        <span className={styles.location}>
                          <MapPin size={13} aria-hidden="true" />
                          <span>{item.location}</span>
                        </span>
                      )}
                      <span className={styles.action}>
                        {isVideo && <Play size={12} fill="currentColor" aria-hidden="true" />}
                        {action}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </span>
                <span className={styles.title}>{title}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
