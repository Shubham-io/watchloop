import type { Video } from "../types/video.types";
import VideoCard from "./VideoCard";
import GridLayout from "@watchloop/layouts/GridLayout";

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div>
      <GridLayout>
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </GridLayout>
    </div>
  );
};

export default VideoGrid;
