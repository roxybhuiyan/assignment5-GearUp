"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/actions/payment.actions";
import { PENDING_ORDER_COOKIE } from "@/lib/constants";

export function PayButton({ rentalOrderId }: { rentalOrderId: string }) {
  const [isPending, startTransition] = useTransition();

  function handlePay() {
    startTransition(async () => {
      const result = await createCheckoutSession(rentalOrderId);
      if (result.success && result.checkoutUrl) {
        // The backend's Stripe success/cancel URLs are static, so stash the
        // order id here for the success/cancel pages to pick back up.
        document.cookie = `${PENDING_ORDER_COOKIE}=${rentalOrderId}; path=/; max-age=3600; samesite=lax`;
        window.location.href = result.checkoutUrl;
      } else {
        toast.error(result.message ?? "Failed to start checkout.");
      }
    });
  }

  return (
    <Button onClick={handlePay} disabled={isPending} className="w-full">
      {isPending ? "Redirecting to Stripe..." : "Pay Now"}
    </Button>
  );
}
