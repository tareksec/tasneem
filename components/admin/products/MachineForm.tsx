"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  ArrowLeft,
  ArrowRight,
  Upload,
  Trash2,
  MoveLeft,
  MoveRight,
  Star,
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
  HelpCircle,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Check,
  Eye,
  Camera,
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

// Visual category options for friendly 1-click selection
const CATEGORY_CARDS = [
  { id: "double-jersey", main: "circular-knitting", sub: "double-jersey", name: "Double Jersey Circular", nameBn: "ডাবল জার্সি সার্কুলার", desc: "For interlock, rib, and structured double-sided knit fabric" },
  { id: "single-jersey", main: "circular-knitting", sub: "single-jersey", name: "Single Jersey Circular", nameBn: "সিঙ্গেল জার্সি সার্কুলার", desc: "High-speed machine for t-shirt fabric, pique & fleece" },
  { id: "interlock", main: "circular-knitting", sub: "interlock", name: "Interlock Circular", nameBn: "ইন্টারলক সার্কুলার", desc: "High-precision 8-lock machine for smooth, dense fabrics" },
  { id: "jacquard", main: "circular-knitting", sub: "jacquard", name: "Electronic Jacquard", nameBn: "ইলেকট্রনিক জ্যাকার্ড", desc: "Computerized needle selection for complex fabric patterns" },
  { id: "terry", main: "circular-knitting", sub: "terry", name: "Terry & Fleece Circular", nameBn: "টেরি ও ফ্লিস সার্কুলার", desc: "High-pile loop and fleece circular knitting machine" },
  { id: "dyeing", main: "dyeing", sub: undefined, name: "Fabric Dyeing Machine", nameBn: "ফ্যাব্রিক ডাইং মেশিন", desc: "High-temperature eco-friendly fabric dyeing vessel" },
  { id: "shearing", main: "shearing", sub: undefined, name: "Shearing Machine", nameBn: "শিয়ারিং মেশিন", desc: "Precision rotary fabric surface cutting and finishing" },
  { id: "finishing", main: "finishing", sub: undefined, name: "Finishing & Compactor", nameBn: "ফিনিশিং ও কম্প্যাক্টর", desc: "Tensionless inspection, opening and finishing line" },
];

export function MachineForm({ initialMachine, isEditing = false }: MachineFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active step: 1: Basics, 2: Technical Specs, 3: Photos, 4: Pricing & Publish
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Inline Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Success Modal State
  const [successData, setSuccessData] = useState<{ id: string; category: string; name: string } | null>(null);

  // Active language tab for bilingual text inputs
  const [activeLang, setActiveLang] = useState<"en" | "bn">("en");

  // Track original slug/category for 301 redirect creation
  const originalId = initialMachine?.id || "";
  const originalCategory = initialMachine?.category || "double-jersey";

  // Helpers to resolve initial categories
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

  // Basic Information State
  const [id, setId] = useState(initialMachine?.id || "");
  const [slugOverridden, setSlugOverridden] = useState(false);
  const [name, setName] = useState(initialMachine?.name || "");
  const [name_bn, setNameBn] = useState(initialMachine?.name_bn || "");
  const [brand, setBrand] = useState(initialMachine?.brand || "Jiunn Long");
  const [manufacturer, setManufacturer] = useState(initialMachine?.manufacturer || "Precision Machinery Co., Ltd.");
  const [mainCategory, setMainCategory] = useState<MainCategory>(getInitialMainCategory(initialMachine));
  const [subCategory, setSubCategory] = useState<CircularKnittingSubCategory>(getInitialSubCategory(initialMachine));
  const [machineType, setMachineType] = useState(
    initialMachine?.machineType || "Double Jersey Circular Knitting Machine"
  );
  const [origin, setOrigin] = useState(initialMachine?.origin || "Taiwan / China");
  const [description, setDescription] = useState(initialMachine?.description || "");
  const [description_bn, setDescriptionBn] = useState(initialMachine?.description_bn || "");

  // Technical Specifications State
  const [cylinderDiameter, setCylinderDiameter] = useState(initialMachine?.cylinderDiameter || '34"');
  const [gauge, setGauge] = useState(initialMachine?.gauge || "28G");
  const [feeders, setFeeders] = useState<string>(
    initialMachine?.feeders !== undefined ? String(initialMachine.feeders) : "84"
  );
  const [machineSpeed, setMachineSpeed] = useState(initialMachine?.machineSpeed || "18–24 RPM");
  const [productionCapacity, setProductionCapacity] = useState(initialMachine?.productionCapacity || "350–500 kg / 24 hours");
  const [numberOfSystems, setNumberOfSystems] = useState<string>(
    initialMachine?.numberOfSystems !== undefined ? String(initialMachine.numberOfSystems) : "4"
  );
  const [powerRequirement, setPowerRequirement] = useState(initialMachine?.powerRequirement || "5.5 kW / 7.5 HP Inverter");
  const [dimensions, setDimensions] = useState(initialMachine?.dimensions || "2.6m × 2.4m × 2.2m");
  const [weight, setWeight] = useState(initialMachine?.weight || "2,850 kg");
  const [fabricType, setFabricType] = useState(initialMachine?.fabricType || "100% Cotton Rib, Interlock, Lycra Spandex");
  const [fabricType_bn, setFabricTypeBn] = useState(initialMachine?.fabricType_bn || "১০০% কটন রিব, ইন্টারলক, লাইক্রা স্প্যানডেক্স");

  // Custom Extra Specifications List
  const [customSpecs, setCustomSpecs] = useState<{ label: string; value: string }[]>([]);

  // Commercial & Warranty State
  const [price, setPrice] = useState<string>(
    initialMachine?.price !== undefined ? String(initialMachine.price) : ""
  );
  const [availability, setAvailability] = useState<MachineAvailability>(
    initialMachine?.availability || "made-to-order"
  );
  const [warranty, setWarranty] = useState(
    initialMachine?.warranty || "1 Year International Manufacturer Warranty + Local Technician Support from Narayanganj"
  );

  // Key Selling Features Checklist
  const [features, setFeatures] = useState<string[]>(
    initialMachine?.features && initialMachine.features.length > 0
      ? initialMachine.features
      : [
          "Direct CFR Chattogram sea shipment with zero middleman markups",
          "Includes Groz-Beckert needles and positive storage yarn feeders",
          "On-site factory leveling, cam setting, and high-RPM trial run included",
          "Ready stock of replacement parts available at BSCIC Narayanganj hub",
        ]
  );
  const [features_bn, setFeaturesBn] = useState<string[]>(
    initialMachine?.features_bn && initialMachine.features_bn.length > 0
      ? initialMachine.features_bn
      : [
          "সিএফআর চট্টগ্রাম পোর্ট শিপমেন্ট এবং কোনো বাড়তি দালাল কমিশন নেই",
          "আসল গ্রোজ-বেকার্ট নিডল ও পজিটিভ ইয়ার্ন ফিডার অন্তর্ভুক্ত",
          "আপনার মিলে অন-সাইট লেভেলিং, ক্যাম সেটিং ও ফ্যাব্রিক ট্রায়াল অন্তর্ভুক্ত",
          "বিসিক নারায়ণগঞ্জ ওয়্যারহাউসে সার্বক্ষণিক স্পেয়ার পার্টস স্টক",
        ]
  );

  // Status (Draft vs Published)
  const [status, setStatus] = useState<"published" | "draft">(
    initialMachine?.status || "published"
  );

  // SEO Fields (Auto-filled)
  const [seoTitle_en, setSeoTitleEn] = useState(initialMachine?.seoTitle_en || "");
  const [seoTitle_bn, setSeoTitleBn] = useState(initialMachine?.seoTitle_bn || "");
  const [seoDesc_en, setSeoDescEn] = useState(initialMachine?.seoDesc_en || "");
  const [seoDesc_bn, setSeoDescBn] = useState(initialMachine?.seoDesc_bn || "");

  // Gallery Images State
  const [gallery, setGallery] = useState<MachineGalleryImage[]>(
    initialMachine?.galleryImages && initialMachine.galleryImages.length > 0
      ? initialMachine.galleryImages
      : (initialMachine?.images || ["/images/machines/cat-double-jersey.jpg"]).map((url, idx) => ({
          id: `img-${idx}`,
          url,
          alt_en: `${initialMachine?.name || "Industrial Machine"} view ${idx + 1}`,
          alt_bn: `${initialMachine?.name_bn || "ইন্ডাস্ট্রিয়াল মেশিন"} ছবি ${idx + 1}`,
          isPrimary: idx === 0,
        }))
  );

  // Drag-and-drop state
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Auto-generate slug from name if new
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

  // Category card click handler
  const handleSelectCategory = (cat: typeof CATEGORY_CARDS[0]) => {
    setMainCategory(cat.main as MainCategory);
    if (cat.sub) {
      setSubCategory(cat.sub as CircularKnittingSubCategory);
    }
    setMachineType(cat.name);
    // Clear category error if present
    if (errors.category) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.category;
        return next;
      });
    }
  };

  // Image Processing (Drag-and-Drop or File Input)
  const processFiles = (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        showToast(`Skipped ${file.name} because it is not an image.`, "error");
        continue;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1400;
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
          const optimizedWebp = canvas.toDataURL("image/webp", 0.85);

          const newImage: MachineGalleryImage = {
            id: `upload-${Date.now()}-${i}`,
            url: optimizedWebp,
            alt_en: `${name || "Knitting machine"} technical view`,
            alt_bn: `${name_bn || "নিটিং মেশিন"} কারিগরি ছবি`,
            isPrimary: gallery.length === 0,
          };

          setGallery((prev) => [...prev, newImage]);
          showToast(`Added and optimized "${file.name}"`, "success");
        };
        img.src = uploadEvent.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleSetPrimary = (index: number) => {
    setGallery((prev) =>
      prev.map((item, idx) => ({
        ...item,
        isPrimary: idx === index,
      }))
    );
    showToast("Main cover photo updated", "info");
  };

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const targetIdx = direction === "left" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= gallery.length) return;
    const updated = [...gallery];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setGallery(updated);
  };

  const handleDeleteImage = (index: number) => {
    if (gallery.length <= 1) {
      showToast("Please keep at least one image for the catalog.", "error");
      return;
    }
    const updated = gallery.filter((_, idx) => idx !== index);
    if (gallery[index]?.isPrimary && updated.length > 0) {
      updated[0].isPrimary = true;
    }
    setGallery(updated);
  };

  // Custom spec repeater handlers
  const handleAddCustomSpec = () => {
    setCustomSpecs((prev) => [...prev, { label: "", value: "" }]);
  };

  const handleUpdateCustomSpec = (index: number, field: "label" | "value", val: string) => {
    setCustomSpecs((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [field]: val } : spec))
    );
  };

  const handleRemoveCustomSpec = (index: number) => {
    setCustomSpecs((prev) => prev.filter((_, i) => i !== index));
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

  // Step Validation
  const validateCurrentStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!name.trim()) {
        newErrors.name = "Machine Name (English) is required.";
      }
      if (!id.trim()) {
        newErrors.id = "URL Link identifier is required.";
      }
    }

    if (stepNumber === 3) {
      if (gallery.length === 0) {
        newErrors.gallery = "Please upload at least one image of the machine.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep(currentStep)) {
      setCurrentStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
      window.scrollTo({ top: 80, behavior: "smooth" });
    } else {
      showToast("Please check the required fields highlighted in red.", "error");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  // Save Submission
  const handleSave = (publishStatus: "published" | "draft") => {
    // Validate required fields
    if (!name.trim()) {
      setCurrentStep(1);
      setErrors({ name: "Machine Name is required before saving." });
      showToast("Please provide a Machine Name.", "error");
      return;
    }

    const finalCategory: MachineCategory =
      mainCategory === "circular-knitting" ? subCategory : mainCategory;

    // Check slug uniqueness
    const existing = AdminStore.getMachineById(id.trim());
    if (existing && (!isEditing || existing.id !== originalId)) {
      setCurrentStep(1);
      setErrors({ id: `The link "${id}" is already used by another machine.` });
      showToast("This web link is already used. Please change the machine name or custom slug.", "error");
      return;
    }

    const cleanedFeatures = features.filter((f) => f.trim() !== "");
    const cleanedFeaturesBn = features_bn.filter((f) => f.trim() !== "");

    // Add custom specs to features note if present
    const customSpecNotes = customSpecs
      .filter((s) => s.label.trim() && s.value.trim())
      .map((s) => `${s.label}: ${s.value}`);
    const mergedFeatures = [...cleanedFeatures, ...customSpecNotes];

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
      description: description.trim() || "Industrial knitting machine imported directly from primary builders.",
      description_bn: description_bn.trim() || undefined,
      features: mergedFeatures,
      features_bn: cleanedFeaturesBn.length > 0 ? cleanedFeaturesBn : undefined,
      application: ["Export Knitwear", "Circular Knitting"],
      images: gallery.map((g) => g.url),
      galleryImages: gallery,
      status: publishStatus,
      seoTitle_en: seoTitle_en.trim() || `${name} | Tasneem Knit Industry`,
      seoTitle_bn: seoTitle_bn.trim() || `${name_bn || name} | তাসনীম নিট ইন্ডাস্ট্রি`,
      seoDesc_en: seoDesc_en.trim() || `${name} imported directly with CFR Chattogram delivery and Bangladesh factory commissioning.`,
      seoDesc_bn: seoDesc_bn.trim() || undefined,
    };

    AdminStore.saveMachine(savedMachine, isEditing ? originalId : undefined, isEditing ? originalCategory : undefined);

    showToast(
      publishStatus === "published"
        ? `"${savedMachine.name}" is now live on your catalog!`
        : `"${savedMachine.name}" saved as draft.`,
      "success"
    );

    // Show friendly success confirmation dialog
    setSuccessData({
      id: savedMachine.id,
      category: finalCategory,
      name: savedMachine.name,
    });
  };

  const handleResetForNew = () => {
    setSuccessData(null);
    setName("");
    setNameBn("");
    setId("");
    setSlugOverridden(false);
    setDescription("");
    setDescriptionBn("");
    setCustomSpecs([]);
    setGallery([]);
    setCurrentStep(1);
    setErrors({});
  };

  return (
    <div className="space-y-6 pb-20 select-none">
      {/* 1. Top Breadcrumb & Actions Bar */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Back to Machine Inventory"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/admin/products" className="hover:text-[#800020] transition-colors">
                Machines
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-900 font-semibold">
                {isEditing ? "Edit Machine" : "Add Machine"}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {name || "Untitled Machine Listing"}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="px-4 py-2 min-h-[40px] rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            className="inline-flex items-center gap-2 px-5 py-2 min-h-[40px] rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? "Save & Update Live" : "Publish Machine"}</span>
          </button>
        </div>
      </div>

      {/* 2. Step Progress Navigation Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {[
            { num: 1, label: "Basic Information", desc: "Name & Category", icon: Layers },
            { num: 2, label: "Specifications", desc: "Gauge, RPM, Diameter", icon: Cpu },
            { num: 3, label: "Machine Photos", desc: "Gallery & Cover Photo", icon: Camera },
            { num: 4, label: "Pricing & Features", desc: "Warranty & Highlights", icon: ShieldCheck },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isCompleted = currentStep > s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (validateCurrentStep(currentStep) || s.num < currentStep) {
                    setCurrentStep(s.num as 1 | 2 | 3 | 4);
                  }
                }}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FDF2F4] border-[#800020] ring-1 ring-[#800020]"
                    : isCompleted
                    ? "bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50"
                    : "bg-slate-50/50 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                    isActive
                      ? "bg-[#800020] text-white"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <div className="min-w-0">
                  <p className={`text-xs font-bold leading-tight truncate ${isActive ? "text-[#800020]" : "text-slate-900"}`}>
                    {s.label}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                    {s.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Step Contents */}

      {/* ========================================================================= */}
      {/* STEP 1: Basic Information & Category Selection */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6">
          {/* Section 1A: Machine Name & Language Switcher */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Step 1: Machine Name & Identification
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Give your machine a clear, identifiable name. You can provide both English and Bangla titles.
                </p>
              </div>

              {/* Language Switch Pills */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-bold shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveLang("en")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeLang === "en" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang("bn")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeLang === "bn" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500"
                  }`}
                >
                  🇧🇩 বাংলা
                </button>
              </div>
            </div>

            {/* Name Inputs */}
            {activeLang === "en" ? (
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Machine Model Name (English) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  placeholder="e.g. Jiunn Long High-Speed Double Jersey Circular Knitting Machine"
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none transition-all ${
                    errors.name
                      ? "border-rose-400 bg-rose-50/30 focus:border-rose-600"
                      : "border-slate-200 focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                  }`}
                />
                {errors.name ? (
                  <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tip: Include brand, key model, and machine type so mill buyers can easily recognize it.
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  মেশিনের নাম (বাংলা)
                </label>
                <input
                  type="text"
                  value={name_bn}
                  onChange={(e) => setNameBn(e.target.value)}
                  placeholder="উদাঃ জিউন লং হাই-স্পিড ডাবল জার্সি সার্কুলার নিটিং মেশিন"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  বাংলা ওয়েবসাইটে মিল মালিক ও টেকনিশিয়ানদের পড়ার সুবিধার জন্য এটি প্রদর্শিত হবে।
                </p>
              </div>
            )}

            {/* Brand, Manufacturer & Country of Origin in 3-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Jiunn Long / Rongxiang"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Displayed on machine badge</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Manufacturer / Factory
                </label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder="e.g. Precision Machinery Ltd"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Primary building facility</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Country of Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Taiwan / China Import"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-400 mt-1">Shown in commercial specs</p>
              </div>
            </div>

            {/* URL Link (Slug) */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Web Address Link (Slug)
                </label>
                {!slugOverridden && (
                  <button
                    type="button"
                    onClick={() => setSlugOverridden(true)}
                    className="text-[11px] text-[#800020] hover:underline font-semibold"
                  >
                    Edit custom link
                  </button>
                )}
              </div>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-mono text-slate-600">
                <span className="text-slate-400 mr-1 select-none">/machines/{mainCategory === "circular-knitting" ? subCategory : mainCategory}/</span>
                <input
                  type="text"
                  value={id}
                  disabled={!slugOverridden && !isEditing}
                  onChange={(e) => {
                    setId(e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, "-"));
                    setSlugOverridden(true);
                  }}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none w-full"
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Automatically created from the machine name. This is the link buyers use to visit this page.
              </p>
            </div>
          </div>

          {/* Section 1B: Visual Category Selector */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Choose Machinery Category
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select where this machine appears on your website catalog:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CATEGORY_CARDS.map((cat) => {
                const isSelected =
                  cat.main === mainCategory &&
                  (cat.main !== "circular-knitting" || cat.sub === subCategory);

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FDF2F4] border-[#800020] ring-1 ring-[#800020] shadow-xs"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isSelected ? "bg-[#800020] text-white" : "bg-slate-200 text-slate-600"
                        }`}>
                          {cat.main === "circular-knitting" ? "Knitting" : "Finishing"}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#800020]" />}
                      </div>
                      <h4 className={`text-xs font-bold ${isSelected ? "text-[#800020]" : "text-slate-900"}`}>
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 1C: Brief Machine Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Overview Description (Optional)
            </h3>
            <p className="text-xs text-slate-500">
              A short introductory paragraph summarizing what this machine is built for:
            </p>
            <textarea
              rows={3}
              value={activeLang === "en" ? description : description_bn}
              onChange={(e) => {
                if (activeLang === "en") setDescription(e.target.value);
                else setDescriptionBn(e.target.value);
              }}
              placeholder={
                activeLang === "en"
                  ? "e.g. High-efficiency double jersey circular knitting machine engineered for continuous 24-hour mill production of cotton rib, interlock, and lycra fabrics."
                  : "উদাঃ কটন রিব, ইন্টারলক ও লাইক্রা ফ্যাব্রিকের উচ্চ উৎপাদনের জন্য বিশেষভাবে নির্মিত আধুনিক সার্কুলার নিটিং মেশিন।"
              }
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#800020]"
            />
          </div>

          {/* Bottom Next Button */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Next: Technical Specifications</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: Technical Specifications */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Step 2: Technical Specifications Table
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every field has plain-language guidance so mill engineers can see exact machine parameters.
              </p>
            </div>

            {/* Core Machine Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Gauge */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Knitting Gauge (G)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Needle Spacing</span>
                </div>
                <input
                  type="text"
                  value={gauge}
                  onChange={(e) => setGauge(e.target.value)}
                  placeholder="e.g. 24G, 28G, 32G"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Number of needles per inch (e.g. 28G is standard for single/double jersey)</p>
              </div>

              {/* Cylinder Diameter */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Cylinder Diameter
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Inches</span>
                </div>
                <input
                  type="text"
                  value={cylinderDiameter}
                  onChange={(e) => setCylinderDiameter(e.target.value)}
                  placeholder='e.g. 30", 34", 36"'
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Cylinder width in inches (determines finished fabric tube size)</p>
              </div>

              {/* Feeders */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Feeder Count (Feeders)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Yarn Feeds</span>
                </div>
                <input
                  type="text"
                  value={feeders}
                  onChange={(e) => setFeeders(e.target.value)}
                  placeholder="e.g. 72, 84, 96, 108"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Total number of active yarn feeding stations around cylinder</p>
              </div>

              {/* Machine Speed / RPM */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Machine Speed (RPM)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Rotation</span>
                </div>
                <input
                  type="text"
                  value={machineSpeed}
                  onChange={(e) => setMachineSpeed(e.target.value)}
                  placeholder="e.g. 18–24 RPM (or up to 28 RPM)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Rotations per minute under normal factory floor load</p>
              </div>

              {/* Production Capacity */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Production Capacity
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Output Rate</span>
                </div>
                <input
                  type="text"
                  value={productionCapacity}
                  onChange={(e) => setProductionCapacity(e.target.value)}
                  placeholder="e.g. 350–500 kg / 24 hours"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Typical estimated finished fabric output per day</p>
              </div>

              {/* Motor Power Requirement */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Power Requirement
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">kW / HP</span>
                </div>
                <input
                  type="text"
                  value={powerRequirement}
                  onChange={(e) => setPowerRequirement(e.target.value)}
                  placeholder="e.g. 5.5 kW / 7.5 HP (380V, 50Hz)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Main motor drive power rating and factory voltage</p>
              </div>

              {/* Number of Systems / Cam tracks */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Number of Systems / Cam Tracks
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Tracks</span>
                </div>
                <input
                  type="text"
                  value={numberOfSystems}
                  onChange={(e) => setNumberOfSystems(e.target.value)}
                  placeholder="e.g. 4 Cam Tracks on Cylinder, 2 on Dial"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Cam arrangement for knit, tuck, and welt structures</p>
              </div>

              {/* Floor Dimensions */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Dimensions (L × W × H)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Space</span>
                </div>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 2.6m × 2.4m × 2.2m"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Floor space required including creel stand</p>
              </div>

              {/* Equipment Weight */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800">
                    Weight (Net / Gross)
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">Weight</span>
                </div>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 2,850 kg"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-500">Heavy cast-iron base weight for sea freight container</p>
              </div>
            </div>

            {/* Suitable Fabric Types */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Suitable Fabric Applications
              </label>
              <input
                type="text"
                value={activeLang === "en" ? fabricType : fabricType_bn}
                onChange={(e) => {
                  if (activeLang === "en") setFabricType(e.target.value);
                  else setFabricTypeBn(e.target.value);
                }}
                placeholder={
                  activeLang === "en"
                    ? "e.g. 100% Cotton Rib, Interlock, Lycra Spandex, Single Jersey, French Terry"
                    : "উদাঃ ১০০% কটন রিব, ইন্টারলক, লাইক্রা স্প্যানডেক্স, সিঙ্গেল জার্সি, ফ্রেঞ্চ টেরি"
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#800020]"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Listed on the machine page so buyers know exactly what fabrics this machine can knit.
              </p>
            </div>

            {/* Custom Extra Specifications Repeater */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Extra Custom Specifications (Optional)
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Want to add specific components like Inverter brand, oil mist system, or creel type?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddCustomSpec}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Spec Row</span>
                </button>
              </div>

              {customSpecs.length > 0 && (
                <div className="space-y-2 pt-1">
                  {customSpecs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => handleUpdateCustomSpec(i, "label", e.target.value)}
                        placeholder="Spec Name (e.g. Inverter Motor)"
                        className="w-1/3 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => handleUpdateCustomSpec(i, "value", e.target.value)}
                        placeholder="Specification Value (e.g. Delta / Yaskawa Inverter)"
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomSpec(i)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Spec"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Basic Info</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Next: Upload Photos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: Photos & Gallery Upload */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Step 3: Machine Photos & Image Gallery
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Drag and drop photos directly onto this page. The first photo with the gold star is the main cover image shown in catalogs.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto">
                {gallery.length} Photo{gallery.length === 1 ? "" : "s"}
              </span>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                isDraggingOver
                  ? "border-[#800020] bg-[#FDF2F4]"
                  : "border-slate-300 hover:border-slate-400 bg-slate-50/60 hover:bg-slate-50"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-[#800020] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Click to browse or Drag & Drop machine photos here
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Supports JPG, PNG, and WebP. Images are automatically resized and converted to lightweight WebP for lightning-fast loading.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                <Plus className="w-3.5 h-3.5 text-[#800020]" />
                <span>Select from your Computer</span>
              </div>
            </div>

            {errors.gallery && (
              <p className="text-xs text-rose-600 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.gallery}</span>
              </p>
            )}

            {/* Thumbnail Cards Grid */}
            {gallery.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-800">
                  Uploaded Gallery Photos (Click Star to set Main Cover):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      className={`p-3 rounded-xl border bg-white shadow-2xs flex flex-col justify-between transition-all ${
                        img.isPrimary
                          ? "border-[#800020] ring-2 ring-[#800020]/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Image Preview Container */}
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 mb-2.5">
                        <Image
                          src={img.url}
                          alt={img.alt_en || "Machine preview"}
                          fill
                          className="object-cover"
                        />
                        {/* Primary Badge */}
                        {img.isPrimary && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#800020] text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>Main Cover Photo</span>
                          </div>
                        )}
                      </div>

                      {/* Alt text field */}
                      <div className="mb-2">
                        <input
                          type="text"
                          value={img.alt_en || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setGallery((prev) =>
                              prev.map((it, i) => (i === idx ? { ...it, alt_en: val } : it))
                            );
                          }}
                          placeholder="Photo description (e.g. Cylinder cam box view)"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-800 focus:outline-none focus:border-[#800020]"
                        />
                      </div>

                      {/* Photo Actions Toolbar */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveImage(idx, "left")}
                            className="p-1 rounded-md text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                            title="Move Left"
                          >
                            <MoveLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === gallery.length - 1}
                            onClick={() => handleMoveImage(idx, "right")}
                            className="p-1 rounded-md text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                            title="Move Right"
                          >
                            <MoveRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          {!img.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimary(idx)}
                              className="px-2 py-1 rounded-md text-[11px] font-bold text-slate-600 hover:text-[#800020] bg-slate-100 hover:bg-[#FDF2F4] transition-colors cursor-pointer"
                            >
                              Set as Main
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(idx)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Specifications</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <span>Next: Pricing & Warranty</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: Pricing, Warranty & Review */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Commercial & Stock Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                Step 4: Commercial Terms, Warranty & Highlights
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure delivery terms, warranty coverage, and the key selling points shown to buyers.
              </p>
            </div>

            {/* Availability Status Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                Stock & Availability Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "made-to-order",
                    title: "Made to Order",
                    desc: "Fabricated overseas per client specs (Standard 45–60 days)",
                    badge: "Direct Factory Build",
                  },
                  {
                    id: "in-stock",
                    title: "Ready in Stock",
                    desc: "Available for immediate inspection at BSCIC Narayanganj",
                    badge: "Instant Delivery",
                  },
                  {
                    id: "sea-freight",
                    title: "In Transit / Sea Freight",
                    desc: "Shipped from Taiwan/China, arriving at Chattogram Port",
                    badge: "Arriving Soon",
                  },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setAvailability(st.id as MachineAvailability)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      availability === st.id
                        ? "bg-[#FDF2F4] border-[#800020] ring-1 ring-[#800020]"
                        : "bg-slate-50/60 border-slate-200 hover:bg-white"
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5 ${
                        availability === st.id ? "bg-[#800020] text-white" : "bg-slate-200 text-slate-600"
                      }`}>
                        {st.badge}
                      </span>
                      <h4 className={`text-xs font-bold ${availability === st.id ? "text-[#800020]" : "text-slate-900"}`}>
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                        {st.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Warranty in 2 cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  List Price (USD or BDT, Optional)
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Leave blank for 'Price on Request / CFR Chattogram'"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Most B2B clients prefer "Contact for CFR Quotation" so you can offer customized terms.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Warranty & After-Sales Terms
                </label>
                <input
                  type="text"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  placeholder="e.g. 1 Year Manufacturer Warranty + Local Technician Support"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Crucial trust signal for Bangladeshi mill procurement teams.
                </p>
              </div>
            </div>

            {/* Key Features Bullet List */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Key Features & Inclusions (Bullet Points)
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    These appear as checkmark highlights on the machine page:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddFeature(activeLang)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Bullet Point</span>
                </button>
              </div>

              <div className="space-y-2">
                {(activeLang === "en" ? features : features_bn).map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => handleUpdateFeature(i, activeLang, e.target.value)}
                      placeholder="e.g. High-efficiency positive yarn storage feeders included"
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(i, activeLang)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Delete point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility / Draft Switch */}
            <div className="pt-4 border-t border-slate-100 p-4 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Catalog Visibility Status</p>
                <p className="text-[11px] text-slate-500">
                  {status === "published"
                    ? "✓ Published: Visible to all website visitors in the machinery catalog"
                    : "Draft: Hidden from visitors; only you can see it in Admin"}
                </p>
              </div>
              <div className="flex items-center rounded-xl bg-white p-1 border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStatus("published")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    status === "published" ? "bg-[#800020] text-white shadow-2xs" : "text-slate-600"
                  }`}
                >
                  Published
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    status === "draft" ? "bg-amber-600 text-white shadow-2xs" : "text-slate-600"
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
          </div>

          {/* Final Navigation & Submit Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Photos</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleSave("draft")}
                className="px-5 py-2.5 min-h-[44px] rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave("published")}
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isEditing ? "Save & Publish Changes" : "Publish Machine to Catalog"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SUCCESS CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {successData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Machine Successfully Saved!
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                <strong>"{successData.name}"</strong> has been securely recorded. What would you like to do next?
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`/machines/${successData.category}/${successData.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <span>View Machine on Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleResetForNew}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Machine</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/products")}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
              >
                Back to Machine Inventory List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
