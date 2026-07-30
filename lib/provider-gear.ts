import { apiPublicGetList } from "./server-api";
import type { GearItem, PaginationMeta } from "./types";

/**
 * The backend has no `GET /provider/gear` list endpoint (only create/update/delete).
 * We work around it using the public gear list, which already returns each
 * item's `providerId`, and paginate the filtered result in-memory.
 */
export async function getProviderGear(
  providerId: string,
  { page = 1, limit = 10 }: { page?: number; limit?: number } = {}
): Promise<{ items: GearItem[]; meta: PaginationMeta }> {
  const { items: allGear } = await apiPublicGetList<GearItem>("/gear", {
    searchParams: { limit: 100 },
    revalidate: 0,
  });
  const myGear = allGear.filter((gear) => gear.providerId === providerId);

  const total = myGear.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const items = myGear.slice((currentPage - 1) * limit, currentPage * limit);

  return { items, meta: { page: currentPage, limit, total, totalPages } };
}
