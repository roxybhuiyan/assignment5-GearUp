import { MessageSquare, Star } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/common/empty-state";
import type { Review } from "@/lib/types";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No reviews yet"
        description="Be the first to rent and review this gear."
      />
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.customer?.fullName ?? "Customer"}</p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "size-4",
                    i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{review.reviewText}</p>
          <p className="mt-2 text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}
