export const QUERY_KEYS = {
  CURRENT_USER: ["current-user"],
  VIDEOS: ["videos"],
  COMMENTS: ["comments"],
  PLAYLISTS: ["playlists"],
  SUBSCRIPTIONS: ["subscriptions"],
};

export const dashboardKeys = {
  stats: ["stats"] as const,
  videos: ["videos"] as const,
};

export const userKeys = {
  currentUser: ["current-user"] as const,
  watchHistory: ["watch-history"] as const,
};

export const subscriptionKeys = {
  subscribers: ["subscribers"] as const,
  subscribedChannels: ["subscribed-channels"] as const,
}