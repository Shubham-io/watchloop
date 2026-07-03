import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@watchloop/components/ui/avatar";

import type { SubscriptionUser } from "../types/subscription.types";

interface UserListCardProps {
  user: SubscriptionUser;
}

export default function UserListCard({ user }: UserListCardProps) {
  return (
    <Link
      to={`/channel/${user.username}`}
      className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
    >
      <Avatar className="h-14 w-14">
        <AvatarImage src={user.avatar} alt={user.fullname} />
        <AvatarFallback>
          {user.fullname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0">
        <h3 className="truncate font-medium">
          {user.fullname}
        </h3>

        <p className="truncate text-sm text-muted-foreground">
          @{user.username}
        </p>
      </div>
    </Link>
  );
}