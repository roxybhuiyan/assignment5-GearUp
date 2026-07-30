import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GearGrid } from "@/components/gear/gear-grid";
import { apiPublicGetList } from "@/lib/server-api";
import type { GearItem } from "@/lib/types";
import { ArrowRight, Sparkles, ShieldCheck, Compass, Zap } from "lucide-react";

export default async function HomePage() {
  const { items } = await apiPublicGetList<GearItem>("/gear", {
    searchParams: { limit: 8 },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-muted/20 to-muted/50 py-24 md:py-32">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-6xl px-4 text-center">
          {/* Top Pill/Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-xs font-medium backdrop-blur-sm shadow-sm transition-all hover:bg-accent">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>The premier marketplace for outdoor enthusiasts</span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Rent Sports &amp; Outdoor Gear{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl font-normal leading-relaxed">
            From high-end mountain bikes to premium camping tents, explore and rent top-quality gear from trusted local providers near you.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/gear" className="gap-2 text-base font-semibold" />}
            >
              Browse Gear <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/auth/register" className="text-base font-semibold" />}
            >
              Become a Provider
            </Button>
          </div>

          {/* Quick Value Props */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-border/60 pt-10 text-muted-foreground text-sm max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Verified Local Gear</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Compass className="h-4 w-4 text-primary" />
              <span>Flexible Pickups</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gear Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 w-full">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              Curated Selection
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Featured Gear</h2>
          </div>

          <Button
            variant="ghost"
            nativeButton={false}
            render={
              <Link href="/gear" className="group text-sm font-semibold gap-1">
                View all items
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            }
          />
        </div>

        {/* Gear Grid Wrapper */}
        <div className="rounded-xl border bg-card/50 p-6 shadow-sm">
          <GearGrid items={items} />
        </div>
      </section>
    </div>
  );
}