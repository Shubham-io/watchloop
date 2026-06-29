import CreatePlaylistDialog from "../components/CreatePlaylistDialog";
import PlaylistGrid from "../components/PlaylistGrid";
import PlaylistSkeleton from "../components/PlaylistSkeleton";

import { usePlaylists } from "../hooks/usePlaylists";
import type { RootState } from "@watchloop/store/store";
import { useAppSelector } from "@watchloop/store/hooks";

const PlaylistsPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { data: playlists, isLoading } = usePlaylists(user!._id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Playlists</h1>

        <CreatePlaylistDialog />
      </div>

      {isLoading ? (
        <PlaylistSkeleton />
      ) : (
        <PlaylistGrid playlists={playlists ?? []} />
      )}
    </div>
  );
};

export default PlaylistsPage;
