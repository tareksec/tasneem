import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategoryInfo } from "@/lib/machines-data";
import { getDbMachines } from "@/lib/db/machines";
import { MachineCard } from "@/components/machines/MachineCard";
import { MachineCategory } from "@/lib/types";

interface RelatedMachinesProps {
  currentMachineId: string;
  category: MachineCategory;
}

export async function RelatedMachines({ currentMachineId, category }: RelatedMachinesProps) {
  const categoryInfo = getCategoryInfo(category);
  const allInCategory = await getDbMachines({ category });
  const related = allInCategory.filter((m) => m.id !== currentMachineId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#E5E5E5]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#800020] block mb-1">
            Similar Specifications
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2D2D]">
            Related {categoryInfo?.name || "Machinery"} Models
          </h2>
          <p className="text-xs text-[#4A4A4A] mt-0.5">
            Compare alternative cylinder diameters and feeder configurations in the same category.
          </p>
        </div>

        <Link
          href={`/machines/${category}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#800020] hover:underline shrink-0"
        >
          <span>View all {categoryInfo?.name} models ({allInCategory.length})</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </section>
  );
}
