import { notFound } from "next/navigation";
import { requireRole } from "@/lib/session";
import { apiPublicGet, ApiError } from "@/lib/server-api";
import { GearForm } from "@/components/gear/gear-form";
import type { Category, GearItem } from "@/lib/types";

interface EditGearPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGearPage({ params }: EditGearPageProps) {
  await requireRole("PROVIDER");
  const { id } = await params;

  let gear: GearItem;
  try {
    gear = await apiPublicGet<GearItem>(`/gear/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
  const categories = await apiPublicGet<Category[]>("/categories");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Gear</h1>
        <p className="text-sm text-muted-foreground">Update details for {gear.name}.</p>
      </div>
      <GearForm categories={categories} gear={gear} />
    </div>
  );
}
