import { requireRole } from "@/lib/session";
import { apiPublicGet } from "@/lib/server-api";
import { GearForm } from "@/components/gear/gear-form";
import type { Category } from "@/lib/types";

export default async function NewGearPage() {
  await requireRole("PROVIDER");
  const categories = await apiPublicGet<Category[]>("/categories");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Add Gear</h1>
        <p className="text-sm text-muted-foreground">List a new item for customers to rent.</p>
      </div>
      <GearForm categories={categories} />
    </div>
  );
}
