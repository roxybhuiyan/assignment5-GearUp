import { CreditCard } from "lucide-react";
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
import { PaymentStatusBadge } from "@/components/dashboard/status-badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { Payment } from "@/lib/types";

interface PaymentsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function CustomerPaymentsPage({ searchParams }: PaymentsPageProps) {
  await requireRole("CUSTOMER");
  const { page } = await searchParams;

  const { items: payments, meta } = await apiGetList<Payment>("/payments", {
    searchParams: { page: page ?? "1", limit: 10 },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Payment History</h1>
        <p className="text-sm text-muted-foreground">All payments you&apos;ve made on GearUp.</p>
      </div>
      {payments.length === 0 ? (
        <EmptyState
          icon={CreditCard}
          title="No payments yet"
          description="Payments will appear here once you rent gear."
        />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gear</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.rentalOrder?.gear.name ?? "Gear"}
                    </TableCell>
                    <TableCell>{formatCurrency(payment.amount)}</TableCell>
                    <TableCell>
                      <PaymentStatusBadge status={payment.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateTime(payment.paidAt ?? payment.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationNav meta={meta} basePath="/dashboard/customer/payments" searchParams={{}} />
        </>
      )}
    </div>
  );
}
