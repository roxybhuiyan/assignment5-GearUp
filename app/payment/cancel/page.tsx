import Link from "next/link";
import { cookies } from "next/headers";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PENDING_ORDER_COOKIE } from "@/lib/constants";

interface PaymentCancelPageProps {
  searchParams: Promise<{ rentalOrderId?: string }>;
}

export default async function PaymentCancelPage({ searchParams }: PaymentCancelPageProps) {
  const sp = await searchParams;
  const rentalOrderId = sp.rentalOrderId ?? (await cookies()).get(PENDING_ORDER_COOKIE)?.value;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <XCircle className="size-12 text-muted-foreground" />
      <h1 className="text-2xl font-semibold">Payment cancelled</h1>
      <p className="text-sm text-muted-foreground">
        Your payment was not completed. You can try again anytime.
      </p>
      <div className="flex gap-2">
        {rentalOrderId && (
          <Button
            nativeButton={false}
            render={
              <Link href={`/dashboard/customer/orders/${rentalOrderId}/pay`}>Try again</Link>
            }
          />
        )}
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/dashboard/customer">Go to my rentals</Link>}
        />
      </div>
    </div>
  );
}
