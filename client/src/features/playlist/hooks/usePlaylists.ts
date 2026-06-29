import { useQuery } from "@tanstack/react-query";
import { playlistApi } from "../api/playlist.api";

export const usePlaylists = (userId: string) => {
  return useQuery({
    queryKey: ["playlists", userId],
    queryFn: () => playlistApi.getUserPlaylists(userId),
    enabled: !!userId,
  });
};