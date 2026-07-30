import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { rentalStatusStyles, paymentStatusStyles, userStatusStyles } from "@/lib/status";
import type { PaymentStatus, RentalStatus, UserStatus } from "@/lib/types";

export function RentalStatusBadge({ status }: { status: RentalStatus }) {
  const style = rentalStatusStyles[status];
  return (
    <Badge variant="outline" className={cn("border-transparent", style.className)}>
      {style.label}
    </Badge>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const style = paymentStatusStyles[status];
  return (
    <Badge variant="outline" className={cn("border-transparent", style.className)}>
      {style.label}
    </Badge>
  );
}

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const style = userStatusStyles[status];
  return (
    <Badge variant="outline" className={cn("border-transparent", style.className)}>
      {style.label}
    </Badge>
  );
}
