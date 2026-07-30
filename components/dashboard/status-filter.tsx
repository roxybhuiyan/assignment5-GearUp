"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusFilterProps {
  paramKey: string;
  placeholder: string;
  allLabel: string;
  options: { value: string; label: string }[];
  className?: string;
}

export function StatusFilter({
  paramKey,
  placeholder,
  allLabel,
  options,
  className,
}: StatusFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete(paramKey);
    else params.set(paramKey, value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Select value={searchParams.get(paramKey) ?? "all"} onValueChange={(v) => update(String(v))}>
      <SelectTrigger className={className ?? "w-44"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{allLabel}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
