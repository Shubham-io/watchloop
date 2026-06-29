import { Link } from "react-router-dom";

import type { Video } from "@watchloop/features/video/types/video.types";

import RemoveFromPlaylistButton from "./RemoveFromPlaylistButton";

type PlaylistVideoCardProps = {
  video: Video;
  playlistId: string;
};

const PlaylistVideoCard = ({ video, playlistId }: PlaylistVideoCardProps) => {
  return (
    <div className="flex gap-4 rounded-xl border p-4">
      <Link to={`/watch/${video._id}`} className="w-64 shrink-0">
        <img
          src={video.thumbnail.url}
          alt={video.title}
          className="aspect-video rounded-lg object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-2">
          <Link to={`/watch/${video._id}`}>
            <h3 className="font-semibold">{video.title}</h3>
          </Link>

          <p className="text-sm text-muted-foreground">
            {video.owner.fullname}
          </p>

          <p className="text-sm text-muted-foreground">{video.views} views</p>
        </div>

        <div className="mt-4">
          <RemoveFromPlaylistButton
            playlistId={playlistId}
            videoId={video._id}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistVideoCard;
