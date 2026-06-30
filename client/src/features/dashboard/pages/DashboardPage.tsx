import { useChannelStats } from "../hooks/useChannelStats";
import { useChannelVideos } from "../hooks/useChannelVideos";

import { DashboardStats } from "../components/DashboardStats";
import { ChannelVideosTable } from "../components/videos/ChannelVideosTable";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

const DashboardPage = () => {
  const {
    data: stats,
    isPending: isStatsLoading,
    isError: isStatsError,
  } = useChannelStats();

  const {
    data: videos,
    isPending: isVideosLoading,
    isError: isVideosError,
  } = useChannelVideos();

  if (isStatsLoading || isVideosLoading) {
    return <DashboardSkeleton />;
  }

  if (isStatsError || isVideosError) {
    return <div>Failed to load dashboard.</div>;
  }

  return (
    <div className="space-y-8">
      <DashboardStats stats={stats!} />

      <ChannelVideosTable videos={videos ?? []} />
    </div>
  );
};

export default DashboardPage;
