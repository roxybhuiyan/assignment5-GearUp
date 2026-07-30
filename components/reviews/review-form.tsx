"use client";

import { useActionState, useState, type ReactElement } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createReview } from "@/actions/review.actions";
import { initialActionState } from "@/lib/action-state";
import { useActionToast } from "@/hooks/use-action-toast";
import { cn } from "@/lib/utils";

export function ReviewForm({
  rentalOrderId,
  trigger,
}: {
  rentalOrderId: string;
  trigger: ReactElement;
}) {
  const createReviewForOrder = createReview.bind(null, rentalOrderId);
  const [state, formAction, isPending] = useActionState(createReviewForOrder, initialActionState);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);

  useActionToast(state, () => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="rating" value={rating} />
          <div className="space-y-1.5">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star`}>
                  <Star
                    className={cn(
                      "size-6",
                      n <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
            {state.fieldErrors?.rating && (
              <p className="text-sm text-destructive">{state.fieldErrors.rating}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="reviewText">Your review</Label>
            <Textarea id="reviewText" name="reviewText" required rows={4} />
            {state.fieldErrors?.reviewText && (
              <p className="text-sm text-destructive">{state.fieldErrors.reviewText}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Submitting..." : "Submit review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
