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
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={gear.name}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-muted-foreground">
            No image available
          </div>
        )}

        {/* Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Condition Badge */}
        <Badge 
          variant="secondary" 
          className="absolute left-3 top-3 backdrop-blur-md bg-background/80 font-medium text-xs shadow-sm border-0"
        >
          {conditionLabels[gear.condition]}
        </Badge>

        {/* Availability Badge */}
        {!gear.availability && (
          <Badge 
            variant="destructive" 
            className="absolute right-3 top-3 font-medium text-xs shadow-sm"
          >
            Unavailable
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Brand */}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {gear.brand} {gear.category ? `• ${gear.category.name}` : ""}
        </span>

        {/* Title */}
        <h3 className="mt-1 line-clamp-1 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {gear.name}
        </h3>

        {/* Price Section */}
        <div className="mt-4 flex items-baseline justify-between border-t border-border/40 pt-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold tracking-tight text-foreground">
              {formatCurrency(gear.pricePerDay)}
            </span>
            <span className="text-xs text-muted-foreground">/ day</span>
          </div>

          <span className="text-xs font-medium text-primary opacity-0 transition-all duration-300 transform translate-x-1 group-hover:opacity-100 group-hover:translate-x-0">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}