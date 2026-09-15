import prisma from "@/lib/prisma";
import { CATEGORIES } from "@/lib/machines-data";
import { MachineCategoryInfo } from "@/lib/types";

export async function getDbCategories(): Promise<MachineCategoryInfo[]> {
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return [
      ...CATEGORIES,
      ...categories
        .filter((category) => !CATEGORIES.some((legacy) => legacy.slug === category.slug))
        .map((category) => ({
          ...category,
          name_bn: category.name_bn || undefined,
          description: category.description || undefined,
          description_bn: category.description_bn || undefined,
          icon: category.icon || undefined,
        })),
    ];
  } catch {
    return CATEGORIES as MachineCategoryInfo[];
  }
}

export async function getDbCategoryBySlug(slug: string): Promise<MachineCategoryInfo | undefined> {
  const legacy = CATEGORIES.find((category) => category.slug === slug);
  if (legacy) return legacy as MachineCategoryInfo;
  try {
    const category = await prisma.category.findUnique({ where: { slug } });
    return category
      ? {
          ...category,
          name_bn: category.name_bn || undefined,
          description: category.description || undefined,
          description_bn: category.description_bn || undefined,
          icon: category.icon || undefined,
        }
      : undefined;
  } catch {
    return undefined;
  }
}
