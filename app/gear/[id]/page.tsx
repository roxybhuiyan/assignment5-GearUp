import { notFound } from "next/navigation";
import { GearGallery } from "@/components/gear/gear-gallery";
import { RentNowForm } from "@/components/gear/rent-now-form";
import { ReviewList } from "@/components/reviews/review-list";
import { Badge } from "@/components/ui/badge";
import { apiPublicGet, ApiError } from "@/lib/server-api";
import { getCurrentUser } from "@/lib/session";
import { formatCurrency } from "@/lib/utils";
import { conditionLabels } from "@/lib/status";
import type { GearItem } from "@/lib/types";

interface GearDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GearDetailPage({ params }: GearDetailPageProps) {
  const { id } = await params;

  let gear: GearItem;
  try {
    gear = await apiPublicGet<GearItem>(`/gear/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  const currentUser = await getCurrentUser();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <GearGallery images={gear.images} name={gear.name} />
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{gear.name}</h1>
              <Badge variant="outline">{conditionLabels[gear.condition]}</Badge>
            </div>
            <p className="text-muted-foreground">
              {gear.brand}
              {gear.category ? ` · ${gear.category.name}` : ""}
            </p>
          </div>
          <p className="text-3xl font-bold">
            {formatCurrency(gear.pricePerDay)}{" "}
            <span className="text-base font-normal text-muted-foreground">/ day</span>
          </p>
          <p className="whitespace-pre-line text-sm text-muted-foreground">{gear.description}</p>
          {gear.provider && (
            <p className="text-sm">
              Listed by <span className="font-medium">{gear.provider.fullName}</span>
            </p>
          )}
          <RentNowForm gear={gear} currentUser={currentUser} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
        <ReviewList reviews={gear.reviews ?? []} />
      </div>
    </div>
  );
}
