import { Skeleton } from "@watchloop/components/ui/skeleton";

export const ProfilePageSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Cover */}
      <Skeleton className="h-40 w-full rounded-lg sm:h-56" />

      <div className="px-4 sm:px-8">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
          <Skeleton className="h-24 w-24 rounded-full sm:h-32 sm:w-32" />

          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mt-6 space-y-3">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-56" />
        </div>
      </div>
    </div>
  );
};