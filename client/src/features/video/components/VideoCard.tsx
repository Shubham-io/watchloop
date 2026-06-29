import { Link } from "react-router-dom";

import type { Video } from "../types/video.types";
import { formatRelativeTime } from "@watchloop/utils/formatRelativeTime";
import { formatViews } from "@watchloop/utils/formatViews";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link to={`/watch/${video._id}`} className="flex flex-col gap-3">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={video.thumbnail.url}
          alt={video.title}
          className="aspect-video w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <img
          src={video.owner.avatar}
          alt={video.owner.fullname}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm font-medium">{video.title}</h3>

          {/* Channel name */}
          <p className="text-sm text-gray-500">{video.owner.fullname}</p>

          {/* Stats */}
          <p className="text-sm text-gray-500">
            {formatViews(video.views)} views •{" "}
            {formatRelativeTime(video.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
