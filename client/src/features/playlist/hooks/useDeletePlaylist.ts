import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistApi } from "../api/playlist.api";

export const useDeletePlaylist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.deletePlaylist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists", userId],
      });
    },
  });
};