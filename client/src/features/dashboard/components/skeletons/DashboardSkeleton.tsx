import StatsCardSkeleton from "./StatsCardSkeleton";

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
    </div>
  );
};

export default DashboardSkeleton;
