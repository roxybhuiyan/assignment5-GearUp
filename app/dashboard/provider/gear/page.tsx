import Link from "next/link";
import { PackagePlus } from "lucide-react";
import { requireRole } from "@/lib/session";
import { getProviderGear } from "@/lib/provider-gear";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/empty-state";
import { PaginationNav } from "@/components/common/pagination-nav";
import { GearActions } from "@/components/dashboard/gear-actions";
import { formatCurrency } from "@/lib/utils";

interface ProviderGearPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProviderGearPage({ searchParams }: ProviderGearPageProps) {
  const user = await requireRole("PROVIDER");
  const { page } = await searchParams;
  const { items: gearList, meta } = await getProviderGear(user.id, {
    page: Number(page ?? "1"),
    limit: 10,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <p className="text-sm text-muted-foreground">Manage the gear you have listed.</p>
        </div>
        <Button nativeButton={false} render={<Link href="/dashboard/provider/gear/new">Add Gear</Link>} />
      </div>

      {gearList.length === 0 ? (
        <EmptyState
          icon={PackagePlus}
          title="No gear listed yet"
          description="Add your first item to start renting it out."
          action={<Button nativeButton={false} render={<Link href="/dashboard/provider/gear/new">Add Gear</Link>} />}
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price/day</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gearList.map((gear) => (
                  <TableRow key={gear.id}>
                    <TableCell className="font-medium">{gear.name}</TableCell>
                    <TableCell>{formatCurrency(gear.pricePerDay)}</TableCell>
                    <TableCell>{gear.stock}</TableCell>
                    <TableCell>
                      <Badge variant={gear.availability ? "outline" : "destructive"}>
                        {gear.availability ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <GearActions gearId={gear.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationNav meta={meta} basePath="/dashboard/provider/gear" searchParams={{}} />
        </>
      )}
    </div>
  );
}
