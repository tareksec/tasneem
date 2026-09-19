"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight,
  Factory, Globe2, MapPin, ShieldCheck, Ship, Wrench,
} from "lucide-react";
import { AboutCompanyDetails } from "@/components/about/AboutCompanyDetails";
import { LiteYouTubeEmbed } from "@/components/ui/LiteYouTubeEmbed";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import styles from "./page.module.css";

export default function AboutPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";
  const copy = (en: string, bn: string) => (isBn ? bn : en);

  const strengths = [
    { icon: Factory, value: copy("Direct sourcing", "সরাসরি সোর্সিং"), label: copy("From the manufacturer", "প্রস্তুতকারকের কাছ থেকে") },
    { icon: ShieldCheck, value: copy("30–60 min", "৩০–৬০ মিনিট"), label: copy("Pre-shipment trial run", "শিপমেন্টের আগে ট্রায়াল রান") },
    { icon: Ship, value: copy("CFR Chattogram", "সিএফআর চট্টগ্রাম"), label: copy("Coordinated sea freight", "সমন্বিত সমুদ্র পরিবহন") },
    { icon: Wrench, value: copy("12 months", "১২ মাস"), label: copy("Manufacturer warranty", "প্রস্তুতকারকের ওয়ারেন্টি") },
  ];
  const steps = [
    { icon: Factory, title: copy("Find the right fit", "সঠিক মেশিন নির্বাচন"), text: copy("We match your fabric, gauge, cylinder diameter, and production needs with the right machine builder.", "আপনার ফ্যাব্রিক, গেজ, সিলিন্ডারের ব্যাস ও উৎপাদনের চাহিদা অনুযায়ী সঠিক প্রস্তুতকারক ও মেশিন নির্বাচন করি।") },
    { icon: ShieldCheck, title: copy("Inspect before shipping", "শিপমেন্টের আগে যাচাই"), text: copy("Machine checks, trial runs, and fabric tests help verify the specifications before your machine is packed.", "প্যাকিংয়ের আগে মেশিন পরীক্ষা, ট্রায়াল রান ও ফ্যাব্রিক টেস্টের মাধ্যমে নির্ধারিত স্পেসিফিকেশন যাচাই করি।") },
    { icon: Ship, title: copy("Bring it to Bangladesh", "বাংলাদেশে পৌঁছে দেওয়া"), text: copy("We coordinate CFR Chattogram sea freight, L/C documentation, and the import process.", "সিএফআর চট্টগ্রাম সমুদ্র পরিবহন, এল/সি ডকুমেন্টেশন ও আমদানির প্রতিটি ধাপ সমন্বয় করি।") },
    { icon: Wrench, title: copy("Get your mill running", "আপনার মিলে উৎপাদন শুরু"), text: copy("On-site installation, commissioning, operator guidance, and spare parts support keep you moving forward.", "অন-সাইট ইনস্টলেশন, কমিশনিং, অপারেটর প্রশিক্ষণ ও স্পেয়ার পার্টস সাপোর্ট দিয়ে আপনার পাশে থাকি।") },
  ];

  return (
    <div className={`${styles.page} bg-white text-gray-dark`}>
      <section className="overflow-hidden" aria-labelledby="about-heading">
        <div className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <nav aria-label={copy("Breadcrumb", "ব্রেডক্রাম্ব")} className="mb-10 flex items-center gap-2 text-xs text-gray-secondary sm:mb-14">
            <Link href={`/${locale}`} className="transition-colors hover:text-burgundy">{copy("Home", "হোম")}</Link>
            <ChevronRight aria-hidden="true" className="size-3.5 text-gray-muted" />
            <span aria-current="page" className="text-burgundy">{copy("About us", "আমাদের সম্পর্কে")}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className={styles.eyebrow}><span />{copy("THE PEOPLE BEHIND THE MACHINERY", "মেশিনারির পেছনের মানুষগুলো")}</p>
              <h1 id="about-heading" className={`mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${isBn ? "leading-[1.4]" : "leading-[1.12]"}`}>
                {copy("Better machinery.", "উন্নত মেশিনারি।")}<br />
                <span className="text-burgundy">{copy("Stronger partnerships.", "বিশ্বস্ত অংশীদারিত্ব।")}</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-gray-secondary">
                {copy("We connect Bangladesh’s textile mills with machinery builders in China. From the first conversation to your first production run, Tasneem is with you at every step.", "বাংলাদেশের টেক্সটাইল মিলগুলোকে চীনের মেশিন প্রস্তুতকারকদের সঙ্গে যুক্ত করি আমরা। প্রথম আলোচনা থেকে আপনার কারখানায় উৎপাদন শুরু—প্রতিটি ধাপে পাশে আছে তাসনীম।")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/${locale}/machines`} className="btn-primary">{copy("Explore our machinery", "আমাদের মেশিনারি দেখুন")}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
                <a href="#our-story" className="btn-secondary">{copy("Meet Tasneem", "তাসনীমকে জানুন")}<ArrowDown aria-hidden="true" className="size-4" /></a>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-secondary">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-burgundy" />
                <span>{copy("Rooted in Narayanganj. Connected to the world.", "নারায়ণগঞ্জে আমাদের ঠিকানা। সংযোগ বিশ্বজুড়ে।")}</span>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.heroImage}>
                <Image src="/video/hero-video-poster.png" alt={copy("Circular knitting machines arranged on a textile factory floor", "টেক্সটাইল কারখানায় সাজানো সার্কুলার নিটিং মেশিন")} fill preload sizes="(max-width: 1023px) calc(100vw - 48px), 560px" className="object-cover" />
                <span className={styles.imageLabel}><Factory aria-hidden="true" className="size-4" />{copy("BUILT FOR YOUR NEXT CHAPTER", "আপনার আগামী দিনের জন্য")}</span>
              </div>
              <div className={styles.routeCard}>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium tracking-wider text-white/75">{copy("DIRECT CONNECTION", "সরাসরি সংযোগ")}</span>
                  <Globe2 aria-hidden="true" className="size-5 text-white/80" />
                </div>
                <div className="mt-4 flex items-center gap-4 text-lg font-semibold sm:text-xl">
                  <span>{copy("China", "চীন")}</span><span className={styles.routeLine}><ArrowRight aria-hidden="true" className="size-4" /></span><span>{copy("Bangladesh", "বাংলাদেশ")}</span>
                </div>
                <p className="mt-3 text-xs leading-5 text-white/80">{copy("Factory sourcing. Local expertise. Lasting support.", "ফ্যাক্টরি সোর্সিং। দেশীয় দক্ষতা। নির্ভরযোগ্য সাপোর্ট।")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-gray-border bg-surface-offwhite">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 px-4 py-7 sm:px-6 sm:py-9 lg:grid-cols-4 lg:px-8">
          {strengths.map(({ icon: Icon, value, label }, index) => (
            <div key={value} className={`flex flex-col gap-3 px-3 py-4 sm:flex-row sm:gap-4 sm:px-6 ${index % 2 ? "border-l border-gray-border" : ""} ${index === 2 ? "lg:border-l lg:border-gray-border" : ""}`}>
              <Icon aria-hidden="true" className="mt-1 size-6 shrink-0 text-burgundy" strokeWidth={1.5} />
              <div className="flex flex-col"><dt className="order-2 mt-1 text-xs leading-5 text-gray-secondary sm:text-sm">{label}</dt><dd className="text-base font-semibold sm:text-lg">{value}</dd></div>
            </div>
          ))}
        </dl>
      </div>

      <section id="our-story" aria-labelledby="story-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={styles.eyebrow}><span />{copy("OUR PURPOSE", "আমাদের উদ্দেশ্য")}</p>
            <h2 id="story-heading" className="mt-5 text-3xl font-bold leading-snug tracking-tight sm:text-4xl">{copy("More than a machine. A partner in your progress.", "শুধু মেশিন সরবরাহ নয়, আপনার অগ্রযাত্রার সঙ্গী।")}</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-8 text-gray-secondary">{copy("The right equipment can change what a mill is capable of. Our role is to make that equipment easier to source, understand, and put to work—with a team you can reach here in Bangladesh.", "সঠিক মেশিন একটি কারখানার উৎপাদন সক্ষমতা বদলে দিতে পারে। সেই মেশিন খুঁজে পাওয়া, বুঝে নেওয়া ও কাজে লাগানো সহজ করাই আমাদের কাজ—বাংলাদেশে বসেই আপনি পাবেন আমাদের দলের সহায়তা।")}</p>
            <p className="mt-4 text-base leading-8 text-gray-secondary">{copy("Based in BSCIC, Narayanganj, Tasneem Knitting Industry imports circular knitting, dyeing, shearing, and finishing machinery. We connect technical requirements with direct factory sourcing, shipping, and on-site commissioning.", "বিসিক, নারায়ণগঞ্জভিত্তিক তাসনীম নিট ইন্ডাস্ট্রি সার্কুলার নিটিং, ডাইং, শিয়ারিং ও ফিনিশিং মেশিন আমদানি করে। আপনার কারিগরি চাহিদার সঙ্গে মিল রেখে সরাসরি সোর্সিং, পরিবহন ও অন-সাইট কমিশনিংয়ের দায়িত্ব নিই আমরা।")}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              {[copy("Direct factory relationships", "প্রস্তুতকারকের সঙ্গে সরাসরি সম্পর্ক"), copy("Technical guidance", "কারিগরি পরামর্শ"), copy("Local after-sales support", "দেশেই বিক্রয়োত্তর সেবা")].map((item) => <li key={item} className="flex items-center gap-2"><Check aria-hidden="true" className="size-4 shrink-0 text-burgundy" />{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-3xl border border-gray-border bg-surface-offwhite lg:mt-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-4 sm:p-7">
            <LiteYouTubeEmbed videoId="ONTd4X4M-Vo" title={copy("Meet Md. Mamunur Rashid, proprietor of Tasneem Knitting Industry", "তাসনীম নিট ইন্ডাস্ট্রির স্বত্বাধিকারী মোঃ মামুনুর রশীদের পরিচিতি")} autoPlay={false} className={styles.founderVideo} />
            <p className="mt-4 flex items-center gap-2 px-1 text-xs text-gray-secondary"><span className="size-1.5 rounded-full bg-burgundy" />{copy("A conversation with our founder", "আমাদের প্রতিষ্ঠাতার কথা")}</p>
          </div>
          <div className="flex flex-col justify-center p-6 pt-4 sm:p-9 lg:p-10">
            <p className={styles.eyebrow}>{copy("A PERSONAL COMMITMENT", "ব্যক্তিগত অঙ্গীকার")}</p>
            <h3 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">{copy("Behind every machine, there should be someone you trust.", "প্রতিটি মেশিনের পেছনে থাকুক একজন বিশ্বস্ত মানুষ।")}</h3>
            <p className="mt-4 text-sm leading-7 text-gray-secondary">{copy("Led by Md. Mamunur Rashid, our approach brings direct sourcing and hands-on technical support together. We believe the relationship continues long after a machine arrives at your mill.", "মোঃ মামুনুর রশীদের নেতৃত্বে আমরা সরাসরি সোর্সিং ও হাতে-কলমে কারিগরি সহায়তাকে একসঙ্গে নিয়ে কাজ করি। মেশিন আপনার মিলে পৌঁছে যাওয়ার পরও আমাদের সম্পর্ক ও দায়িত্ব চলতে থাকে।")}</p>
            <div className="mt-6 border-t border-gray-border pt-5"><p className="font-semibold">{isBn ? "মোঃ মামুনুর রশীদ" : COMPANY_INFO.owner}</p><p className="mt-1 text-xs text-gray-secondary">{copy("Proprietor · Tasneem Knitting Industry", "স্বত্বাধিকারী · তাসনীম নিট ইন্ডাস্ট্রি")}</p></div>
            <Link href={`/${locale}/founder`} className="mt-4 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-burgundy hover:underline underline-offset-4">{copy("Meet our founder", "আমাদের প্রতিষ্ঠাতাকে জানুন")}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </div>
        </div>
      </section>

      <section id="our-process" aria-labelledby="process-heading" className="scroll-mt-28 border-y border-gray-border bg-surface-offwhite">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className={styles.eyebrow}><span />{copy("ONE CONNECTED PROCESS", "একটি সমন্বিত প্রক্রিয়া")}</p>
              <h2 id="process-heading" className="mt-5 text-3xl font-bold leading-snug tracking-tight sm:text-4xl">{copy("From their factory to your floor.", "প্রস্তুতকারকের কারখানা থেকে আপনার মিলে।")}</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-gray-secondary">{copy("Four clear steps. One team taking care of the details.", "চারটি সুস্পষ্ট ধাপ। প্রতিটি কাজের দায়িত্বে একটি দল।")}</p>
            </div>
            <Link href={`/${locale}/how-it-works`} className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-burgundy hover:underline underline-offset-4">{copy("Explore the full process", "পুরো প্রক্রিয়াটি দেখুন")}<ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className={styles.processCard}>
                <div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-2xl bg-burgundy-light text-burgundy"><Icon aria-hidden="true" className="size-6" strokeWidth={1.5} /></span><span className="text-sm font-medium tabular-nums text-gray-muted">{isBn ? ["০১", "০২", "০৩", "০৪"][index] : `0${index + 1}`}</span></div>
                <h3 className="mt-7 text-lg font-semibold leading-7">{title}</h3><p className="mt-3 text-sm leading-7 text-gray-secondary">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex items-start gap-3 text-sm leading-6 text-gray-secondary"><Wrench aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-burgundy" /><p>{copy("And we stay connected—with operator training, genuine spare parts, and after-sales support.", "এরপরও পাশে থাকি—অপারেটর প্রশিক্ষণ, জেনুইন স্পেয়ার পার্টস ও বিক্রয়োত্তর সেবা নিয়ে।")}</p></div>
        </div>
      </section>
      <AboutCompanyDetails />
    </div>
  );
}
