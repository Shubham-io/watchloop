// components/shared/UserAvatar.tsx

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserAvatarProps {
  src?: string;
  name?: string;
  className?: string;
}

export function UserAvatar({ src, name = "User", className }: UserAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={src} className={className} />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
