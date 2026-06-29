import type { Playlist } from "../types/playlist.types";

import EditPlaylistDialog from "./EditPlaylistDialog";
import DeletePlaylistButton from "./DeletePlaylistButton";

type Props = {
  playlist: Playlist;
};

const PlaylistHeader = ({ playlist }: Props) => {
  return (
    <div className="flex items-start justify-between gap-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{playlist.name}</h1>

        <p className="text-muted-foreground">{playlist.description}</p>

        <p className="text-sm text-muted-foreground">
          {playlist.videos.length} videos
        </p>
      </div>

      <div className="flex gap-2">
        <EditPlaylistDialog playlist={playlist} />

        <DeletePlaylistButton playlistId={playlist._id} />
      </div>
    </div>
  );
};

export default PlaylistHeader;
