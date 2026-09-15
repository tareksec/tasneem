import prisma from "@/lib/prisma";
import { Machine, MachineCategory, MainCategory, CircularKnittingSubCategory } from "@/lib/types";
import { MACHINES } from "@/lib/machines-data";

/**
 * Format raw Prisma Machine record into TypeScript Machine domain model
 */
function formatDbMachine(raw: any): Machine {
  const isCircularSub = ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(raw.category);
  const mainCategory = (raw.mainCategory as MainCategory) || (isCircularSub ? "circular-knitting" : (raw.category as MainCategory));
  const subCategory = (raw.subCategory as CircularKnittingSubCategory) || (isCircularSub ? (raw.category as CircularKnittingSubCategory) : undefined);

  return {
    ...raw,
    name_bn: raw.name_bn || undefined,
    mainCategory,
    subCategory,
    category: raw.category as MachineCategory,
    cylinderDiameter: raw.cylinderDiameter || undefined,
    gauge: raw.gauge || undefined,
    feeders: raw.feeders ?? undefined,
    numberOfSystems: raw.numberOfSystems ?? undefined,
    machineSpeed: raw.machineSpeed || undefined,
    fabricType: raw.fabricType || undefined,
    fabricType_bn: raw.fabricType_bn || undefined,
    productionCapacity: raw.productionCapacity || undefined,
    application: Array.isArray(raw.application) ? raw.application : [],
    application_bn: Array.isArray(raw.application_bn) ? raw.application_bn : [],
    powerRequirement: raw.powerRequirement || undefined,
    dimensions: raw.dimensions || undefined,
    weight: raw.weight || undefined,
    warranty: raw.warranty || undefined,
    price: raw.price ? Number(raw.price) : undefined,
    description_bn: raw.description_bn || undefined,
    features: Array.isArray(raw.features) ? raw.features : [],
    features_bn: Array.isArray(raw.features_bn) ? raw.features_bn : [],
    images: Array.isArray(raw.images) ? raw.images : [],
    galleryImages: Array.isArray(raw.galleryImages) ? raw.galleryImages : [],
    status: (raw.status as "published" | "draft") || "published",
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : undefined,
    updatedAt: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : undefined,
    seoTitle_en: raw.seoTitle_en || undefined,
    seoTitle_bn: raw.seoTitle_bn || undefined,
    seoDesc_en: raw.seoDesc_en || undefined,
    seoDesc_bn: raw.seoDesc_bn || undefined,
    ogImage: raw.ogImage || undefined,
  };
}

/**
 * Fetch all machines with optional filtering and status checks
 */
export async function getDbMachines(options: {
  category?: string;
  includeDrafts?: boolean;
  search?: string;
} = {}): Promise<Machine[]> {
  const { category, includeDrafts = false, search } = options;

  try {
    const where: any = {};

    if (!includeDrafts) {
      where.status = "published";
    }

    if (category && category !== "all") {
      if (category === "circular-knitting") {
        where.OR = [
          { category: "circular-knitting" },
          { mainCategory: "circular-knitting" },
          { category: { in: ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"] } },
        ];
      } else {
        where.OR = [
          { category: category },
          { subCategory: category },
          { mainCategory: category },
        ];
      }
    }

    if (search && search.trim()) {
      const q = search.trim();
      where.AND = [
        ...(where.AND || []),
        {
          OR: [
            { name: { contains: q } },
            { brand: { contains: q } },
            { machineType: { contains: q } },
            { fabricType: { contains: q } },
            { description: { contains: q } },
          ],
        },
      ];
    }

    const records = await prisma.machine.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (records && records.length > 0) {
      return records.map(formatDbMachine);
    }
  } catch (error) {
    console.warn("Prisma getDbMachines query fallback to static data:", error);
  }

  // Safe fallback to static data if database is not reachable yet
  let list = includeDrafts ? MACHINES : MACHINES.filter((m) => m.status !== "draft");
  if (category && category !== "all") {
    list = list.filter(
      (m) =>
        m.category === category ||
        m.mainCategory === category ||
        m.subCategory === category ||
        (category === "circular-knitting" &&
          (!m.mainCategory || m.mainCategory === "circular-knitting") &&
          ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(m.category))
    );
  }
  return list;
}

/**
 * Fetch a single machine by ID (slug)
 */
export async function getDbMachineById(
  id: string,
  includeDrafts = true
): Promise<Machine | undefined> {
  try {
    const record = await prisma.machine.findUnique({
      where: { id },
    });

    if (record) {
      if (!includeDrafts && record.status === "draft") {
        return undefined;
      }
      return formatDbMachine(record);
    }
  } catch (error) {
    console.warn(`Prisma getDbMachineById(${id}) fallback:`, error);
  }

  return MACHINES.find((m) => m.id === id);
}

/**
 * Fetch featured machines for homepage
 */
export async function getDbFeaturedMachines(limit = 6): Promise<Machine[]> {
  const machines = await getDbMachines({ includeDrafts: false });
  return machines.slice(0, limit);
}
