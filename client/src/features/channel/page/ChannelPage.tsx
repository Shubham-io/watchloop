import { useParams } from "react-router-dom";

import ChannelHeader from "../components/ChannelHeader";
import ChannelPageSkeleton from "../skeleton/ChannelPageSkeleton";

import { useChannel } from "../hook/useChannel";

import { useVideos } from "@watchloop/features/video/hooks/useVideos";
import VideoGrid from "@watchloop/features/video/components/VideoGrid";

export default function ChannelPage() {
  const { username } = useParams();

  const { data: channel, isLoading: isChannelLoading } = useChannel(username!);

  const { data: videos, isLoading: isVideosLoading } = useVideos({
    userId: channel?._id,
  });

  if (isChannelLoading || isVideosLoading) {
    return <ChannelPageSkeleton />;
  }

  if (!channel) {
    return (
      <div className="text-center text-muted-foreground">Channel not found</div>
    );
  }

  return (
    <div className="space-y-8">
      <ChannelHeader channel={channel} />

      {videos?.docs?.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No videos uploaded yet
        </div>
      ) : (
        <VideoGrid videos={videos?.docs ?? []} />
      )}
    </div>
  );
}
