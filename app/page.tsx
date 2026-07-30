import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GearGrid } from "@/components/gear/gear-grid";
import { apiPublicGetList } from "@/lib/server-api";
import type { GearItem } from "@/lib/types";

export default async function HomePage() {
  const { items } = await apiPublicGetList<GearItem>("/gear", { searchParams: { limit: 8 } });

  return (
    <div>
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Rent Sports &amp; Outdoor Gear Instantly
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From mountain bikes to camping tents, find and rent quality gear from trusted local
            providers.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/gear">Browse Gear</Link>} />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/auth/register">Become a Provider</Link>}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Gear</h2>
          <Button variant="ghost" nativeButton={false} render={<Link href="/gear">View all</Link>} />
        </div>
        <GearGrid items={items} />
      </section>
    </div>
  );
}
