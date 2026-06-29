import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistApi } from "../api/playlist.api";

export const useUpdatePlaylist = (userId: string, playlistId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.updatePlaylist,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["playlist", playlistId],
      });
    },
  });
};
