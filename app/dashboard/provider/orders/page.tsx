import { ClipboardList } from "lucide-react";
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
import { EmptyState } from "@/components/common/empty-state";
import { PaginationNav } from "@/components/common/pagination-nav";
import { RentalStatusBadge, PaymentStatusBadge } from "@/components/dashboard/status-badge";
import { OrderStatusActions } from "@/components/dashboard/order-status-actions";
import { StatusFilter } from "@/components/dashboard/status-filter";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RentalOrder } from "@/lib/types";

interface ProviderOrdersPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

export default async function ProviderOrdersPage({ searchParams }: ProviderOrdersPageProps) {
  await requireRole("PROVIDER");
  const { page, status } = await searchParams;
  const { items: orders, meta } = await apiGetList<RentalOrder>("/provider/orders", {
    searchParams: { page: page ?? "1", limit: 10, status },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Incoming Orders</h1>
        <p className="text-sm text-muted-foreground">Manage rental orders for your gear.</p>
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

      {orders.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No orders yet"
          description="Orders for your gear will show up here."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gear</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.gear?.name ?? "Gear"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.customer?.fullName ?? "Customer"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(order.rentalStartDate)} - {formatDate(order.rentalEndDate)}
                    </TableCell>
                    <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <RentalStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      {order.payment ? (
                        <PaymentStatusBadge status={order.payment.status} />
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <OrderStatusActions order={order} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationNav meta={meta} basePath="/dashboard/provider/orders" searchParams={{ status }} />
        </>
      )}
    </div>
  );
}
