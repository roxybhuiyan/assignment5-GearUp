import { requireRole } from "@/lib/session";
import { apiGetList } from "@/lib/server-api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaginationNav } from "@/components/common/pagination-nav";
import { formatCurrency } from "@/lib/utils";
import type { GearItem } from "@/lib/types";

interface AdminGearPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminGearPage({ searchParams }: AdminGearPageProps) {
  await requireRole("ADMIN");
  const { page } = await searchParams;
  const { items: gearList, meta } = await apiGetList<GearItem>("/admin/gear", {
    searchParams: { page: page ?? "1", limit: 10 },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Gear Moderation</h1>
        <p className="text-sm text-muted-foreground">All gear listings across the platform.</p>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price/day</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gearList.map((gear) => (
              <TableRow key={gear.id}>
                <TableCell className="font-medium">{gear.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {gear.provider?.fullName ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {gear.category?.name ?? "—"}
                </TableCell>
                <TableCell>{formatCurrency(gear.pricePerDay)}</TableCell>
                <TableCell>
                  <Badge variant={gear.availability ? "outline" : "destructive"}>
                    {gear.availability ? "Available" : "Unavailable"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationNav meta={meta} basePath="/dashboard/admin/gear" searchParams={{}} />
    </div>
  );
}
