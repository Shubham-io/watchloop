import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { AppLogo } from "../shared/AppLogo";

export default function Navbar() {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between gap-6">
      <AppLogo />

      <SearchBar />

      <UserDropdown />
    </header>
  );
}
