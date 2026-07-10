import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { UserAvatar } from "../shared/UserAvatar";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@watchloop/features/auth/hooks/useLogout";
import { useAppDispatch } from "@watchloop/store/hooks";
import { logout } from "@watchloop/features/auth/authSlice";
import { useCurrentUser } from "@watchloop/features/auth/hooks/useCurrentUser";
import PageLoader from "../shared/PageLoader";

export default function UserDropdown() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useLogout();
  const { data: user, isPending } = useCurrentUser();

  const handleLogout = async () => {
    await mutateAsync();
    dispatch(logout());
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  if (isPending) return <PageLoader />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="rounded-full focus:outline-none">
          <UserAvatar
            src={user.avatar}
            className="cursor-pointer h-8 w-8 mt-2 md:h-10 md:w-10"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="hover:cursor-pointer"
        >
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleSettingsClick}
          className="hover:cursor-pointer"
        >
          Settings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="hover:cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
