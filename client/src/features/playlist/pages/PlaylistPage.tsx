import { useParams } from "react-router-dom";

import PlaylistHeader from "../components/PlaylistHeader";
import PlaylistVideoList from "../components/PlaylistVideoList";
import { usePlaylist } from "../hooks/usePlaylist";

const PlaylistPage = () => {
  const { playlistId } = useParams();

  const { data: playlist, isLoading } = usePlaylist(playlistId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!playlist) {
    return <div>Playlist not found</div>;
  }

  return (
    <div className="space-y-8">
      <PlaylistHeader playlist={playlist} />

      <PlaylistVideoList videos={playlist.videos} playlistId={playlist._id} />
    </div>
  );
};

export default PlaylistPage;
