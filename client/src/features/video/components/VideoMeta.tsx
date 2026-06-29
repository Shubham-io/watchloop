import type { Video } from "../types/video.types";
import AddToPlaylistDialog from "../../playlist/components/AddToPlaylistDialog";

type VideoMetaProps = {
  video: Video;
};

const VideoMeta = ({ video }: VideoMetaProps) => {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{video.title}</h1>

      <div className="text-sm text-muted-foreground">{video.views} views</div>
      <AddToPlaylistDialog videoId={video._id} />
    </div>
  );
};

export default VideoMeta;
