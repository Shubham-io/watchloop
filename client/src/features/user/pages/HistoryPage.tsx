import VideoGrid from "@watchloop/features/video/components/VideoGrid";
import HomePageSkeleton from "@watchloop/features/video/skeletons/HomePageSkeleton";

import EmptyHistory from "../components/EmptyHistory";
import { useWatchHistory } from "../hooks/useWatchHistory";

const HistoryPage = () => {
  const { data: videos = [], isLoading } = useWatchHistory();

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  if (!videos.length) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Watch History</h1>

        <p className="text-muted-foreground">Videos you've watched recently</p>
      </div>

      <VideoGrid videos={videos} />
    </div>
  );
};

export default HistoryPage;
