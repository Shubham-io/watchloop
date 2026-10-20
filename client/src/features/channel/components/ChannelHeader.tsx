import {UserAvatar} from "@watchloop/components/shared/UserAvatar";

import SubscribeButton from "./SubscribeButton";

import { formatViews } from "@watchloop/utils/formatViews";
import type { Channel } from "../types/channel.types";

interface ChannelHeaderProps {
  channel: Channel;
}

export default function ChannelHeader({
  channel,
}: ChannelHeaderProps) {

    // console.log("channel =", channel);
  return (
    <section className="space-y-6">
      {/* Cover image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={channel.coverImage}
          alt={channel.fullname}
          className="h-48 w-full object-cover md:h-64"
        />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <UserAvatar
          src={channel.avatar}
          name={channel.fullname}
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {channel.fullname}
          </h1>

          <p className="text-muted-foreground">
            @{channel.username}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatViews(channel.subscribersCount)} subscribers
          </p>
        </div>

        <SubscribeButton
          channelId={channel._id}
          username={channel.username}
          isSubscribed={channel.isSubscribed}
        />
      </div>
    </section>
  );
}