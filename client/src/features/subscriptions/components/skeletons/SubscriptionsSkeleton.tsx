import { Skeleton } from "@watchloop/components/ui/skeleton";

export default function SubscriptionsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border p-4"
        >
          <Skeleton className="h-14 w-14 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}