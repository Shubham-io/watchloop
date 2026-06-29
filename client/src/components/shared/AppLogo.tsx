import { Link } from "react-router-dom";

export function AppLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="WatchLoop" className="h-8 w-8" />
      <span className="font-bold text-xl">WatchLoop</span>
    </Link>
  );
}