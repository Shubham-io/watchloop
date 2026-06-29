import {
  Home,
  History,
  LayoutDashboard,
  Users,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },

  {
    title: "Subscriptions",
    href: "/subscriptions",
    icon: Users,
  },

  {
    title: "History",
    href: "/history",
    icon: History,
  },

  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];