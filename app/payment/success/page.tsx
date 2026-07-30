import Link from "next/link";
import { cookies } from "next/headers";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/actions/payment.actions";
import { formatCurrency } from "@/lib/utils";
import { PENDING_ORDER_COOKIE } from "@/lib/constants";

interface PaymentSuccessPageProps {
  searchParams: Promise<{ rentalOrderId?: string }>;
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const sp = await searchParams;
  const rentalOrderId = sp.rentalOrderId ?? (await cookies()).get(PENDING_ORDER_COOKIE)?.value;

  if (!rentalOrderId) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <XCircle className="size-12 text-destructive" />
        <h1 className="text-2xl font-semibold">Missing order reference</h1>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find which order this payment belongs to.
        </p>
        <Button nativeButton={false} render={<Link href="/dashboard/customer">Go to my rentals</Link>} />
      </div>
    );
  }

  const result = await confirmPayment(rentalOrderId);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      {result.success ? (
        <>
          <CheckCircle2 className="size-12 text-green-600" />
          <h1 className="text-2xl font-semibold">Payment successful</h1>
          <p className="text-sm text-muted-foreground">
            {result.payment ? `You paid ${formatCurrency(result.payment.amount)}. ` : ""}
            Your rental is confirmed.
          </p>
        </>
      ) : (
        <>
          <XCircle className="size-12 text-destructive" />
          <h1 className="text-2xl font-semibold">Payment could not be confirmed</h1>
          <p className="text-sm text-muted-foreground">{result.message}</p>
        </>
      )}
      <Button nativeButton={false} render={<Link href="/dashboard/customer">Go to my rentals</Link>} />
    </div>
  );
}
