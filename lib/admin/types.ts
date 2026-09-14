export type ContentLocale = "en" | "bn";

export interface BlogPost {
  id: string;
  title_en: string;
  title_bn: string;
  slug_en: string;
  slug_bn: string;
  cover_image: string;
  excerpt_en: string;
  excerpt_bn: string;
  body_en: string;
  body_bn: string;
  category: string;
  tags: string[];
  seo_title_en: string;
  seo_title_bn: string;
  seo_desc_en: string;
  seo_desc_bn: string;
  status: "published" | "draft";
  published_at: string;
  updated_at: string;
  author: string;
}

export interface WhyTasneemPillar {
  id: string;
  number: string;
  title_en: string;
  title_bn: string;
  desc_en: string;
  desc_bn: string;
}

export interface AdminFaqItem {
  id: string;
  question_en: string;
  question_bn: string;
  answer_en: string;
  answer_bn: string;
  category: string;
}

export interface AdminCompanyInfo {
  name: string;
  legalName: string;
  owner: string;
  contactPerson: string;
  tagline_en: string;
  tagline_bn: string;
  address_en: string; // Operating address (Fatullah, Narayanganj)
  address_bn: string;
  registeredAddress_en: string; // Legal registered address (Savar, Dhaka)
  registeredAddress_bn: string;
  phone: string;
  phoneAlt: string;
  whatsapp: string;
  email: string;
  businessEmail?: string;
  facebook?: string;
  domain: string;
  businessHours_en: string;
  businessHours_bn: string;
  bin: string;
  etin: string;
  tradeLicense: string;
  ownershipType: string;
  validity: string;
  yearEstablished: string;
  status_en: string;
  status_bn: string;
}

export interface AdminIndustryItem {
  id: string;
  name_en: string;
  name_bn: string;
  desc_en: string;
  desc_bn: string;
  targetGsm: string;
  slug: string;
}

export type { GalleryItem } from "@/lib/types";

export interface ActivityLog {
  id: string;
  action: "create" | "update" | "delete" | "publish" | "draft" | "reorder";
  entity: "blog" | "why_tasneem" | "faq" | "company_info" | "industries" | "machines" | "quotes" | "redirects" | "gallery" | "customers";
  title: string;
  timestamp: string;
  author: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}
