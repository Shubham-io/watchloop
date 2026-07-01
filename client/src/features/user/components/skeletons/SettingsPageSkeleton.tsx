import { Skeleton } from "@watchloop/components/ui/skeleton";

export const SettingsPageSkeleton = () => {
  return (
    <div className="container mx-auto max-w-3xl space-y-6 px-4 py-6">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>

      <Skeleton className="h-56 w-full rounded-lg" />
      <Skeleton className="h-80 w-full rounded-lg" />
      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  );
};