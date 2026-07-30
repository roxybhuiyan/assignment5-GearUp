import { GearGridSkeleton } from "@/components/common/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <div className="h-20 animate-pulse rounded-lg bg-muted" />
      <GearGridSkeleton />
    </div>
  );
}
