import { Link } from "react-router-dom";
import type { Playlist } from "../types/playlist.types";
import { Card, CardContent } from "@watchloop/components/ui/card";

type PlaylistCardProps = {
  playlist: Playlist;
};

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  return (
    <Link to={`/playlists/${playlist._id}`}>
      <Card className="hover:bg-muted/50 transition-colors">
        <CardContent className="space-y-2 p-4">
          <h3 className="font-semibold">{playlist.name}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {playlist.description}
          </p>

          <p className="text-xs text-muted-foreground">
            {playlist.videos.length} videos
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlaylistCard;