import type { User } from "@watchloop/types";
import { EditProfileDialog } from "./EditProfileDialog";
import { AvatarUploader } from "./AvatarUploader";
import { CoverUploader } from "./CoverUploader";

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <section className="rounded-lg border overflow-hidden">
      <CoverUploader user={user} />

      <div className="px-4 pb-6 sm:px-8 sm:pb-8">
        <div className="-mt-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <AvatarUploader user={user} />
          <EditProfileDialog user={user} />
        </div>

        <div className="mt-4 space-y-1 sm:mt-6">
          <h1 className="text-2xl font-bold sm:text-3xl">{user.fullname}</h1>

          <p className="text-muted-foreground">@{user.username}</p>

          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
    </section>
  );
};
