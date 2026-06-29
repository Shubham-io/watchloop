import type { Playlist } from "../types/playlist.types";
import PlaylistCard from "./PlaylistCard";

type Props = {              
  playlists: Playlist[];
};

const PlaylistGrid = ({ playlists }: Props) => {
  if (!playlists.length) {
    return (
      <p className="text-muted-foreground">
        No playlists found.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist._id}
          playlist={playlist}
        />
      ))}
    </div>
  );
};

export default PlaylistGrid;