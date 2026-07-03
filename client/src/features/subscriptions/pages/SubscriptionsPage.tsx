import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@watchloop/components/ui/tabs";

// Replace with your auth hook/store
import { useCurrentUser } from "@watchloop/features/auth/hooks/useCurrentUser";

import UserListCard from "../components/UserListCard";
import SubscriptionsSkeleton from "../components/skeletons/SubscriptionsSkeleton";

import { useSubscribers } from "../hooks/useSubscribers";
import { useSubscribedChannels } from "../hooks/useSubscribedChannels";

export default function SubscriptionsPage() {
  const { data: user } = useCurrentUser();

  const { data: subscribers, isLoading: subscribersLoading } = useSubscribers(
    user._id,
  );

  const { data: channels, isLoading: channelsLoading } = useSubscribedChannels(
    user._id,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions</h1>

        <p className="text-muted-foreground">
          Manage your subscriptions and subscribers.
        </p>
      </div>

      <Tabs defaultValue="channels">
        <TabsList className="h-9 p-1">
          <TabsTrigger value="channels" className="h-7 px-3">Subscribed Channels</TabsTrigger>

          <TabsTrigger value="subscribers" className="h-7 px-3">Subscribers</TabsTrigger>
        </TabsList>

        <TabsContent value="channels">
          {channelsLoading ? (
            <SubscriptionsSkeleton />
          ) : channels?.channels.length === 0 ? (
            <p className="text-muted-foreground">
              You haven't subscribed to any channels yet.
            </p>
          ) : (
            <div className="space-y-4">
              {channels?.channels.map((channel) => (
                <UserListCard key={channel._id} user={channel} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="subscribers">
          {subscribersLoading ? (
            <SubscriptionsSkeleton />
          ) : subscribers?.subscribers.length === 0 ? (
            <p className="text-muted-foreground">
              No one has subscribed to your channel yet.
            </p>
          ) : (
            <div className="space-y-4">
              {subscribers?.subscribers.map((subscriber) => (
                <UserListCard key={subscriber._id} user={subscriber} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
