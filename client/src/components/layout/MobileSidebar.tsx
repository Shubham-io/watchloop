import { History, Home, ListVideo, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Subscriptions",
    icon: Users,
    path: "/subscriptions",
  },
  {
    label: "Playlists",
    icon: ListVideo,
    path: "/playlists",
  },
  {
    label: "History",
    icon: History,
    path: "/history",
  },
  {
    label: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function MobileSidebar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background shadow-lg md:hidden">
      <ul className="flex h-16 items-center justify-around">
        {navItems.map(({ label, icon: Icon, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                clsx(
                  "flex flex-col items-center gap-1 px-2 py-1 text-xs transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
