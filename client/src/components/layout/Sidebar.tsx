import { NavLink } from "react-router-dom";
import { SIDEBAR_ITEMS } from "@watchloop/constants/sidebar";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r h-screen p-4">
      <div className="space-y-2">
        {SIDEBAR_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.title}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}