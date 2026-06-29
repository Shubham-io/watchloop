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

export default function UserDropdown() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useLogout();

  const handleLogout = async () => {
    await mutateAsync();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
