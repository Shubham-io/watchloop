import { UserAvatar } from "@watchloop/components/shared/UserAvatar";
import type { Video } from "../types/video.types";
import { Button } from "@watchloop/components/ui/button";
import { Link } from "react-router-dom";

type ChannelInfoProps = {
  owner: Video["owner"];
};

const ChannelInfo = ({ owner }: ChannelInfoProps) => {

  return (
    <div className="flex items-center justify-between rounded-xl bg-muted p-4">
      <div className="flex gap-4">
        <Link to={`/channel/${owner.username}`}>
          <UserAvatar
            src={owner.avatar}
            name={owner.fullname}
            className="size-12"
          />
        </Link>

        <div>
          <Link to={`/channel/${owner.username}`}>
            <h2 className="font-medium">{owner.fullname}</h2>
            <p className="text-sm text-muted-foreground">@{owner.username}</p>
          </Link>
        </div>
      </div>

      <Button disabled>Subscribe</Button>
    </div>
  );
};

export default ChannelInfo;
