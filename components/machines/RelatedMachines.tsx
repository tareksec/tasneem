import { getCategoryInfo } from "@/lib/machines-data";
import { getDbMachines } from "@/lib/db/machines";
import { MachineCategory, MainCategory } from "@/lib/types";
import { RelatedMachinesClient } from "@/components/machines/RelatedMachinesClient";

interface RelatedMachinesProps {
  currentMachineId: string;
  category: MachineCategory;
  mainCategory?: MainCategory;
}

export async function RelatedMachines({
  currentMachineId,
  category,
  mainCategory,
}: RelatedMachinesProps) {
  const categoryInfo = getCategoryInfo(category);

  // Tier 1: Exact category match
  const sameCategoryMachines = await getDbMachines({ category, includeDrafts: false });
  let related = sameCategoryMachines.filter((m) => m.id !== currentMachineId);

  // Tier 2: If fewer than 4, expand to the same overall collection/mainCategory
  if (related.length < 4) {
    const isCircular =
      mainCategory === "circular-knitting" ||
      ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(category);

    const collectionCategory = isCircular ? "circular-knitting" : (mainCategory || category);
    const collectionMachines = await getDbMachines({
      category: collectionCategory,
      includeDrafts: false,
    });

    const additional = collectionMachines.filter(
      (m) => m.id !== currentMachineId && !related.some((r) => r.id === m.id)
    );
    related = [...related, ...additional];
  }

  // Tier 3: If still fewer than 4 (e.g. niche single-model categories), fill with catalog machines
  if (related.length < 4) {
    const allPublished = await getDbMachines({ includeDrafts: false });
    const fallback = allPublished.filter(
      (m) => m.id !== currentMachineId && !related.some((r) => r.id === m.id)
    );
    related = [...related, ...fallback];
  }

  const finalRelated = related.slice(0, 4);

  if (finalRelated.length === 0) return null;

  return (
    <RelatedMachinesClient
      related={finalRelated}
      category={category}
      categoryName={categoryInfo?.name || "Machinery"}
      categoryNameBn={categoryInfo?.name_bn}
      totalCategoryCount={sameCategoryMachines.length}
    />
  );
}

