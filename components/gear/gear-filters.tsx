"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/lib/types";

export function GearFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");
  const category = searchParams.get("category") ?? "all";

  function apply(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    apply({ search, brand, minPrice, maxPrice });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <Input
        placeholder="Search gear..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="lg:col-span-2"
      />
      <Select
        value={category}
        onValueChange={(value) => apply({ category: value === "all" ? "" : String(value) })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <Input
        placeholder="Min price"
        type="number"
        min={0}
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <Input
        placeholder="Max price"
        type="number"
        min={0}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <Button type="submit" disabled={isPending} className="lg:col-span-6 lg:w-fit">
        {isPending ? "Filtering..." : "Apply Filters"}
      </Button>
    </form>
  );
}
