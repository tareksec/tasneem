import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getCategoryInfo } from "@/lib/machines-data";
import { getDbCategories, getDbCategoryBySlug } from "@/lib/db/categories";
import { getDbMachines } from "@/lib/db/machines";
import { COMPANY_INFO } from "@/lib/constants";
import { MachineCard } from "@/components/machines/MachineCard";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { MachineCategory } from "@/lib/types";

export async function generateStaticParams() {
  const categories = await getDbCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const catInfo = (await getDbCategoryBySlug(category)) || getCategoryInfo(category as MachineCategory);
  if (!catInfo) return {};

  const title = `${catInfo.name} | Circular Knitting Machinery Importer Bangladesh`;
  const description = `${catInfo.description} Explore industrial machinery models, technical cylinder gauges, and CFR Chattogram import delivery terms.`;
  const canonicalUrl = `${COMPANY_INFO.domain}/machines/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${COMPANY_INFO.domain}/en/machines/${category}`,
        bn: `${COMPANY_INFO.domain}/bn/machines/${category}`,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const catInfo = (await getDbCategoryBySlug(category)) || getCategoryInfo(category as MachineCategory);

  if (!catInfo) {
    notFound();
  }

  const machines = await getDbMachines({ category });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: COMPANY_INFO.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Machines",
        item: `${COMPANY_INFO.domain}/machines`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: catInfo.name,
        item: `${COMPANY_INFO.domain}/machines/${category}`,
      },
    ],
  };

  return (
    <div className="py-12 sm:py-16 bg-white text-[#2D2D2D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <Link
            href="/machines"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#2D2D2D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Machines / সব মেশিনের তালিকায় ফিরে যান</span>
          </Link>
        </div>

        {/* Category Hero Banner */}
        <MotionSection className="border border-[#E5E7EB] rounded-2xl bg-[#F9FAFB] p-6 sm:p-10 mb-12 shadow-sm">
          <span className="sr-only">Typical Range: {catInfo.typicalGauge || "Universal"}</span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2D2D2D]">
            {catInfo.name}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#4B5563] max-w-3xl leading-relaxed">
            {catInfo.description}
          </p>

          {/* If Circular Knitting Top-Level, show subcategory links */}
          {catInfo.slug === "circular-knitting" && (
            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <span className="text-xs uppercase tracking-wider text-[#6B7280] font-bold block mb-3">
                Sub-Categories Available
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { slug: "double-jersey", label: "Double Jersey" },
                  { slug: "single-jersey", label: "Single Jersey" },
                  { slug: "interlock", label: "Interlock" },
                  { slug: "jacquard", label: "Jacquard" },
                  { slug: "terry", label: "Terry & Fleece" },
                ].map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/machines/${sub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D1D5DB] bg-white hover:border-[#800020] text-xs font-semibold text-[#2D2D2D] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                  >
                    <span>{sub.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#800020]" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Common Applications Badges */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <span className="text-xs uppercase tracking-wider text-[#6B7280] font-bold block mb-3">
              Common Industrial Applications in Bangladesh
            </span>
            <div className="flex flex-wrap gap-2">
              {(catInfo.commonApplications || []).map((app) => (
                <span
                  key={app}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-medium text-[#2D2D2D]"
                >
                  <Check className="w-3.5 h-3.5 text-[#800020]" />
                  {app}
                </span>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">
            Available {catInfo.name} Models ({machines.length})
          </h2>
          <Link
            href={`/quote?category=${catInfo.slug}`}
            className="bg-[#800020] hover:bg-[#5A0017] text-white px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
          >
            <span>Request {catInfo.name} Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Machines Grid */}
        {machines.length > 0 ? (
          <StaggerContainer
            staggerDelay={0.07}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {machines.map((machine) => (
              <StaggerItem key={machine.id}>
                <MachineCard machine={machine} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="border border-dashed border-[#E5E7EB] rounded-xl p-12 text-center bg-[#F9FAFB]">
            <p className="text-sm font-semibold text-[#2D2D2D]">
              Models currently imported to client order specifications.
            </p>
            <p className="text-xs text-[#4B5563] mt-1">
              Contact our engineering sourcing desk to request custom cylinder diameter and feeder counts.
            </p>
            <Link
              href={`/quote?category=${catInfo.slug}`}
              className="mt-4 inline-block bg-[#800020] hover:bg-[#5A0017] text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors"
            >
              Request Custom Sourcing
            </Link>
          </div>
        )}

        {/* Other Categories Carousel/Grid */}
        <MotionSection delay={0.1} className="mt-16 pt-12 border-t border-[#E5E7EB]">
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-6">
            Explore Other Machinery Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {(await getDbCategories()).filter((c) => c.slug !== catInfo.slug).map((c) => (
              <Link
                key={c.slug}
                href={`/machines/${c.slug}`}
                className="border border-[#E5E7EB] rounded-xl p-4 bg-white hover:border-[#C0C0C0] hover:-translate-y-0.5 transition-all duration-200 text-center flex flex-col items-center justify-center gap-1 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
              >
                <span className="font-bold text-xs text-[#2D2D2D]">{c.name}</span>
                <span className="text-[10px] text-[#6B7280]">{c.typicalGauge || "Universal"}</span>
              </Link>
            ))}
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
