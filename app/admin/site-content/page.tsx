"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Building2,
  Factory,
  Sparkles,
  Layers,
  Clock,
  ExternalLink,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import {
  WhyTasneemPillar,
  AdminFaqItem,
  AdminCompanyInfo,
  AdminIndustryItem,
  ContentLocale,
} from "@/lib/admin/types";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Tabs } from "@/components/admin/ui/tabs";
import { Badge } from "@/components/admin/ui/badge";
import { useToast } from "@/components/admin/ui/toast";

export default function SiteContentPage() {
  const { toast } = useToast();
  const { contentLocale, setContentLocale } = useAdminAuth();

  // Active language tab per section (or synced with top bar contentLocale)
  const [whyTasneemLocale, setWhyTasneemLocale] = useState<ContentLocale>(contentLocale);
  const [faqLocale, setFaqLocale] = useState<ContentLocale>(contentLocale);
  const [companyLocale, setCompanyLocale] = useState<ContentLocale>(contentLocale);
  const [industriesLocale, setIndustriesLocale] = useState<ContentLocale>(contentLocale);

  // Synchronize when top bar contentLocale changes
  useEffect(() => {
    if (contentLocale) {
      setWhyTasneemLocale(contentLocale);
      setFaqLocale(contentLocale);
      setCompanyLocale(contentLocale);
      setIndustriesLocale(contentLocale);
    }
  }, [contentLocale]);

  // Section 1: Why Tasneem State
  const [pillars, setPillars] = useState<WhyTasneemPillar[]>([]);
  const [whyTasneemLastSaved, setWhyTasneemLastSaved] = useState<string | null>(null);

  // Section 2: FAQ State
  const [faqs, setFaqs] = useState<AdminFaqItem[]>([]);
  const [faqLastSaved, setFaqLastSaved] = useState<string | null>(null);

  // Section 3: Company Info State
  const [companyInfo, setCompanyInfo] = useState<AdminCompanyInfo | null>(null);
  const [companyLastSaved, setCompanyLastSaved] = useState<string | null>(null);

  // Section 4: Industries State
  const [industries, setIndustries] = useState<AdminIndustryItem[]>([]);
  const [industriesLastSaved, setIndustriesLastSaved] = useState<string | null>(null);

  // Load data from AdminStore
  useEffect(() => {
    setPillars(AdminStore.getWhyTasneem());
    setFaqs(AdminStore.getFaqs());
    setCompanyInfo(AdminStore.getCompanyInfo());
    setIndustries(AdminStore.getIndustries());
  }, []);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  // Section 1 Save Handler: Why Tasneem
  const handleSaveWhyTasneem = () => {
    AdminStore.saveWhyTasneem(pillars);
    const ts = formatTimestamp();
    setWhyTasneemLastSaved(ts);
    toast({
      type: "success",
      message: "Why Tasneem Saved",
      description: `All 4 value pillars updated at ${ts}.`,
    });
  };

  // Section 2 Save Handler: FAQ
  const handleSaveFaq = () => {
    AdminStore.saveFaqs(faqs);
    const ts = formatTimestamp();
    setFaqLastSaved(ts);
    toast({
      type: "success",
      message: "FAQs Saved",
      description: `${faqs.length} FAQ questions updated at ${ts}.`,
    });
  };

  const handleAddFaq = () => {
    const newFaq: AdminFaqItem = {
      id: `faq-${Date.now()}`,
      question_en: "",
      question_bn: "",
      answer_en: "",
      answer_bn: "",
      category: "Sourcing & Import",
    };
    setFaqs((prev) => [...prev, newFaq]);
  };

  const handleRemoveFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  // Section 3 Save Handler: Company Info
  const handleSaveCompanyInfo = () => {
    if (!companyInfo) return;
    AdminStore.saveCompanyInfo(companyInfo);
    const ts = formatTimestamp();
    setCompanyLastSaved(ts);
    toast({
      type: "success",
      message: "Company Information Saved",
      description: `Commercial & compliance parameters updated at ${ts}.`,
    });
  };

  // Section 4 Save Handler: Industries
  const handleSaveIndustries = () => {
    AdminStore.saveIndustries(industries);
    const ts = formatTimestamp();
    setIndustriesLastSaved(ts);
    toast({
      type: "success",
      message: "Industries Saved",
      description: `${industries.length} industry applications updated at ${ts}.`,
    });
  };

  const handleAddIndustry = () => {
    const newInd: AdminIndustryItem = {
      id: `ind-${Date.now()}`,
      name_en: "",
      name_bn: "",
      desc_en: "",
      desc_bn: "",
      targetGsm: "160 - 240 GSM",
      slug: `industry-${Date.now()}`,
    };
    setIndustries((prev) => [...prev, newInd]);
  };

  const handleRemoveIndustry = (id: string) => {
    setIndustries((prev) => prev.filter((ind) => ind.id !== id));
  };

  const languageTabs = [
    { key: "en", label: "English (EN)" },
    { key: "bn", label: "বাংলা (BN)" },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Site Content Editor
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sectioned bilingual forms. Each section saves independently to prevent losing unrelated edits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" size="md">
            4 Editable Sections
          </Badge>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <span>Live Site ↗</span>
          </a>
        </div>
      </div>

      {/* SECTION 1: Why Tasneem (4 Pillars) */}
      <Card id="why-tasneem" className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
        <CardHeader className="bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#800020]" />
              <CardTitle className="text-base">1. Why Tasneem (4 Core Value Pillars)</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Configures the 4 homepage value propositions: Direct Importer, 3rd-Party PSI, CFR Chattogram, Installation.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Tabs
              items={languageTabs}
              activeKey={whyTasneemLocale}
              onChange={(k) => setWhyTasneemLocale(k as ContentLocale)}
              size="sm"
            />
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    Pillar #{pillar.number || `0${idx + 1}`}
                  </span>
                  <Badge variant="outline" size="sm">
                    {whyTasneemLocale === "en" ? "EN Field" : "বাংলা ফিল্ড"}
                  </Badge>
                </div>

                {whyTasneemLocale === "en" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Pillar Title (EN)</label>
                      <Input
                        value={pillar.title_en}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPillars((prev) =>
                            prev.map((p) => (p.id === pillar.id ? { ...p, title_en: val } : p))
                          );
                        }}
                        placeholder="e.g. Direct Overseas Importer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Description (EN)</label>
                      <Textarea
                        value={pillar.desc_en}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPillars((prev) =>
                            prev.map((p) => (p.id === pillar.id ? { ...p, desc_en: val } : p))
                          );
                        }}
                        placeholder="Pillar supporting description..."
                        className="min-h-[75px]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">পিলারের শিরোনাম (বাংলা)</label>
                      <Input
                        value={pillar.title_bn}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPillars((prev) =>
                            prev.map((p) => (p.id === pillar.id ? { ...p, title_bn: val } : p))
                          );
                        }}
                        placeholder="যেমন: সরাসরি আন্তর্জাতিক আমদানিকারক"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">বিবরণ (বাংলা)</label>
                      <Textarea
                        value={pillar.desc_bn}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPillars((prev) =>
                            prev.map((p) => (p.id === pillar.id ? { ...p, desc_bn: val } : p))
                          );
                        }}
                        placeholder="পিলারের বিস্তারিত বিবরণ..."
                        className="min-h-[75px]"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 sm:p-5 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {whyTasneemLastSaved ? (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Saved at {whyTasneemLastSaved}</span>
              </span>
            ) : (
              <span>Unsaved changes in this section</span>
            )}
          </div>
          <Button size="sm" onClick={handleSaveWhyTasneem} className="gap-1.5 shadow-xs font-semibold">
            <Save className="h-3.5 w-3.5" />
            <span>Save Why Tasneem Changes</span>
          </Button>
        </CardFooter>
      </Card>

      {/* SECTION 2: Frequently Asked Questions (Repeatable Q&A) */}
      <Card id="faq" className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
        <CardHeader className="bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-base">2. Frequently Asked Questions (FAQ)</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Repeatable question and answer pairs displayed on the FAQ page and homepage accordions.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Tabs
              items={languageTabs}
              activeKey={faqLocale}
              onChange={(k) => setFaqLocale(k as ContentLocale)}
              size="sm"
            />
            <Button variant="outline" size="sm" onClick={handleAddFaq} className="gap-1 shadow-2xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Question</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    Q{index + 1}
                  </span>
                  <Input
                    value={faq.category}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFaqs((prev) =>
                        prev.map((f) => (f.id === faq.id ? { ...f, category: val } : f))
                      );
                    }}
                    placeholder="Category (e.g. Sourcing, Shipping)"
                    className="h-7 text-xs w-48 font-medium"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" size="sm">
                    {faqLocale === "en" ? "EN Field" : "বাংলা ফিল্ড"}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(faq.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Remove question"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {faqLocale === "en" ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Question (EN)</label>
                    <Input
                      value={faq.question_en}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqs((prev) =>
                          prev.map((f) => (f.id === faq.id ? { ...f, question_en: val } : f))
                        );
                      }}
                      placeholder="e.g. How does Tasneem handle overseas procurement?"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Answer (EN)</label>
                    <Textarea
                      value={faq.answer_en}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqs((prev) =>
                          prev.map((f) => (f.id === faq.id ? { ...f, answer_en: val } : f))
                        );
                      }}
                      placeholder="Detailed answer text..."
                      className="min-h-[80px]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">প্রশ্ন (বাংলা)</label>
                    <Input
                      value={faq.question_bn}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqs((prev) =>
                          prev.map((f) => (f.id === faq.id ? { ...f, question_bn: val } : f))
                        );
                      }}
                      placeholder="যেমন: বিদেশ থেকে মেশিন আমদানির ক্ষেত্রে শিপিং শর্তাবলী কী?"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">উত্তর (বাংলা)</label>
                    <Textarea
                      value={faq.answer_bn}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqs((prev) =>
                          prev.map((f) => (f.id === faq.id ? { ...f, answer_bn: val } : f))
                        );
                      }}
                      placeholder="বিস্তারিত উত্তর..."
                      className="min-h-[80px]"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 sm:p-5 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {faqLastSaved ? (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Saved at {faqLastSaved}</span>
              </span>
            ) : (
              <span>{faqs.length} FAQ questions configured</span>
            )}
          </div>
          <Button size="sm" onClick={handleSaveFaq} className="gap-1.5 shadow-xs font-semibold">
            <Save className="h-3.5 w-3.5" />
            <span>Save FAQ Changes</span>
          </Button>
        </CardFooter>
      </Card>

      {/* SECTION 3: Company Info (PRD Section 9 Compliance) */}
      {companyInfo && (
        <Card id="company" className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
          <CardHeader className="bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <CardTitle className="text-base">3. Company & Compliance Info (PRD Section 9)</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Matches PRD.md Section 9 fields: Registered address, phone numbers, WhatsApp, BIN, IRC, and hours.
              </CardDescription>
            </div>

            <div className="flex items-center gap-3">
              <Tabs
                items={languageTabs}
                activeKey={companyLocale}
                onChange={(k) => setCompanyLocale(k as ContentLocale)}
                size="sm"
              />
            </div>
          </CardHeader>

          <CardContent className="p-5 sm:p-6 space-y-6">
            {/* Owner, Contact Person & Communication Channels */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Key Contacts & Representation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Contact Person
                  </label>
                  <Input
                    value={companyInfo.contactPerson}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, contactPerson: e.target.value })}
                    placeholder="Mr Hasan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Proprietor / Owner Name
                  </label>
                  <Input
                    value={companyInfo.owner}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, owner: e.target.value })}
                    placeholder="MD MAMUNUR RASHID"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Primary Phone / WhatsApp *
                  </label>
                  <Input
                    value={companyInfo.phone}
                    onChange={(e) =>
                      setCompanyInfo({ ...companyInfo, phone: e.target.value, whatsapp: e.target.value })
                    }
                    placeholder="+880 1711-110516"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Secondary Phone (Google Listing)
                  </label>
                  <Input
                    value={companyInfo.phoneAlt}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, phoneAlt: e.target.value })}
                    placeholder="+880 1884-611888"
                  />
                </div>
              </div>
            </div>

            {/* Email & Digital Presence */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                Digital Contact & Official Properties
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Main Email *
                  </label>
                  <Input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                    placeholder="info@tasneemknitindustry.com"
                  />
                  <span className="text-[11px] text-slate-400">
                    Primary inbox for company inquiries and notifications.
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Business Email
                  </label>
                  <Input
                    type="email"
                    value={companyInfo.businessEmail || ""}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, businessEmail: e.target.value })}
                    placeholder="hello@tasneemknitindustry.com"
                  />
                  <span className="text-[11px] text-slate-400">
                    Official domain email address for business correspondence.
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Official Facebook Page URL
                  </label>
                  <Input
                    value={companyInfo.facebook || ""}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, facebook: e.target.value })}
                    placeholder="https://www.facebook.com/tasneemknitind"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Official Website Domain
                  </label>
                  <Input
                    value={companyInfo.domain}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, domain: e.target.value })}
                    placeholder="https://tasneemknitindustry.com"
                  />
                </div>
              </div>
            </div>

            {/* Compliance & Legal Credentials (Section 4 Confirmed) */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Registration & Compliance Credentials
                </h4>
                <Badge variant="success" size="sm">
                  Client Verified
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Business ID Number (BIN)
                  </label>
                  <Input
                    value={companyInfo.bin}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, bin: e.target.value })}
                    placeholder="006673859-0403"
                    className="font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    e-TIN
                  </label>
                  <Input
                    value={companyInfo.etin}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, etin: e.target.value })}
                    placeholder="626339507948"
                    className="font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Trade License No (17-digit)
                  </label>
                  <Input
                    value={companyInfo.tradeLicense}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, tradeLicense: e.target.value })}
                    placeholder="20252617218016419"
                    className="font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Type of Ownership
                  </label>
                  <Input
                    value={companyInfo.ownershipType}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, ownershipType: e.target.value })}
                    placeholder="Proprietorship"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Trade License Validity
                  </label>
                  <Input
                    value={companyInfo.validity}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, validity: e.target.value })}
                    placeholder="Through 30.06.2026 (FY 2025-2026)"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Year Established
                  </label>
                  <Input
                    value={companyInfo.yearEstablished}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, yearEstablished: e.target.value })}
                    placeholder="Contact for details"
                  />
                  <span className="text-[10px] text-slate-400 italic">
                    Kept as "Contact for details" until client confirms exact year.
                  </span>
                </div>
              </div>
            </div>

            {/* Separated Operating vs. Registered Addresses Callout */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
              <span className="font-bold block text-amber-950 mb-0.5">
                ⚠️ Dual Address Notice (Operating vs. Registered):
              </span>
              Per Client Decision Section 4, the VAT/Trade License is registered at Ashulia/Savar,
              while commercial operations & client visits take place at the Fatullah, Narayanganj facility.
              Both addresses are preserved separately and never merged.
            </div>

            {/* Bilingual Address & Operational Taglines */}
            {companyLocale === "en" ? (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Primary Operating Address (Fatullah, Narayanganj) [EN]
                    </label>
                    <Textarea
                      value={companyInfo.address_en}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address_en: e.target.value })}
                      placeholder="Plot-594, Road No. 4, BSCIC Industrial Park, Chan Nagor, Shashongaon, Enayetnagar, Fatullah, Narayanganj, Bangladesh"
                      className="min-h-[75px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Legal Registered Address (Savar, Dhaka) [EN]
                    </label>
                    <Textarea
                      value={companyInfo.registeredAddress_en}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, registeredAddress_en: e.target.value })
                      }
                      placeholder="24/3, Aukpara, Ashulia, Savar, Dhaka, Bangladesh"
                      className="min-h-[75px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Operating Business Hours [EN]
                    </label>
                    <Input
                      value={companyInfo.businessHours_en}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, businessHours_en: e.target.value })
                      }
                      placeholder="Saturday – Thursday: 9:00 AM – 7:00 PM (BST)"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      Commercial Positioning Tagline [EN]
                    </label>
                    <Input
                      value={companyInfo.tagline_en}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, tagline_en: e.target.value })}
                      placeholder="Industrial Circular Knitting Machinery Sourcing & Import Specialist"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      প্রধান অপারেটিং ও অফিস ঠিকানা (ফতুল্লা, নারায়ণগঞ্জ) [বাংলা]
                    </label>
                    <Textarea
                      value={companyInfo.address_bn}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, address_bn: e.target.value })}
                      placeholder="প্লট-৫৯৪, রোড নং ৪, বিসিক শিল্পনগরী, চান নগর, শ্মশানঘাট, এনায়েতনগর, ফতুল্লা, নারায়ণগঞ্জ, বাংলাদেশ"
                      className="min-h-[75px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      আইনি রেজিস্টার্ড ঠিকানা (সাভার, ঢাকা) [বাংলা]
                    </label>
                    <Textarea
                      value={companyInfo.registeredAddress_bn}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, registeredAddress_bn: e.target.value })
                      }
                      placeholder="২৪/৩, আউকপাড়া, আশুলিয়া, সাভার, ঢাকা, বাংলাদেশ"
                      className="min-h-[75px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      অফিস সময়সূচী [বাংলা]
                    </label>
                    <Input
                      value={companyInfo.businessHours_bn}
                      onChange={(e) =>
                        setCompanyInfo({ ...companyInfo, businessHours_bn: e.target.value })
                      }
                      placeholder="শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – সন্ধ্যা ৭:০০ (বাংলাদেশ সময়)"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      বাণিজ্যিক ট্যাগলাইন [বাংলা]
                    </label>
                    <Input
                      value={companyInfo.tagline_bn}
                      onChange={(e) => setCompanyInfo({ ...companyInfo, tagline_bn: e.target.value })}
                      placeholder="শিল্প সার্কুলার নিটিং মেশিন সোর্সিং ও সরাসরি আমদানি বিশেষজ্ঞ"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 sm:p-5 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {companyLastSaved ? (
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Saved at {companyLastSaved}</span>
                </span>
              ) : (
                <span>Compliant with PRD Section 9 commercial fields</span>
              )}
            </div>
            <Button size="sm" onClick={handleSaveCompanyInfo} className="gap-1.5 shadow-xs font-semibold">
              <Save className="h-3.5 w-3.5" />
              <span>Save Company Info Changes</span>
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* SECTION 4: Industries Served (Repeatable List) */}
      <Card id="industries" className="rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
        <CardHeader className="bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Factory className="h-4 w-4 text-purple-600" />
              <CardTitle className="text-base">4. Industries Served (Textile Applications)</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Repeatable list of Bangladesh industrial knitwear and fabric sectors served.
            </CardDescription>
          </div>

          <div className="flex items-center gap-3">
            <Tabs
              items={languageTabs}
              activeKey={industriesLocale}
              onChange={(k) => setIndustriesLocale(k as ContentLocale)}
              size="sm"
            />
            <Button variant="outline" size="sm" onClick={handleAddIndustry} className="gap-1 shadow-2xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Industry</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((ind, index) => (
              <div
                key={ind.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 font-mono">
                      #{index + 1}
                    </span>
                    <Input
                      value={ind.targetGsm}
                      onChange={(e) => {
                        const val = e.target.value;
                        setIndustries((prev) =>
                          prev.map((item) => (item.id === ind.id ? { ...item, targetGsm: val } : item))
                        );
                      }}
                      placeholder="Target GSM (e.g. 140-220 GSM)"
                      className="h-7 text-xs w-36"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">
                      {industriesLocale === "en" ? "EN" : "বাংলা"}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => handleRemoveIndustry(ind.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove industry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {industriesLocale === "en" ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Industry Name (EN)</label>
                      <Input
                        value={ind.name_en}
                        onChange={(e) => {
                          const val = e.target.value;
                          setIndustries((prev) =>
                            prev.map((item) => (item.id === ind.id ? { ...item, name_en: val } : item))
                          );
                        }}
                        placeholder="e.g. Export Knitwear & RMG"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Application Overview (EN)</label>
                      <Textarea
                        value={ind.desc_en}
                        onChange={(e) => {
                          const val = e.target.value;
                          setIndustries((prev) =>
                            prev.map((item) => (item.id === ind.id ? { ...item, desc_en: val } : item))
                          );
                        }}
                        placeholder="Description of machinery configuration for this sector..."
                        className="min-h-[75px]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">শিল্প খাতের নাম (বাংলা)</label>
                      <Input
                        value={ind.name_bn}
                        onChange={(e) => {
                          const val = e.target.value;
                          setIndustries((prev) =>
                            prev.map((item) => (item.id === ind.id ? { ...item, name_bn: val } : item))
                          );
                        }}
                        placeholder="যেমন: রপ্তানিমুখী তৈরি পোশাক ও নিটওয়্যার শিল্প"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">বিবরণ (বাংলা)</label>
                      <Textarea
                        value={ind.desc_bn}
                        onChange={(e) => {
                          const val = e.target.value;
                          setIndustries((prev) =>
                            prev.map((item) => (item.id === ind.id ? { ...item, desc_bn: val } : item))
                          );
                        }}
                        placeholder="এই খাতের জন্য মেশিনারির উপযোগিতা..."
                        className="min-h-[75px]"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="bg-slate-50/50 border-t border-slate-100 p-4 sm:p-5 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {industriesLastSaved ? (
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Saved at {industriesLastSaved}</span>
              </span>
            ) : (
              <span>{industries.length} industrial segments configured</span>
            )}
          </div>
          <Button size="sm" onClick={handleSaveIndustries} className="gap-1.5 shadow-xs font-semibold">
            <Save className="h-3.5 w-3.5" />
            <span>Save Industries Changes</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
