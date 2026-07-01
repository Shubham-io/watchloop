import {
  Eye,
  Heart,
  Users,
  Video,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@watchloop/components/ui/card";

import type { ChannelStats } from "../types/dashboard.types";

interface DashboardStatsProps {
  stats: ChannelStats;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const cards = [
    {
      title: "Subscribers",
      value: stats.totalSubscribers,
      icon: Users,
    },
    {
      title: "Videos",
      value: stats.totalVideos,
      icon: Video,
    },
    {
      title: "Views",
      value: stats.totalViews,
      icon: Eye,
    },
    {
      title: "Likes",
      value: stats.totalLikes,
      icon: Heart,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ title, value, icon: Icon }) => (
        <Card key={title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {title}
            </CardTitle>

            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">{value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};