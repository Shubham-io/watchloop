import axiosInstance from "@watchloop/api/axios";
import type { ApiResponse } from "@watchloop/types/index";
import type { Playlist, PlaylistSummary } from "../types/playlist.types";

export const playlistApi = {
  getUserPlaylists: async (userId: string) => {
    const response = await axiosInstance.get<ApiResponse<PlaylistSummary[]>>(
      `/playlist/user/${userId}`,
    );

    return response.data.data;
  },

  getPlaylistById: async (playlistId: string) => {
    const response = await axiosInstance.get<ApiResponse<Playlist>>(
      `/playlist/${playlistId}`,
    );

    return response.data.data;
  },

  createPlaylist: async (payload: { name: string; description: string }) => {
    const response = await axiosInstance.post<ApiResponse<Playlist>>(
      "/playlist",
      payload,
    );

    return response.data.data;
  },

  updatePlaylist: async ({
    playlistId,
    payload,
  }: {
    playlistId: string;
    payload: {
      name: string;
      description: string;
    };
  }) => {
    const response = await axiosInstance.patch<ApiResponse<Playlist>>(
      `/playlist/${playlistId}`,
      payload,
    );

    return response.data.data;
  },

  deletePlaylist: async (playlistId: string) => {
    await axiosInstance.delete(`/playlist/${playlistId}`);
  },

  addVideoToPlaylist: async ({
    playlistId,
    videoId,
  }: {
    playlistId: string;
    videoId: string;
  }) => {
    const response = await axiosInstance.post<ApiResponse<Playlist>>(
      `/playlist/add/${videoId}/${playlistId}`,
    );

    return response.data.data;
  },

  removeVideoFromPlaylist: async ({
    playlistId,
    videoId,
  }: {
    playlistId: string;
    videoId: string;
  }) => {
    const response = await axiosInstance.delete<ApiResponse<Playlist>>(
      `/playlist/remove/${videoId}/${playlistId}`,
    );

    return response.data.data;
  },
};
