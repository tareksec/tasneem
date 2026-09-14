import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  MessageCircle,
  ShieldCheck,
  Ship,
  Wrench,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { MACHINES, getMachineById, getCategoryInfo } from "@/lib/machines-data";
import { COMPANY_INFO } from "@/lib/constants";
import { MachineCategory } from "@/lib/types";
import { MachineSpecTable, SpecRow } from "@/components/machines/MachineSpecTable";
import { MachineStickyCta } from "@/components/machines/MachineStickyCta";
import { MachineGallery } from "@/components/machines/MachineGallery";
import { RelatedMachines } from "@/components/machines/RelatedMachines";


export function generateStaticParams() {
  const params: { category: string; id: string }[] = [];
  MACHINES.forEach((m) => {
    params.push({ category: m.category, id: m.id });
    if (m.mainCategory && m.mainCategory !== m.category) {
      params.push({ category: m.mainCategory, id: m.id });
    }
  });
  return params;
}

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const machine = getMachineById(id);

  const matchesCategory =
    machine &&
    (machine.category === category ||
      machine.mainCategory === category ||
      machine.subCategory === category);

  if (!machine || !matchesCategory) {
    notFound();
  }

  const categoryInfo = getCategoryInfo(machine.category as MachineCategory);

  // Helper to strictly render value or "Contact for details" per PRD Section 6.3 & Hard Rules
  const renderSpec = (value: string | number | undefined | null) => {
    if (value === undefined || value === null || value === "") {
      return (
        <span className="text-[#6B7280] italic font-normal text-xs sm:text-sm">
          Contact for details / বিস্তারিত জানতে আমাদের সাথে কথা বলুন
        </span>
      );
    }
    return <span className="font-semibold text-[#0A0A0A] text-xs sm:text-sm">{value}</span>;
  };

  const whatsappInquiryUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Tasneem Knit Industry, I am interested in technical specifications and CFR quotation for: ${machine.name} (${machine.brand}).`
  )}`;

  // Product Schema JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: machine.name,
    brand: {
      "@type": "Brand",
      name: machine.brand,
    },
    manufacturer: {
      "@type": "Organization",
      name: machine.manufacturer,
    },
    category: machine.category,
    description: machine.description,
    image: `${COMPANY_INFO.domain}${machine.images[0] || "/images/machines/machine-placeholder.svg"}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      price: machine.price ? machine.price.toString() : "0",
      priceStatus: "Quote upon request",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: COMPANY_INFO.name,
      },
    },
  };

  return (
    <div className="py-10 sm:py-16 bg-white text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#4B5563] mb-8">
          <Link href="/machines" className="hover:text-[#0A0A0A] transition-colors">
            Machines
          </Link>
          <span>/</span>
          <Link href={`/machines/${category}`} className="hover:text-[#0A0A0A] transition-colors capitalize">
            {categoryInfo?.name || category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-[#0A0A0A] font-semibold truncate max-w-xs">{machine.name}</span>
        </nav>

        {/* Top Product Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Machine Diagram / Image Showcase (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <MachineGallery
              images={machine.images}
              galleryImages={machine.galleryImages}
              machineName={machine.name}
              brand={machine.brand}
            />

            {/* Service Badges Under Image */}
            <div className="border border-[#E5E7EB] rounded-2xl bg-white p-4 sm:p-5 shadow-sm flex flex-col gap-2.5 text-xs text-[#4B5563]">
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#6B7280]" />
                <span>CFR Chattogram Sea Shipping Available</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pre-Shipment Inspection (SGS / ITS / BV)</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#6B7280]" />
                <span>Factory Leveling, Commissioning & Spares Support</span>
              </div>
            </div>
          </div>

          {/* Machine Header & Quick Quote Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded border border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-bold uppercase tracking-wider text-[#FF0000]">
                  {categoryInfo?.name || machine.category.replace("-", " ")}
                </span>
                <span className="text-xs text-[#4B5563]">
                  {machine.origin ? `Country of Origin: ${machine.origin}` : "Imported Machinery"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A] leading-tight">
                {machine.name}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#4B5563] font-medium">
                Manufacturer: {renderSpec(machine.manufacturer)} • Brand: <span className="font-semibold text-[#0A0A0A]">{machine.brand}</span>
              </p>
            </div>

            {/* Quick Price/Availability Notice */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#6B7280] uppercase tracking-wider font-semibold block">Commercial Pricing</span>
                <span className="text-lg sm:text-xl font-bold text-[#FF0000]">
                  {machine.price ? `$${machine.price.toLocaleString()} (CFR)` : "Quote Upon Request (CFR Chattogram)"}
                </span>
                <span className="text-[11px] text-[#6B7280] block mt-0.5">
                  L/C at sight through commercial banks in Bangladesh
                </span>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {machine.availability === "in-stock"
                    ? "In Stock"
                    : machine.availability === "made-to-order"
                    ? "Made to Order"
                    : "Contact for availability"}
                </span>
              </div>
            </div>

            {/* Primary & WhatsApp Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href={`/quote?machine=${encodeURIComponent(machine.name)}&id=${machine.id}&category=${machine.category}`}
                className="w-full sm:w-auto flex-1 bg-[#FF0000] hover:bg-[#E00000] text-white py-3 px-6 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Request a Quote (Pre-filled)</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white border border-[#D1D5DB] text-[#0A0A0A] py-3 px-5 rounded-lg text-sm font-semibold hover:bg-[#F3F4F6] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Quick WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Description */}
            <div className="pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                Machinery Overview
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {machine.description}
              </p>
            </div>

            {/* Key Features Checklist */}
            {machine.features && machine.features.length > 0 && (
              <div className="pt-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                  Key Engineering Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {machine.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#4B5563]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Structured Specification Table */}
        {(() => {
          const specs: SpecRow[] = [
            { label: "Machine Name", value: <span className="font-bold text-[#0A0A0A]">{machine.name}</span> },
            { label: "Brand", value: renderSpec(machine.brand) },
            { label: "Manufacturer", value: renderSpec(machine.manufacturer) },
            { label: "Machine Type", value: renderSpec(machine.machineType) },
            { label: "Category", value: <span className="capitalize">{renderSpec(machine.category.replace("-", " "))}</span> },
            { label: "Cylinder Diameter", value: renderSpec(machine.cylinderDiameter) },
            { label: "Gauge", value: renderSpec(machine.gauge) },
            { label: "Feeders", value: renderSpec(machine.feeders) },
            { label: "Number of Systems", value: renderSpec(machine.numberOfSystems) },
            { label: "Machine Speed (RPM)", value: renderSpec(machine.machineSpeed) },
            { label: "Fabric Type", value: renderSpec(machine.fabricType) },
            { label: "Production Capacity", value: renderSpec(machine.productionCapacity) },
            {
              label: "Target Applications",
              value:
                machine.application && machine.application.length > 0 ? (
                  <span className="font-semibold text-[#0A0A0A] text-xs sm:text-sm">
                    {machine.application.join(", ")}
                  </span>
                ) : (
                  renderSpec(undefined)
                ),
            },
            { label: "Power Requirement", value: renderSpec(machine.powerRequirement) },
            { label: "Dimensions (L × W × H)", value: renderSpec(machine.dimensions) },
            { label: "Net Weight", value: renderSpec(machine.weight) },
            { label: "Country of Origin", value: renderSpec(machine.origin) },
            { label: "Warranty", value: renderSpec(machine.warranty) },
            {
              label: "Availability",
              value: (
                <span className="capitalize">
                  {machine.availability ? machine.availability.replace(/-/g, " ") : renderSpec(undefined)}
                </span>
              ),
            },
            {
              label: "Commercial Price",
              value: machine.price ? (
                <span className="text-[#FF0000] font-bold">${machine.price.toLocaleString()} (CFR)</span>
              ) : (
                renderSpec(undefined)
              ),
            },
          ];

          return <MachineSpecTable specs={specs} />;
        })()}

        {/* Related Machines Section */}
        <RelatedMachines currentMachineId={machine.id} category={machine.category} />

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-[#F9FAFB] border border-[#E5E7EB] text-[#0A0A0A] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-[#0A0A0A]">Interested in {machine.name}?</h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-xl">
              We provide formal Proforma Invoices (PI) for Bangladesh Bank L/C opening and complete CFR Chattogram delivery schedule.
            </p>
          </div>
          <Link
            href={`/quote?machine=${encodeURIComponent(machine.name)}&id=${machine.id}&category=${machine.category}`}
            className="bg-[#FF0000] text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-bold hover:bg-[#E00000] transition-colors shrink-0 flex items-center gap-1.5 duration-200"
          >
            <span>Request Quotation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Sticky Bottom Quote CTA on Scroll */}
      <MachineStickyCta
        machineName={machine.name}
        machineId={machine.id}
        category={machine.category}
        brand={machine.brand}
        price={machine.price}
        whatsappUrl={whatsappInquiryUrl}
      />
    </div>
  );
}
