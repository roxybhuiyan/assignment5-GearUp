import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { conditionLabels } from "@/lib/status";
import type { GearItem } from "@/lib/types";

export function GearCard({ gear }: { gear: GearItem }) {
  const image = gear.images?.[0];

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={gear.name}
            fill
            sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
        {!gear.availability && (
          <Badge variant="destructive" className="absolute right-2 top-2">
            Unavailable
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="line-clamp-1 font-medium">{gear.name}</p>
          <Badge variant="outline">{conditionLabels[gear.condition]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {gear.brand}
          {gear.category ? ` · ${gear.category.name}` : ""}
        </p>
        <p className="mt-auto pt-2 font-semibold">
          {formatCurrency(gear.pricePerDay)}{" "}
          <span className="text-sm font-normal text-muted-foreground">/ day</span>
        </p>
      </div>
    </Link>
  );
}
