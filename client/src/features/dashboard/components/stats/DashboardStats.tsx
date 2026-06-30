import {
  Eye,
  Heart,
  Users,
  Video,
} from "lucide-react";

import type { ChannelStats } from "../../types/dashboard.types";

import { StatsCard } from "./StatsCard";

interface DashboardStatsProps {
  stats: ChannelStats;
}

export const DashboardStats = ({
  stats,
}: DashboardStatsProps) => {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Subscribers"
          value={stats.totalSubscribers}
          icon={<Users className="size-8" />}
        />

        <StatsCard
          title="Videos"
          value={stats.totalVideos}
          icon={<Video className="size-8" />}
        />

        <StatsCard
          title="Views"
          value={stats.totalViews}
          icon={<Eye className="size-8" />}
        />

        <StatsCard
          title="Likes"
          value={stats.totalLikes}
          icon={<Heart className="size-8" />}
        />
      </div>
    </section>
  );
};