import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/session";
import { apiGet, ApiError } from "@/lib/server-api";
import { RentalStatusBadge } from "@/components/dashboard/status-badge";
import { PayButton } from "@/components/dashboard/pay-button";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { RentalOrder } from "@/lib/types";

interface PayPageProps {
  params: Promise<{ id: string }>;
}

export default async function PayOrderPage({ params }: PayPageProps) {
  await requireRole("CUSTOMER");
  const { id } = await params;

  let order: RentalOrder;
  try {
    order = await apiGet<RentalOrder>(`/rentals/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  if (order.status !== "CONFIRMED") {
    redirect("/dashboard/customer");
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Complete Payment</h1>
        <p className="text-sm text-muted-foreground">
          Review your order and pay securely via Stripe.
        </p>
      </div>
      <div className="space-y-3 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">{order.gear?.name}</p>
          <RentalStatusBadge status={order.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          {formatDate(order.rentalStartDate)} - {formatDate(order.rentalEndDate)} &middot; Qty{" "}
          {order.quantity}
        </p>
        <p className="text-xl font-semibold">{formatCurrency(order.totalAmount)}</p>
      </div>
      <PayButton rentalOrderId={order.id} />
    </div>
  );
}
