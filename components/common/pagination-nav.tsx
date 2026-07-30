import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PaginationMeta } from "@/lib/types";


// PaginationNav.tsx
interface PaginationNavProps {
  meta: PaginationMeta;
  basePath: string;
  searchParams: Record<string, string | undefined>;
}

function hrefForPage(
  basePath: string,
  searchParams: Record<string, string | undefined>,
  page: number
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && key !== "page") params.set(key, value);
  }
  params.set("page", String(page));
  return `${basePath}?${params.toString()}`;
}

export function PaginationNav({ meta, basePath, searchParams }: PaginationNavProps) {
  if (meta.totalPages <= 1) return null;
  const { page, totalPages } = meta;

  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} &middot; {meta.total} total
      </p>
      <div className="flex gap-2">
        {page <= 1 ? (
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={hrefForPage(basePath, searchParams, page - 1)}>Previous</Link>}
          />
        )}
        {page >= totalPages ? (
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={hrefForPage(basePath, searchParams, page + 1)}>Next</Link>}
          />
        )}
      </div>
    </div>
  );
}
