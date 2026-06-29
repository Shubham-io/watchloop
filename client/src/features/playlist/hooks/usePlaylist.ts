import { useQuery } from "@tanstack/react-query";
import { playlistApi } from "../api/playlist.api";

export const usePlaylist = (playlistId: string) => {
  return useQuery({
    queryKey: ["playlist", playlistId],
    queryFn: () => playlistApi.getPlaylistById(playlistId),
    enabled: !!playlistId,
  });
};