import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { AppLogo } from "../shared/AppLogo";
import UploadButton from "./UploadButton";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b px-3 md:px-5 lg:px-6">
      <AppLogo />
      <SearchBar />
      <div className="flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
        <UploadButton />
        <UserDropdown />
      </div>
    </header>
  );
}
