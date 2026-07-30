"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateOrderStatus } from "@/actions/rental.actions";
import type { RentalOrder } from "@/lib/types";

type Status = "CONFIRMED" | "CANCELLED" | "PICKED_UP" | "RETURNED";

export function OrderStatusActions({ order }: { order: RentalOrder }) {
  const [isPending, startTransition] = useTransition();

  function run(status: Status) {
    startTransition(async () => {
      const result = await updateOrderStatus(order.id, status);
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
    });
  }

  if (order.status === "PLACED") {
    return (
      <div className="flex gap-2">
        <Button size="sm" disabled={isPending} onClick={() => run("CONFIRMED")}>
          Confirm
        </Button>
        <Button size="sm" variant="outline" disabled={isPending} onClick={() => run("CANCELLED")}>
          Cancel
        </Button>
      </div>
    );
  }

  if (order.status === "PAID") {
    const paymentCompleted = order.payment?.status === "COMPLETED";
    return (
      <Button size="sm" disabled={isPending || !paymentCompleted} onClick={() => run("PICKED_UP")}>
        Mark Picked Up
      </Button>
    );
  }

  if (order.status === "PICKED_UP") {
    return (
      <Button size="sm" disabled={isPending} onClick={() => run("RETURNED")}>
        Mark Returned
      </Button>
    );
  }

  return <span className="text-sm text-muted-foreground">No actions</span>;
}
