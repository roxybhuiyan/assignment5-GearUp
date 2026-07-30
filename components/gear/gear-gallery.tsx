"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function GearGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="space-y-3">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border bg-muted">
        {hasImages ? (
          <Image
            src={images[active]}
            alt={name}
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden rounded-md border-2",
                i === active ? "border-primary" : "border-transparent"
              )}
            >
              <Image src={src} alt={`${name} thumbnail ${i + 1}`} fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
