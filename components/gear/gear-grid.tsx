import { PackageSearch } from "lucide-react";
import { GearCard } from "./gear-card";
import { EmptyState } from "@/components/common/empty-state";
import type { GearItem } from "@/lib/types";

export function GearGrid({ items }: { items: GearItem[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No gear found"
        description="Try adjusting your filters or search terms."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((gear) => (
        <GearCard key={gear.id} gear={gear} />
      ))}
    </div>
  );
}
