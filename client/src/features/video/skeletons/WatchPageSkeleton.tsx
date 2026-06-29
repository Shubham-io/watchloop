import { Skeleton } from "@watchloop/components/ui/skeleton";

const WatchPageSkeleton = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Skeleton className="aspect-video rounded-xl" />

        <div className="space-y-2">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <Skeleton className="h-20 rounded-xl" />

        <Skeleton className="h-32 rounded-xl" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-28 rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default WatchPageSkeleton;