"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { placeRental } from "@/actions/rental.actions";
import { initialActionState } from "@/lib/action-state";
import { useActionToast } from "@/hooks/use-action-toast";
import { formatCurrency, formatDate, rentalDays, toNumber } from "@/lib/utils";
import type { GearItem, User } from "@/lib/types";

interface RentNowFormProps {
  gear: GearItem;
  currentUser: User | null;
}

export function RentNowForm({ gear, currentUser }: RentNowFormProps) {
  const placeRentalForGear = placeRental.bind(null, gear.id);
  const [state, formAction, isPending] = useActionState(placeRentalForGear, initialActionState);
  useActionToast(state);

  const [range, setRange] = useState<DateRange | undefined>();
  const [quantity, setQuantity] = useState(1);

  const days = range?.from && range?.to ? rentalDays(range.from, range.to) : 0;
  const estimatedTotal = days * quantity * toNumber(gear.pricePerDay);
  const canRent = gear.availability && gear.stock > 0;

  if (!currentUser) {
    return (
      <div className="space-y-3 rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">Log in as a customer to rent this gear.</p>
        <Button
          className="w-full"
          nativeButton={false}
          render={<Link href={`/auth/login?next=/gear/${gear.id}`}>Log in to rent</Link>}
        />
      </div>
    );
  }

  if (currentUser.role !== "CUSTOMER") {
    return (
      <p className="rounded-md border bg-muted p-4 text-sm text-muted-foreground">
        Only customer accounts can rent gear.
      </p>
    );
  }

  if (!canRent) {
    return (
      <p className="rounded-md border bg-muted p-4 text-sm text-muted-foreground">
        This gear is currently unavailable for rent.
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-lg border p-4">
      <input type="hidden" name="rentalStartDate" value={range?.from ? range.from.toISOString() : ""} />
      <input type="hidden" name="rentalEndDate" value={range?.to ? range.to.toISOString() : ""} />

      <div className="space-y-1.5">
        <Label>Rental dates</Label>
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="outline" type="button" className="w-full justify-start font-normal">
                <CalendarIcon className="size-4" />
                {range?.from && range?.to
                  ? `${formatDate(range.from)} - ${formatDate(range.to)}`
                  : "Select dates"}
              </Button>
            }
          />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
        {state.fieldErrors?.rentalStartDate && (
          <p className="text-sm text-destructive">{state.fieldErrors.rentalStartDate}</p>
        )}
        {state.fieldErrors?.rentalEndDate && (
          <p className="text-sm text-destructive">{state.fieldErrors.rentalEndDate}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={gear.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
        <p className="text-xs text-muted-foreground">{gear.stock} in stock</p>
      </div>

      {days > 0 && (
        <div className="rounded-md bg-muted p-3 text-sm">
          {days} day{days > 1 ? "s" : ""} &times; {quantity} &times; {formatCurrency(gear.pricePerDay)} ={" "}
          <span className="font-semibold">{formatCurrency(estimatedTotal)}</span>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isPending || !range?.from || !range?.to}>
        {isPending ? "Placing order..." : "Rent Now"}
      </Button>
    </form>
  );
}
