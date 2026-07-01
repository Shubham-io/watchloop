/* eslint-disable react-refresh/only-export-components */

import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import HomePage from "@watchloop/features/video/pages/HomePage";

const WatchPage = lazy(
  () => import("@watchloop/features/video/pages/WatchPage"),
);

const SearchPage = lazy(
  () => import("@watchloop/features/video/pages/SearchPage"),
);

const ChannelPage = lazy(
  () => import("@watchloop/features/channel/page/ChannelPage"),
);

const PlaylistsPage = lazy(
  () => import("@watchloop/features/playlist/pages/PlaylistsPage"),
);

const PlaylistPage = lazy(
  () => import("@watchloop/features/playlist/pages/PlaylistPage"),
);

const HistoryPage = lazy(
  () => import("@watchloop/features/user/pages/HistoryPage"),
);

const UploadVideoPage = lazy(
  () => import("@watchloop/features/video/pages/UploadVideoPage"),
);

const DashboardPage = lazy(
  () => import("@watchloop/features/dashboard/pages/DashboardPage"),
);

const ProfilePage = lazy(
  () => import("@watchloop/features/user/pages/ProfilePage"),
);

const SettingsPage = lazy(
  () => import("@watchloop/features/user/pages/SettingsPage"),
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
    path: "dashboard",
    element: <DashboardPage />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
];