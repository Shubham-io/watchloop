import { useCurrentUser } from "@watchloop/features/auth/hooks/useCurrentUser";
import { ChangePasswordForm } from "../components/ChangePasswordForm";
import { useLogout } from "@watchloop/features/auth/hooks/useLogout";
import { Button } from "@watchloop/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@watchloop/store/hooks";
import { logout } from "@watchloop/features/auth/authSlice";
import { SettingsPageSkeleton } from "../components/skeletons/SettingsPageSkeleton";

const SettingsPage = () => {
  const { data: user, isPending } = useCurrentUser();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (isPending) {
    return <SettingsPageSkeleton />;
  }

  if (!user) {
    return (
      <div className="text-center text-muted-foreground">
        Unable to load settings.
      </div>
    );
  }

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container mx-auto max-w-3xl space-y-6 px-4 py-6 sm:space-y-8 sm:py-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>

      {/* Account Information */}
      <section className="rounded-lg border p-4 sm:p-6">
        <h2 className="mb-4 text-xl font-semibold">Account Information</h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p>{user.fullname}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Username</p>
            <p>@{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{user.email}</p>
          </div>
        </div>
      </section>

      {/* Change Password */}
      <section className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Change Password</h2>

        <ChangePasswordForm />
      </section>

      {/* Danger Zone */}
      <section className="rounded-lg border border-destructive p-6">
        <h2 className="mb-4 text-xl font-semibold text-destructive">
          Danger Zone
        </h2>

        <p className="text-sm text-muted-foreground">
          You can securely sign out of your account.
        </p>

        <div className="mt-6">
          <Button
            variant="destructive"
            disabled={isLoggingOut}
            onClick={handleLogout}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
