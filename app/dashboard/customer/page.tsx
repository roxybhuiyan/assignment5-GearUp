import Link from "next/link";
import { PackageOpen } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/empty-state";
import { PaginationNav } from "@/components/common/pagination-nav";
import { RentalStatusBadge } from "@/components/dashboard/status-badge";
import { ReviewForm } from "@/components/reviews/review-form";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RentalOrder } from "@/lib/types";

interface CustomerDashboardPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CustomerDashboardPage({ searchParams }: CustomerDashboardPageProps) {
  await requireRole("CUSTOMER");
  const { page } = await searchParams;

  const { items: orders, meta } = await apiGetList<RentalOrder>("/rentals", {
    searchParams: { page: page ?? "1", limit: 10 },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Rentals</h1>
        <p className="text-sm text-muted-foreground">Track your rental orders and payments.</p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No rental orders yet"
          description="Browse gear and place your first rental."
          action={<Button nativeButton={false} render={<Link href="/gear">Browse gear</Link>} />}
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gear</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.gear?.name ?? "Gear"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(order.rentalStartDate)} - {formatDate(order.rentalEndDate)}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <RentalStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {order.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          nativeButton={false}
                          render={
                            <Link href={`/dashboard/customer/orders/${order.id}/pay`}>Pay Now</Link>
                          }
                        />
                      )}
                      {(order.status === "PAID" || order.status === "RETURNED") && (
                        <ReviewForm
                          rentalOrderId={order.id}
                          trigger={
                            <Button size="sm" variant="outline">
                              Leave Review
                            </Button>
                          }
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationNav meta={meta} basePath="/dashboard/customer" searchParams={{}} />
        </>
      )}
    </div>
  );
}
