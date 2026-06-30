import type { ChannelStats } from "../types/dashboard.types";

interface DashboardStatsProps {
  stats: ChannelStats;
}

export const DashboardStats = ({
  stats,
}: DashboardStatsProps) => {
  return (
    <div>
      Dashboard Stats
    </div>
  );
};