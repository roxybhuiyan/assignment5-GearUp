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
import { PaginationNav } from "@/components/common/pagination-nav";
import { RentalStatusBadge } from "@/components/dashboard/status-badge";
import { StatusFilter } from "@/components/dashboard/status-filter";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RentalOrder } from "@/lib/types";

interface AdminRentalsPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

export default async function AdminRentalsPage({ searchParams }: AdminRentalsPageProps) {
  await requireRole("ADMIN");
  const { page, status } = await searchParams;
  const { items: rentals, meta } = await apiGetList<RentalOrder>("/admin/rentals", {
    searchParams: { page: page ?? "1", limit: 10, status },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Rental Orders</h1>
        <p className="text-sm text-muted-foreground">All rental orders across the platform.</p>
      </div>

      <StatusFilter
        paramKey="status"
        placeholder="Status"
        allLabel="All statuses"
        options={[
          { value: "PLACED", label: "Placed" },
          { value: "CONFIRMED", label: "Confirmed" },
          { value: "PAID", label: "Paid" },
          { value: "PICKED_UP", label: "Picked Up" },
          { value: "RETURNED", label: "Returned" },
          { value: "CANCELLED", label: "Cancelled" },
        ]}
      />

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gear</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.gear?.name ?? "Gear"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {order.customer?.fullName ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {order.provider?.fullName ?? "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(order.rentalStartDate)} - {formatDate(order.rentalEndDate)}
                </TableCell>
                <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                <TableCell>
                  <RentalStatusBadge status={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationNav meta={meta} basePath="/dashboard/admin/rentals" searchParams={{ status }} />
    </div>
  );
}
