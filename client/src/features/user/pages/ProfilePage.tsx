import { useCurrentUser } from "@watchloop/features/auth/hooks/useCurrentUser";
import { ProfileHeader } from "../components/ProfileHeader";
import { ProfilePageSkeleton } from "../components/skeletons/ProfilePageSkeleton";

const ProfilePage = () => {
  const { data: user, isPending } = useCurrentUser();

  if (isPending) {
    return <ProfilePageSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center text-muted-foreground">
        Unable to load profile.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-8">
      <ProfileHeader user={user} />
    </div>
  );
};

export default ProfilePage;
