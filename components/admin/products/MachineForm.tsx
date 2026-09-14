"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Save,
  ArrowLeft,
  Upload,
  Trash2,
  MoveUp,
  MoveDown,
  Star,
  AlertTriangle,
  Plus,
  X,
  Sparkles,
  Layers,
  Cpu,
  FileText,
  DollarSign,
  Globe,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import {
  Machine,
  MachineCategory,
  MainCategory,
  CircularKnittingSubCategory,
  MachineAvailability,
  MachineGalleryImage,
} from "@/lib/types";
import { MAIN_CATEGORIES, CIRCULAR_SUB_CATEGORIES } from "@/lib/machines-data";
import { AdminStore } from "@/lib/admin/admin-store";
import { useToast } from "@/components/admin/ui/toast";

interface MachineFormProps {
  initialMachine?: Machine;
  isEditing?: boolean;
}

export function MachineForm({ initialMachine, isEditing = false }: MachineFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  // Active language tab for bilingual fields
  const [activeLang, setActiveLang] = useState<"en" | "bn">("en");

  // Track original slug/category for 301 redirect creation
  const originalId = initialMachine?.id || "";
  const originalCategory = initialMachine?.category || "double-jersey";

  // Helper to determine initial mainCategory and subCategory
  const getInitialMainCategory = (m?: Machine): MainCategory => {
    if (m?.mainCategory) return m.mainCategory;
    if (m?.category && ["dyeing", "shearing", "finishing", "other"].includes(m.category)) {
      return m.category as MainCategory;
    }
    return "circular-knitting";
  };

  const getInitialSubCategory = (m?: Machine): CircularKnittingSubCategory => {
    if (m?.subCategory) return m.subCategory;
    if (m?.category && ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(m.category)) {
      return m.category as CircularKnittingSubCategory;
    }
    return "double-jersey";
  };

  // Form State
  const [id, setId] = useState(initialMachine?.id || "");
  const [slugOverridden, setSlugOverridden] = useState(false);
  const [name, setName] = useState(initialMachine?.name || "");
  const [name_bn, setNameBn] = useState(initialMachine?.name_bn || "");
  const [brand, setBrand] = useState(initialMachine?.brand || "");
  const [manufacturer, setManufacturer] = useState(initialMachine?.manufacturer || "");
  const [mainCategory, setMainCategory] = useState<MainCategory>(getInitialMainCategory(initialMachine));
  const [subCategory, setSubCategory] = useState<CircularKnittingSubCategory>(getInitialSubCategory(initialMachine));
  const [machineType, setMachineType] = useState(
    initialMachine?.machineType || "Double Jersey Circular Knitting Machine"
  );
  const currentCategory = mainCategory === "circular-knitting" ? subCategory : mainCategory;

  // Specifications
  const [cylinderDiameter, setCylinderDiameter] = useState(initialMachine?.cylinderDiameter || "");
  const [gauge, setGauge] = useState(initialMachine?.gauge || "");
  const [feeders, setFeeders] = useState<string>(
    initialMachine?.feeders !== undefined ? String(initialMachine.feeders) : ""
  );
  const [numberOfSystems, setNumberOfSystems] = useState<string>(
    initialMachine?.numberOfSystems !== undefined ? String(initialMachine.numberOfSystems) : ""
  );
  const [machineSpeed, setMachineSpeed] = useState(initialMachine?.machineSpeed || "");
  const [fabricType, setFabricType] = useState(initialMachine?.fabricType || "");
  const [fabricType_bn, setFabricTypeBn] = useState(initialMachine?.fabricType_bn || "");
  const [productionCapacity, setProductionCapacity] = useState(initialMachine?.productionCapacity || "");
  const [powerRequirement, setPowerRequirement] = useState(initialMachine?.powerRequirement || "");
  const [dimensions, setDimensions] = useState(initialMachine?.dimensions || "");
  const [weight, setWeight] = useState(initialMachine?.weight || "");
  const [origin, setOrigin] = useState(initialMachine?.origin || "China Import");

  // Commercial
  const [price, setPrice] = useState<string>(
    initialMachine?.price !== undefined ? String(initialMachine.price) : ""
  );
  const [availability, setAvailability] = useState<MachineAvailability>(
    initialMachine?.availability || "made-to-order"
  );
  const [warranty, setWarranty] = useState(
    initialMachine?.warranty || "1 Year International Manufacturer Warranty + Local Technician Support"
  );

  // Content
  const [description, setDescription] = useState(initialMachine?.description || "");
  const [description_bn, setDescriptionBn] = useState(initialMachine?.description_bn || "");
  const [features, setFeatures] = useState<string[]>(
    initialMachine?.features && initialMachine.features.length > 0
      ? initialMachine.features
      : ["Turnkey CFR Chattogram sea shipment and on-site factory commissioning"]
  );
  const [features_bn, setFeaturesBn] = useState<string[]>(
    initialMachine?.features_bn && initialMachine.features_bn.length > 0
      ? initialMachine.features_bn
      : ["সিএফআর চট্টগ্রাম পোর্ট শিপমেন্ট ও কারখানায় সরাসরি ইনস্টলেশন"]
  );
  const [applicationTags, setApplicationTags] = useState<string>(
    (initialMachine?.application || []).join(", ")
  );
  const [applicationTagsBn, setApplicationTagsBn] = useState<string>(
    (initialMachine?.application_bn || []).join(", ")
  );

  // Status
  const [status, setStatus] = useState<"published" | "draft">(
    initialMachine?.status || "published"
  );

  // SEO Fields
  const [seoTitle_en, setSeoTitleEn] = useState(initialMachine?.seoTitle_en || "");
  const [seoTitle_bn, setSeoTitleBn] = useState(initialMachine?.seoTitle_bn || "");
  const [seoDesc_en, setSeoDescEn] = useState(initialMachine?.seoDesc_en || "");
  const [seoDesc_bn, setSeoDescBn] = useState(initialMachine?.seoDesc_bn || "");

  // Gallery Images
  const [gallery, setGallery] = useState<MachineGalleryImage[]>(
    initialMachine?.galleryImages && initialMachine.galleryImages.length > 0
      ? initialMachine.galleryImages
      : (initialMachine?.images || ["/images/machines/cat-double-jersey.webp"]).map((url, idx) => ({
          id: `img-${idx}`,
          url,
          alt_en: `${initialMachine?.name || "Machine"} view ${idx + 1}`,
          alt_bn: `${initialMachine?.name_bn || "মেশিন"} ছবি ${idx + 1}`,
          isPrimary: idx === 0,
        }))
  );

  // Auto-generate slug from name if new or not manually overridden
  useEffect(() => {
    if (!isEditing && !slugOverridden && name) {
      const generated = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setId(generated);
    }
  }, [name, isEditing, slugOverridden]);

  // Auto-generate SEO defaults
  useEffect(() => {
    if (!seoTitle_en && name) {
      setSeoTitleEn(`${name} | Tasneem Knit Industry`);
    }
    if (!seoTitle_bn && name_bn) {
      setSeoTitleBn(`${name_bn} | তাসনীম নিট ইন্ডাস্ট্রি`);
    }
  }, [name, name_bn, seoTitle_en, seoTitle_bn]);

  // Image Upload with Client-Side Canvas WebP Auto-Optimization
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const reader = new FileReader();
        reader.onload = (uploadEvent) => {
          const img = document.createElement("img");
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 1600;
            let w = img.width;
            let h = img.height;
            if (w > MAX_WIDTH) {
              h = Math.round((h * MAX_WIDTH) / w);
              w = MAX_WIDTH;
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, w, h);
            const optimizedWebpUrl = canvas.toDataURL("image/webp", 0.85);

            const newImageItem: MachineGalleryImage = {
              id: `upload-${Date.now()}-${i}`,
              url: optimizedWebpUrl,
              alt_en: `${name || "Knitting machine"} technical view`,
              alt_bn: `${name_bn || "নিটিং মেশিন"} কারিগরি ছবি`,
              isPrimary: gallery.length === 0,
            };

            setGallery((prev) => [...prev, newImageItem]);
            showToast(`Optimized & added "${file.name}" as WebP`, "success");
          };
          img.src = uploadEvent.target?.result as string;
        };
        reader.readAsDataURL(file);
      } catch (err) {
        showToast(`Failed to process ${file.name}`, "error");
      }
    }
  };

  const handleSetPrimary = (index: number) => {
    setGallery((prev) =>
      prev.map((item, idx) => ({
        ...item,
        isPrimary: idx === index,
      }))
    );
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= gallery.length) return;
    const updated = [...gallery];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setGallery(updated);
  };

  const handleDeleteImage = (index: number) => {
    if (gallery.length <= 1) {
      showToast("A machine must have at least one image in its gallery.", "error");
      return;
    }
    const updated = gallery.filter((_, idx) => idx !== index);
    if (gallery[index].isPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    setGallery(updated);
  };

  const handleUpdateAltText = (index: number, lang: "en" | "bn", val: string) => {
    setGallery((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        return lang === "en" ? { ...item, alt_en: val } : { ...item, alt_bn: val };
      })
    );
  };

  // Feature Checklist Handlers
  const handleAddFeature = (lang: "en" | "bn") => {
    if (lang === "en") setFeatures((prev) => [...prev, ""]);
    else setFeaturesBn((prev) => [...prev, ""]);
  };

  const handleUpdateFeature = (index: number, lang: "en" | "bn", val: string) => {
    if (lang === "en") {
      setFeatures((prev) => prev.map((f, idx) => (idx === index ? val : f)));
    } else {
      setFeaturesBn((prev) => prev.map((f, idx) => (idx === index ? val : f)));
    }
  };

  const handleRemoveFeature = (index: number, lang: "en" | "bn") => {
    if (lang === "en") setFeatures((prev) => prev.filter((_, idx) => idx !== index));
    else setFeaturesBn((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Save Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Machine Name (English) is required.", "error");
      return;
    }
    if (!id.trim()) {
      showToast("URL Slug is required.", "error");
      return;
    }

    // Validate Alt text on all gallery images
    const missingAlt = gallery.find((g) => !g.alt_en || !g.alt_en.trim());
    if (missingAlt) {
      showToast("Every gallery image must have required English Alt Text for SEO & Accessibility.", "error");
      return;
    }

    // Slug uniqueness check
    const existing = AdminStore.getMachineById(id.trim());
    if (existing && (!isEditing || existing.id !== originalId)) {
      showToast(`The slug "${id}" is already used by another machine. Please provide a unique slug.`, "error");
      return;
    }

    const cleanedFeatures = features.filter((f) => f.trim() !== "");
    const cleanedFeaturesBn = features_bn.filter((f) => f.trim() !== "");
    const cleanedAppTags = applicationTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const cleanedAppTagsBn = applicationTagsBn
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const finalCategory: MachineCategory =
      mainCategory === "circular-knitting" ? subCategory : mainCategory;

    const savedMachine: Machine = {
      id: id.trim(),
      name: name.trim(),
      name_bn: name_bn.trim() || undefined,
      brand: brand.trim() || "Tasneem Machinery",
      manufacturer: manufacturer.trim() || "Overseas Manufacturer",
      machineType: machineType.trim(),
      category: finalCategory,
      mainCategory,
      subCategory: mainCategory === "circular-knitting" ? subCategory : undefined,
      cylinderDiameter: cylinderDiameter.trim() || undefined,
      gauge: gauge.trim() || undefined,
      feeders: feeders ? parseInt(feeders, 10) : undefined,
      numberOfSystems: numberOfSystems ? parseInt(numberOfSystems, 10) : undefined,
      machineSpeed: machineSpeed.trim() || undefined,
      fabricType: fabricType.trim() || undefined,
      fabricType_bn: fabricType_bn.trim() || undefined,
      productionCapacity: productionCapacity.trim() || undefined,
      powerRequirement: powerRequirement.trim() || undefined,
      dimensions: dimensions.trim() || undefined,
      weight: weight.trim() || undefined,
      origin: origin.trim() || "Overseas Import",
      warranty: warranty.trim() || undefined,
      availability,
      price: price ? parseFloat(price) : undefined,
      description: description.trim() || "Contact for details",
      description_bn: description_bn.trim() || undefined,
      features: cleanedFeatures,
      features_bn: cleanedFeaturesBn.length > 0 ? cleanedFeaturesBn : undefined,
      application: cleanedAppTags.length > 0 ? cleanedAppTags : ["Circular Knitting"],
      application_bn: cleanedAppTagsBn.length > 0 ? cleanedAppTagsBn : undefined,
      images: gallery.map((g) => g.url),
      galleryImages: gallery,
      status,
      seoTitle_en: seoTitle_en.trim() || undefined,
      seoTitle_bn: seoTitle_bn.trim() || undefined,
      seoDesc_en: seoDesc_en.trim() || undefined,
      seoDesc_bn: seoDesc_bn.trim() || undefined,
    };

    AdminStore.saveMachine(savedMachine, isEditing ? originalId : undefined, isEditing ? originalCategory : undefined);

    if (isEditing && (originalId !== id || originalCategory !== finalCategory)) {
      showToast(`Machine saved! Automatic 301 redirect created from old URL to new slug.`, "success");
    } else {
      showToast(`Machine "${savedMachine.name}" saved successfully!`, "success");
    }

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-[#F4F5F9]/95 backdrop-blur-md border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF0000]">
              {isEditing ? "Modify Machinery" : "Add New Machinery"}
            </span>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
              {name || "Untitled Machine"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Status Switcher */}
          <div className="flex items-center rounded-xl bg-slate-200/80 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                status === "published"
                  ? "bg-white text-emerald-700 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Published
            </button>
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                status === "draft"
                  ? "bg-white text-amber-700 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Save as Draft
            </button>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? "Save & Publish Changes" : "Create Machine"}</span>
          </button>
        </div>
      </div>

      {/* Bilingual Tab Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400 ml-2" />
          <span className="text-xs font-bold text-slate-700">Content Language Mode:</span>
          <span className="text-xs text-slate-400">Switch tabs to configure English & Bengali texts</span>
        </div>

        <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveLang("en")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeLang === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500"
            }`}
          >
            English (Primary)
          </button>
          <button
            type="button"
            onClick={() => setActiveLang("bn")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeLang === "bn" ? "bg-white text-[#FF0000] shadow-xs" : "text-slate-500"
            }`}
          >
            বাংলা (Bengali)
          </button>
        </div>
      </div>

      {/* 1. Identity & Classification */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Machine Identity & Classification</h2>
            <p className="text-xs text-slate-500">Core brand, model, and category mapping.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Machine Name ({activeLang === "en" ? "English" : "বাংলা"}) <span className="text-red-500">*</span>
            </label>
            {activeLang === "en" ? (
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jiunn Long Double Jersey High-Speed Circular Knitting Machine"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white font-semibold"
              />
            ) : (
              <input
                type="text"
                value={name_bn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="যেমন: জিউন লং ডাবল জার্সি হাই-স্পিড সার্কুলার নিটিং মেশিন"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white font-semibold"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Brand / Make <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Jiunn Long, Rongxiang, Shanli"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Manufacturer Company
            </label>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="e.g. Jiunn Long Precision Machinery Co., Ltd."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white"
            />
          </div>

          {/* Step 1: Main Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Step 1: Primary Machinery Category <span className="text-red-500">*</span>
            </label>
            <select
              value={mainCategory}
              onChange={(e) => setMainCategory(e.target.value as MainCategory)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white font-medium"
            >
              {MAIN_CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} {c.name_bn ? `(${c.name_bn})` : ""}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Select one of the 5 top-level industrial machinery categories.
            </p>
          </div>

          {/* Step 2: Knitting Sub-Category (conditional) */}
          {mainCategory === "circular-knitting" ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Step 2: Circular Knitting Sub-Category <span className="text-red-500">*</span>
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value as CircularKnittingSubCategory)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white font-medium"
              >
                {CIRCULAR_SUB_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name} ({c.typicalGauge})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Knitting technology classification (Double Jersey, Single Jersey, Interlock, etc.).
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Step 2: Sub-Category
              </label>
              <div className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-500 italic">
                Direct category — no sub-category needed for{" "}
                {MAIN_CATEGORIES.find((c) => c.slug === mainCategory)?.name || mainCategory}.
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Machine Sub-Type
            </label>
            <input
              type="text"
              value={machineType}
              onChange={(e) => setMachineType(e.target.value)}
              placeholder="e.g. 4-Track High Speed, Rib Interlock Dual System"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* 2. Technical Specifications (All Optional with Fallback) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Technical Specifications</h2>
              <p className="text-xs text-slate-500">
                Unfilled fields will safely render &quot;Contact for details&quot; on the public catalog.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Cylinder Diameter (inches)
            </label>
            <input
              type="text"
              value={cylinderDiameter}
              onChange={(e) => setCylinderDiameter(e.target.value)}
              placeholder='e.g. 34" (or 30" – 38")'
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Gauge Range (G)
            </label>
            <input
              type="text"
              value={gauge}
              onChange={(e) => setGauge(e.target.value)}
              placeholder="e.g. 24G – 28G"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Feeder Count (F)
            </label>
            <input
              type="number"
              value={feeders}
              onChange={(e) => setFeeders(e.target.value)}
              placeholder="e.g. 96 or 102"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Number of Systems
            </label>
            <input
              type="number"
              value={numberOfSystems}
              onChange={(e) => setNumberOfSystems(e.target.value)}
              placeholder="e.g. 4"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Machine Speed (RPM)
            </label>
            <input
              type="text"
              value={machineSpeed}
              onChange={(e) => setMachineSpeed(e.target.value)}
              placeholder="e.g. 24 – 32 RPM"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Fabric Type ({activeLang === "en" ? "EN" : "BN"})
            </label>
            {activeLang === "en" ? (
              <input
                type="text"
                value={fabricType}
                onChange={(e) => setFabricType(e.target.value)}
                placeholder="e.g. Plain Single Jersey, Pique, Lycra"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
              />
            ) : (
              <input
                type="text"
                value={fabricType_bn}
                onChange={(e) => setFabricTypeBn(e.target.value)}
                placeholder="যেমন: সিঙ্গেল জার্সি, পোলো পিক, লাইক্রা"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Production Capacity
            </label>
            <input
              type="text"
              value={productionCapacity}
              onChange={(e) => setProductionCapacity(e.target.value)}
              placeholder="e.g. 400 – 480 kg / 24 hrs"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Power Requirement
            </label>
            <input
              type="text"
              value={powerRequirement}
              onChange={(e) => setPowerRequirement(e.target.value)}
              placeholder="e.g. 5.5 kW Inverter Motor, 380V"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Dimensions & Weight
            </label>
            <input
              type="text"
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. 2400 × 2200 × 2600 mm, 2800 kg"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Country of Origin
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Taiwan / China Import (Direct Overseas Manufacturer)"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>
        </div>
      </div>

      {/* 3. Commercial Pricing & Inventory Availability */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Commercial Terms & Pricing</h2>
            <p className="text-xs text-slate-500">Commercial pricing remains optional and displays CFR quote upon request by default.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Commercial Price (USD CFR Chattogram)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Leave blank for 'Quote upon request'"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              If left blank, shows &quot;Quote Upon Request (CFR Chattogram)&quot;
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Stock Availability <span className="text-red-500">*</span>
            </label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value as MachineAvailability)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            >
              <option value="in-stock">In Stock (Prompt Shipment)</option>
              <option value="made-to-order">Made to Order (30–45 days)</option>
              <option value="contact-for-availability">Contact for details</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Warranty & Local Support
            </label>
            <input
              type="text"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="e.g. 1 Year Manufacturer + Local Technician Support"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>
        </div>
      </div>

      {/* 4. Multi-Image Gallery Manager with Auto-Optimize */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Multi-Image Gallery Manager</h2>
              <p className="text-xs text-slate-500">
                Reorderable gallery with primary cover selection and client-side WebP auto-optimization.
              </p>
            </div>
          </div>

          {/* Upload Button */}
          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Photos (WebP Auto-optimized)</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Images List */}
        <div className="space-y-3">
          {gallery.map((img, idx) => (
            <div
              key={img.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                img.isPrimary ? "bg-red-50/20 border-red-200 shadow-2xs" : "bg-slate-50/60 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                  <Image src={img.url} alt={img.alt_en} fill className="object-cover" />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">Photo #{idx + 1}</span>
                    {img.isPrimary ? (
                      <span className="text-[10px] font-bold bg-[#FF0000] text-white px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-white" />
                        <span>Primary Cover Image</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(idx)}
                        className="text-[10px] font-semibold text-slate-500 hover:text-[#FF0000] underline cursor-pointer"
                      >
                        Set as Cover
                      </button>
                    )}
                  </div>

                  {/* Required Alt text input */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Alt text:</span>
                    <input
                      type="text"
                      required
                      value={activeLang === "en" ? img.alt_en : img.alt_bn || ""}
                      onChange={(e) => handleUpdateAltText(idx, activeLang, e.target.value)}
                      placeholder={`Required ${activeLang.toUpperCase()} image description for SEO`}
                      className="text-xs p-1 px-2 rounded-lg bg-white border border-slate-200 w-full sm:w-72 focus:outline-none focus:border-[#FF0000]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveImage(idx, "up")}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5 text-slate-600" />
                </button>
                <button
                  type="button"
                  disabled={idx === gallery.length - 1}
                  onClick={() => handleMoveImage(idx, "down")}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5 text-slate-600" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteImage(idx)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 cursor-pointer ml-2"
                  title="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Bilingual Content (Description & Features) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
            5
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Bilingual Content & Engineering Features ({activeLang === "en" ? "English" : "বাংলা"})
            </h2>
            <p className="text-xs text-slate-500">
              Detailed machine description and checklist of mechanical/operational features.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Overview Description ({activeLang === "en" ? "English" : "বাংলা"})
          </label>
          {activeLang === "en" ? (
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe machine performance, cam metallurgy, and factory reliability..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white leading-relaxed"
            />
          ) : (
            <textarea
              rows={4}
              value={description_bn}
              onChange={(e) => setDescriptionBn(e.target.value)}
              placeholder="মেশিনের কার্যক্ষমতা, ক্যাম বক্সের নির্ভুলতা এবং কারখানা ব্যবহারের উপযোগী বিবরণ লিখুন..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000] focus:bg-white leading-relaxed"
            />
          )}
        </div>

        {/* Feature List */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Engineering Features Checklist ({activeLang === "en" ? "English" : "বাংলা"})
            </label>
            <button
              type="button"
              onClick={() => handleAddFeature(activeLang)}
              className="text-xs font-bold text-[#FF0000] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="space-y-2">
            {(activeLang === "en" ? features : features_bn).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleUpdateFeature(idx, activeLang, e.target.value)}
                  placeholder={`Feature bullet #${idx + 1}`}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx, activeLang)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Applications */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Target Fabric Applications (Comma-separated)
          </label>
          {activeLang === "en" ? (
            <input
              type="text"
              value={applicationTags}
              onChange={(e) => setApplicationTags(e.target.value)}
              placeholder="e.g. Export T-Shirts, Polo Shirts, Thermal Underwear, Sportswear"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          ) : (
            <input
              type="text"
              value={applicationTagsBn}
              onChange={(e) => setApplicationTagsBn(e.target.value)}
              placeholder="যেমন: টি-শার্ট, পোলো শার্ট, ইনারওয়্যার, স্পোর্টসওয়্যার"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          )}
        </div>
      </div>

      {/* 6. URL Slug & Automatic 301 Redirect Protection */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
            6
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">URL Slug & 301 Redirect Protection</h2>
            <p className="text-xs text-slate-500">
              Clean SEO URLs with automatic permanent 301 redirect creation on slug edit.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Machine URL Slug <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono bg-slate-100 px-3 py-2.5 rounded-xl border border-slate-200">
              /machines/{currentCategory}/
            </span>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => {
                setId(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"));
                setSlugOverridden(true);
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-[#FF0000]"
            />
          </div>

          {isEditing && originalId && originalId !== id && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Automatic 301 Permanent Redirect Will Be Created:</strong>
                <span>
                  Old URL <code>/machines/{originalCategory}/{originalId}</code> will automatically permanently redirect to{" "}
                  <code>/machines/{currentCategory}/{id}</code> upon saving, preserving search rankings and bookmarked quotes.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 7. Per-Product SEO Settings */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center font-bold">
            7
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Per-Product SEO & Social Meta</h2>
            <p className="text-xs text-slate-500">
              Custom titles and meta descriptions for search engines and social sharing.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              SEO Title Tag ({activeLang === "en" ? "EN" : "BN"})
            </label>
            {activeLang === "en" ? (
              <input
                type="text"
                value={seoTitle_en}
                onChange={(e) => setSeoTitleEn(e.target.value)}
                placeholder={`${name} | Tasneem Knit Industry`}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
              />
            ) : (
              <input
                type="text"
                value={seoTitle_bn}
                onChange={(e) => setSeoTitleBn(e.target.value)}
                placeholder={`${name_bn || name} | তাসনীম নিট ইন্ডাস্ট্রি`}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Meta Description ({activeLang === "en" ? "EN" : "BN"})
            </label>
            {activeLang === "en" ? (
              <textarea
                rows={2}
                value={seoDesc_en}
                onChange={(e) => setSeoDescEn(e.target.value)}
                placeholder="Direct overseas import of circular knitting machines in Bangladesh. CFR Chattogram delivery..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
              />
            ) : (
              <textarea
                rows={2}
                value={seoDesc_bn}
                onChange={(e) => setSeoDescBn(e.target.value)}
                placeholder="বাংলাদেশে সার্কুলার নিটিং মেশিন সরাসরি আমদানি ও সিএফআর চট্টগ্রাম ডেলিভারি..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#FF0000]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? "Save & Publish Changes" : "Create & Publish Machine"}</span>
        </button>
      </div>
    </form>
  );
}
