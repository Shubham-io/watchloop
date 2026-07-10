import type { Video } from "../types/video.types";
import AddToPlaylistDialog from "../../playlist/components/AddToPlaylistDialog";
import { useToggleVideoLike } from "@watchloop/features/likes/hooks/useToggleVideoLike";
import { useParams } from "react-router-dom";
import { LikeButton } from "@watchloop/components/shared/LikeButton";

type VideoMetaProps = {
  video: Video;
};

const VideoMeta = ({ video }: VideoMetaProps) => {
  const toggleLike = useToggleVideoLike();

  const { videoId } = useParams();
  const handleLike = () => {
    if (!videoId) return;

    toggleLike.mutate(videoId);
  };
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{video.title}</h1>
      <div className="text-sm text-muted-foreground">{video.views} views</div>
      <div className="flex gap-4 item-center">
        <LikeButton
          isLiked={video.isLiked}
          likesCount={video.likesCount}
          isPending={toggleLike.isPending}
          onClick={() => handleLike()}
          className="p-2"
        />
        <AddToPlaylistDialog videoId={video._id} />
      </div>
    </div>
  );
};

export default VideoMeta;
