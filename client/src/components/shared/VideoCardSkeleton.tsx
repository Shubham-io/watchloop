import { Skeleton } from "@watchloop/components/ui/skeleton";

export default function VideoCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-video rounded-xl" />

      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}