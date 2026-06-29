// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { playlistApi } from "../api/playlist.api";

// export const useAddVideoToPlaylist = (
//   userId: string,
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: playlistApi.addVideoToPlaylist,

//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: ["playlist", variables.playlistId],
//       });

//       queryClient.invalidateQueries({
//         queryKey: ["playlists", userId],
//       });
//     },
//   });
// };



import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playlistApi } from "../api/playlist.api";
import type { PlaylistSummary } from "../types/playlist.types";

export const useAddVideoToPlaylist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: playlistApi.addVideoToPlaylist,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["playlists", userId],
      });

      const previousPlaylists = queryClient.getQueryData<PlaylistSummary[]>([
        "playlists",
        userId,
      ]);

      queryClient.setQueryData<PlaylistSummary[]>(
        ["playlists", userId],
        (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((playlist) => {
            if (playlist._id !== variables.playlistId) {
              return playlist;
            }

            if (playlist.videos.includes(variables.videoId)) {
              return playlist;
            }

            return {
              ...playlist,
              videos: [...playlist.videos, variables.videoId],
            };
          });
        }
      );

      return {
        previousPlaylists,
      };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["playlists", userId],
        context?.previousPlaylists
      );
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["playlists", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["playlist", variables.playlistId],
      });
    },
  });
};