"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveLeft, MoveRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function GearGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  // নেভিগেশন হ্যান্ডলার (যদি আপনি পরে বোতাম যোগ করতে চান)
  const nextImage = () => setActive((prev) => (prev + 1) % images.length);
  const prevImage = () => setActive((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg transition-all duration-300 hover:border-border hover:shadow-xl">
        {hasImages ? (
          <>
            <Image
              src={images[active]}
              alt={`${name} - Image ${active + 1}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              priority
            />
            
            {/* Subtle Gradient Overlay on Hover for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Optional Image Counter Badge */}
            <div className="absolute bottom-3 right-3 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-md">
              {active + 1} / {images.length}
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-sm text-muted-foreground bg-muted/30">
            <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
            No images available for this gear
          </div>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="relative pt-1">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
            {images.map((src, i) => {
              const isActive = i === active;
              return (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative size-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ease-out",
                    "hover:scale-105 hover:border-primary/50",
                    isActive 
                      ? "border-primary shadow-md ring-2 ring-primary/20" 
                      : "border-border/60 opacity-70 hover:opacity-100"
                  )}
                  aria-label={`View image ${i + 1} of ${name}`}
                  aria-current={isActive ? "true" : "false"}
                >
                  <Image 
                    src={src} 
                    alt={`${name} thumbnail ${i + 1}`} 
                    fill 
                    sizes="80px" 
                    className="object-cover" 
                  />
                  {/* Overlay for better active state visibility */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity",
                    isActive ? "bg-primary/5" : "bg-black/10 opacity-0 hover:opacity-10"
                  )} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}