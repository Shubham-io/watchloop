import type { RouteObject } from "react-router-dom";
import HomePage from "@watchloop/features/video/pages/HomePage";
import WatchPage from "@watchloop/features/video/pages/WatchPage";
import ChannelPage from "@watchloop/features/channel/page/ChannelPage";
import SearchPage from "@watchloop/features/video/pages/SearchPage";
import PlaylistsPage from "@watchloop/features/playlist/pages/PlaylistsPage";
import PlaylistPage from "@watchloop/features/playlist/pages/PlaylistPage";
import UploadVideoPage from "@watchloop/features/video/pages/UploadVideoPage";
import DashboardPage from "@watchloop/features/dashboard/pages/DashboardPage";

import { lazy } from "react";
const HistoryPage = lazy(
  () => import("@watchloop/features/user/pages/HistoryPage"),
);

export const protectedRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "watch/:videoId",
    element: <WatchPage />,
  },

  {
    path: "search",
    element: <SearchPage />,
  },

  {
    path: "channel/:username",
    element: <ChannelPage />,
  },

  {
    path: "playlists",
    element: <PlaylistsPage />,
  },
  {
    path: "playlists/:playlistId",
    element: <PlaylistPage />,
  },
  {
    path: "history",
    element: <HistoryPage />,
  },
  {
    path: "upload",
    element: <UploadVideoPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];
