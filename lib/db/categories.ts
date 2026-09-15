import prisma from "@/lib/prisma";
import { CATEGORIES, MAIN_CATEGORIES } from "@/lib/machines-data";
import { CategoryInfo, MachineCategoryInfo } from "@/lib/types";

export async function getDbCategories(): Promise<CategoryInfo[]> {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    const dynamicCategories: CategoryInfo[] = categories
      .filter((category) => !CATEGORIES.some((legacy) => legacy.slug === category.slug))
      .map((category) => ({
        slug: category.slug as any,
        name: category.name,
        name_bn: category.name_bn || category.name,
        tagline: category.description || `${category.name} machinery for industrial production`,
        tagline_bn: category.description_bn || `${category.name_bn || category.name} মেশিনারি`,
        description: category.description || "",
        description_bn: category.description_bn || category.description || "",
        typicalGauge: "Universal",
        commonApplications: [category.name],
        isTopLevel: true,
      }));
    return [...CATEGORIES, ...dynamicCategories];
  } catch {
    return CATEGORIES;
  }
}

export async function getDbMainCategories(): Promise<CategoryInfo[]> {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    const dynamicCategories: CategoryInfo[] = categories
      .filter((category) => !CATEGORIES.some((legacy) => legacy.slug === category.slug))
      .map((category) => ({
        slug: category.slug as any,
        name: category.name,
        name_bn: category.name_bn || category.name,
        tagline: category.description || `${category.name} machinery for industrial production`,
        tagline_bn: category.description_bn || `${category.name_bn || category.name} মেশিনারি`,
        description: category.description || "",
        description_bn: category.description_bn || category.description || "",
        typicalGauge: "Universal",
        commonApplications: [category.name],
        isTopLevel: true,
      }));
    return [...MAIN_CATEGORIES, ...dynamicCategories];
  } catch {
    return MAIN_CATEGORIES;
  }
}

export async function getDbCategoryBySlug(slug: string): Promise<CategoryInfo | undefined> {
  const legacy = CATEGORIES.find((category) => category.slug === slug);
  if (legacy) return legacy;
  try {
    const category = await prisma.category.findUnique({ where: { slug } });
    return category
      ? {
          slug: category.slug as any,
          name: category.name,
          name_bn: category.name_bn || category.name,
          tagline: category.description || `${category.name} machinery for industrial production`,
          tagline_bn: category.description_bn || undefined,
          description: category.description || "",
          description_bn: category.description_bn || undefined,
          typicalGauge: "Universal",
          commonApplications: [category.name],
          isTopLevel: true,
        }
      : undefined;
  } catch {
    return undefined;
  }
}

