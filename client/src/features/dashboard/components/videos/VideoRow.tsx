import { Badge } from "@watchloop/components/ui/badge";
import { TableCell, TableRow } from "@watchloop/components/ui/table";
import type { ChannelVideo } from "../../types/dashboard.types";
import { VideoActions } from "./VideoActions";
import { PublishSwitch } from "./PublishSwitch";

interface VideoRowProps {
  video: ChannelVideo;

  onEdit: (video: ChannelVideo) => void;

  onDelete: (video: ChannelVideo) => void;
}

export const VideoRow = ({ video, onEdit, onDelete }: VideoRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-4">
          <img
            src={video.thumbnail.url}
            alt={video.title}
            loading="lazy"
            className="h-16 w-28 rounded object-cover"
          />

          <div className="space-y-1">
            <p className="font-medium">{video.title}</p>

            <p className="line-clamp-2 text-sm text-muted-foreground">
              {video.description}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell>{video.views.toLocaleString()}</TableCell>

      <TableCell>{video.likesCount.toLocaleString()}</TableCell>

      <TableCell>
        <div className="flex items-center gap-3">
          <Badge variant={video.isPublished ? "default" : "secondary"} className="min-w-[80px]">
            {video.isPublished ? "Published" : "Private"}
          </Badge>

          <PublishSwitch videoId={video._id} isPublished={video.isPublished} />
        </div>
      </TableCell>

      <TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell>

      <TableCell>
        <VideoActions
          video={video}
          onEdit={() => onEdit(video)}
          onDelete={() => onDelete(video)}
        />
      </TableCell>
    </TableRow>
  );
};
