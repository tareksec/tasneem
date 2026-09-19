export type MainCategory =
  | "circular-knitting"
  | "dyeing"
  | "shearing"
  | "finishing"
  | "other";

export type CircularKnittingSubCategory =
  | "double-jersey"
  | "single-jersey"
  | "interlock"
  | "jacquard"
  | "terry";

export type MachineCategory = string;

export type MachineAvailability =
  | "in-stock"
  | "made-to-order"
  | "contact-for-availability";

export interface MachineGalleryImage {
  id: string;
  url: string;
  alt_en: string;
  alt_bn?: string;
  isPrimary?: boolean;
}

export interface MachineCategoryInfo {
  id?: string;
  slug: string;
  name: string;
  name_bn?: string;
  description?: string;
  description_bn?: string;
  icon?: string;
  typicalGauge?: string;
  commonApplications?: string[];
}

export interface Machine {
  id: string;
  name: string;
  name_bn?: string;
  brand: string;
  manufacturer: string;
  machineType: string;
  category: MachineCategory;
  mainCategory?: MainCategory;
  subCategory?: CircularKnittingSubCategory;
  cylinderDiameter?: string;
  gauge?: string;
  feeders?: number;
  numberOfSystems?: number;
  machineSpeed?: string;
  fabricType?: string;
  fabricType_bn?: string;
  productionCapacity?: string;
  application: string[];
  application_bn?: string[];
  powerRequirement?: string;
  dimensions?: string;
  weight?: string;
  origin: string;
  warranty?: string;
  availability: MachineAvailability;
  price?: number; // Omit/hide if not confirmed by owner
  description: string;
  description_bn?: string;
  features: string[];
  features_bn?: string[];
  images: string[];
  galleryImages?: MachineGalleryImage[];
  status?: "published" | "draft";
  createdAt?: string;
  updatedAt?: string;
  seoTitle_en?: string;
  seoTitle_bn?: string;
  seoDesc_en?: string;
  seoDesc_bn?: string;
  ogImage?: string;
}

export type QuoteStatus = "new" | "contacted" | "quoted" | "closed";

export interface QuoteRequestData {
  name: string;
  company: string;
  phoneOrWhatsApp: string;
  email: string;
  machineType: string;
  gauge?: string;
  cylinderDiameter?: string;
  feederCount?: string;
  productionTarget?: string;
  quantity: string;
  preferredBrand?: string;
  deliveryRequirement?: string;
  message?: string;
  machineId?: string;
}

export interface QuoteRecord extends QuoteRequestData {
  id: string;
  status: QuoteStatus;
  submittedAt: string;
  createdAt?: string;
  customerId?: string;
  adminNotes?: string;
  whatsappUrl?: string;
  contactName?: string;
  phone?: string;
  machineName?: string;
  country?: string;
  timeline?: string;
}

export type CustomerApprovalStatus = "pending" | "approved" | "rejected";

export interface CustomerUser {
  id: string;
  name: string;
  company: string;
  companyName?: string;
  email: string;
  phoneOrWhatsApp: string;
  phone?: string;
  deliveryAddress?: string;
  address?: string;
  district?: string;
  notes?: string;
  password?: string;
  status: CustomerApprovalStatus;
  isApproved?: boolean;
  email_verified?: boolean;
  verification_token?: string | null;
  verification_token_expires?: string | null;
  reset_token?: string | null;
  reset_token_expires?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  file: string;                 // uploaded image or video URL / base64 WebP / video embed
  thumbnail?: string;           // auto-generated for video, or the image itself
  title_en: string;
  title_bn: string;
  description_en?: string;
  description_bn?: string;
  location?: string;            // e.g. mill name/location, only if client wants to disclose
  installedDate?: string;       // optional (e.g. "March 2026", "2025-11")
  relatedCategory?: string;     // link to a machine mainCategory/subCategory if relevant
  published: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RedirectRule {
  id: string;
  source: string;
  destination: string;
  permanent: boolean;
  createdAt: string;
  reason?: string;
}

export interface CategoryInfo {
  slug: MachineCategory;
  name: string;
  name_bn?: string;
  tagline: string;
  tagline_bn?: string;
  description: string;
  description_bn?: string;
  typicalGauge: string;
  commonApplications: string[];
  isTopLevel?: boolean;
  parentCategory?: MainCategory;
  subCategory?: CircularKnittingSubCategory;
}

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  name: string;
  company?: string | null;
  rating: number;
  message: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt?: string;
}


