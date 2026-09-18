"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Image as ImageIcon, MapPin, Video } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { parseYouTubeVideo } from "@/lib/admin/media-upload";
import { ProjectGalleryGrid } from "./ProjectGalleryGrid";
import { usePublishedProjects } from "./usePublishedProjects";

export function ProjectDetails({ id }: { id: string }) {
  const { locale } = useTranslation();
  const { items, loaded } = usePublishedProjects();
  const bn = locale === "bn";
  const item = items.find((project) => project.id === id);
  const backLabel = bn ? "সব প্রজেক্ট দেখুন" : "All projects";
  const linkStyle = "inline-flex items-center gap-2 rounded-md text-sm font-semibold text-[#800020] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]";

  if (!loaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-busy="true">
        <p role="status" className="mb-6 text-neutral-500">{bn ? "প্রজেক্ট লোড হচ্ছে…" : "Loading project…"}</p>
        <div className="aspect-video max-w-4xl rounded-2xl bg-neutral-100" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <meta name="robots" content="noindex" />
        <h1 className="text-3xl font-bold">{bn ? "প্রজেক্টটি পাওয়া যায়নি" : "Project unavailable"}</h1>
        <p className="mt-4 text-neutral-600">
          {bn ? "এই প্রজেক্টটি সরানো হয়েছে অথবা এখনো প্রকাশিত হয়নি।" : "This project has been removed or is not published."}
        </p>
        <Link href="/projects" className={`${linkStyle} mt-8`}><ArrowLeft size={16} />{backLabel}</Link>
      </div>
    );
  }

  const title = bn && item.title_bn ? item.title_bn : item.title_en;
  const description = bn && item.description_bn ? item.description_bn : item.description_en;
  const isVideo = item.type === "video";
  const youtube = isVideo ? parseYouTubeVideo(item.file) : null;
  const embedUrl = youtube?.isYouTube
    ? `https://www.youtube-nocookie.com/embed/${youtube.videoId}?playsinline=1&rel=0`
    : null;
  const related = items.filter((project) => project.id !== id).sort((a, b) =>
    Number(b.relatedCategory === item.relatedCategory) - Number(a.relatedCategory === item.relatedCategory)
  ).slice(0, 3);
  const facts = [
    { label: bn ? "লোকেশন" : "Location", value: item.location, icon: MapPin },
    { label: bn ? "ইনস্টলেশনের সময়" : "Installed", value: item.installedDate, icon: Calendar },
    { label: bn ? "মেশিনের ধরন" : "Machinery category", value: item.relatedCategory?.replaceAll("-", " "), icon: ImageIcon },
    { label: bn ? "মিডিয়া" : "Media", value: isVideo ? (bn ? "ভিডিও" : "Video") : (bn ? "ছবি" : "Photo"), icon: isVideo ? Video : ImageIcon },
  ];

  return (
    <article className="bg-white py-10 text-[#2D2D2D] sm:py-16">
      <title>{`${title} | Tasneem Knit Industry`}</title>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label={bn ? "প্রজেক্ট নেভিগেশন" : "Project navigation"} className="mb-8">
          <Link href="/projects" className={linkStyle}><ArrowLeft size={16} />{backLabel}</Link>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 sm:aspect-video">
              {isVideo ? (
                embedUrl ? (
                  <iframe key={item.file} src={embedUrl} title={title} className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen />
                ) : (
                  <video key={item.file} src={item.file} poster={item.thumbnail || undefined}
                    controls playsInline preload="metadata" aria-label={title} className="h-full w-full object-contain" />
                )
              ) : (
                <Image src={item.file} alt={title} fill loading="eager"
                  sizes="(min-width: 1280px) 856px, (min-width: 1024px) 65vw, 100vw"
                  unoptimized={item.file.startsWith("http") || item.file.startsWith("data:")}
                  className="object-contain" />
              )}
            </div>
            {!isVideo && (
              <a href={item.file} target="_blank" rel="noopener noreferrer" className={`${linkStyle} mt-4`}>
                {bn ? "পূর্ণ আকারে ছবি দেখুন" : "View full-size image"}<ArrowUpRight size={16} />
              </a>
            )}
            <div className="mt-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#F9E6EA] px-3 py-1 text-xs font-semibold text-[#800020]">
                {isVideo ? <Video size={14} /> : <ImageIcon size={14} />}
                {isVideo ? (bn ? "ভিডিও প্রজেক্ট" : "Video project") : (bn ? "প্রজেক্ট গ্যালারি" : "Project gallery")}
              </span>
              <h1 className="mt-4 text-2xl font-bold leading-relaxed tracking-tight sm:text-3xl">{title}</h1>
              {description && (
                <section className="mt-8 border-t border-neutral-200 pt-6">
                  <h2 className="mb-3 text-lg font-semibold">{bn ? "প্রজেক্টের বিবরণ" : "About this project"}</h2>
                  <p className="whitespace-pre-line break-words text-base leading-8 text-neutral-600">{description}</p>
                </section>
              )}
            </div>
          </div>

          <aside className="min-w-0 rounded-2xl border border-neutral-200 bg-[#FAFAFA] p-6">
            <h2 className="text-lg font-bold">{bn ? "প্রজেক্টের তথ্য" : "Project information"}</h2>
            <dl className="mt-6 space-y-5">
              {facts.filter((fact) => fact.value).map(({ label, value, icon: Icon }) => (
                <div key={label}>
                  <dt className="flex items-center gap-2 text-xs font-medium text-neutral-500"><Icon size={14} />{label}</dt>
                  <dd className="mt-1.5 break-words text-sm font-semibold leading-6">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 border-t border-neutral-200 pt-6">
              <h3 className="font-semibold">{bn ? "আপনার ফ্যাক্টরির জন্য এমন সমাধান চান?" : "Planning a similar installation?"}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{bn ? "আপনার প্রয়োজন নিয়ে আমাদের টিমের সঙ্গে কথা বলুন।" : "Talk to our team about your factory requirements."}</p>
              <Link href="/quote" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#800020] px-4 py-3 text-sm font-semibold text-white hover:bg-[#600018] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]">
                {bn ? "কোটেশন নিন" : "Request a quote"}<ArrowUpRight size={16} />
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-neutral-200 pt-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{bn ? "আরও প্রজেক্ট দেখুন" : "Explore more projects"}</h2>
              <Link href="/projects" className={linkStyle}>{backLabel}<ArrowUpRight size={16} /></Link>
            </div>
            <ProjectGalleryGrid items={related} />
          </section>
        )}
      </div>
    </article>
  );
}
