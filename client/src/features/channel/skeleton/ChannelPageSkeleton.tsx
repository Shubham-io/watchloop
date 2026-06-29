import HomePageSkeleton from "@watchloop/features/video/skeletons/HomePageSkeleton";
import { Skeleton } from "@watchloop/components/ui/skeleton";

export default function ChannelPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Cover */}
      <Skeleton className="h-48 w-full rounded-xl md:h-64" />

      {/* Channel Info */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Skeleton className="h-28 w-28 rounded-full" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>

        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      {/* Reuse video grid skeleton */}
      <HomePageSkeleton />
    </div>
  );
}