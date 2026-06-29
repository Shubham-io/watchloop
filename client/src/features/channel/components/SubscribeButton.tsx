import { Button } from "@watchloop/components/ui/button";
import  { useToggleSubscription } from "../hook/useToggleSubscription";

interface Props {
  channelId: string;
  username: string;
  isSubscribed: boolean;
}

export default function SubscribeButton({
  channelId,
  username,
  isSubscribed,
}: Props) {
  const mutation = useToggleSubscription(
    channelId,
    username
  );

  return (
    <Button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      {isSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
}