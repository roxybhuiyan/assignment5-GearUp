import { GearFilters } from "@/components/gear/gear-filters";
import { GearGrid } from "@/components/gear/gear-grid";
import { PaginationNav } from "@/components/common/pagination-nav";
import { apiPublicGet, apiPublicGetList } from "@/lib/server-api";
import type { Category, GearItem } from "@/lib/types";

interface GearPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function param(value: string | string[] | undefined): string | undefined {
  return typeof value === "string" ? value : undefined;
}

export default async function GearPage({ searchParams }: GearPageProps) {
  const sp = await searchParams;
  const page = param(sp.page) ?? "1";
  const search = param(sp.search);
  const category = param(sp.category);
  const brand = param(sp.brand);
  const minPrice = param(sp.minPrice);
  const maxPrice = param(sp.maxPrice);

  const [categories, { items, meta }] = await Promise.all([
    apiPublicGet<Category[]>("/categories"),
    apiPublicGetList<GearItem>("/gear", {
      searchParams: { page, limit: 12, search, category, brand, minPrice, maxPrice },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Browse Gear</h1>
        <p className="text-sm text-muted-foreground">Find the right gear for your next adventure.</p>
      </div>
      <GearFilters categories={categories} />
      <GearGrid items={items} />
      <PaginationNav
        meta={meta}
        basePath="/gear"
        searchParams={{ search, category, brand, minPrice, maxPrice }}
      />
    </div>
  );
}
