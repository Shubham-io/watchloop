import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistApi } from "../api/playlist.api";

export const useCreatePlaylist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.createPlaylist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists", userId],
      });
    },
  });
};