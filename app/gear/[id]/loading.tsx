import { DetailSkeleton } from "@/components/common/skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <DetailSkeleton />
    </div>
  );
}
