import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { AppLogo } from "../shared/AppLogo";
import UploadButton from "./UploadButton";

export default function Navbar() {
  return (
    <header className="h-16 border-b px-6 flex items-center justify-between gap-6">
      <AppLogo />
      <SearchBar />
      <div className="flex items-center gap-4">
        <UploadButton />
        <UserDropdown />
      </div>
    </header>
  );
}
