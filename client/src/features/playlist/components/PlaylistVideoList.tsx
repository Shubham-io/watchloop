import type { Video } from "@watchloop/features/video/types/video.types";

import PlaylistVideoCard from "./PlaylistVideoCard";

type PlaylistVideoListProps = {
  videos: Video[];
  playlistId: string;
};

const PlaylistVideoList = ({
  videos,
  playlistId,
}: PlaylistVideoListProps) => {
  if (!videos.length) {
    return (
      <div className="rounded-xl border p-8 text-center">
        <p className="text-muted-foreground">
          No videos in this playlist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {videos.map((video) => (
        <PlaylistVideoCard
          key={video._id}
          video={video}
          playlistId={playlistId}
        />
      ))}
    </div>
  );
};

export default PlaylistVideoList;