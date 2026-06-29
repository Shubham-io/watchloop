import { Skeleton } from "@watchloop/components/ui/skeleton";

const PlaylistSkeleton = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="space-y-3 rounded-xl border p-4"
        >
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
};

export default PlaylistSkeleton;