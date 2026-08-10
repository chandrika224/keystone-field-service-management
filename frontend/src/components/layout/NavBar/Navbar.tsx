import Breadcrumb from "./Breadcrumb";
import NotificationBell from "./NotificationBell";
import SearchBar from "./SearchBar";
import SidebarToggle from "./SidebarToggle";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
     <header className="flex h-20 items-center justify-between border-b border-border bg-background px-6">

      <Breadcrumb />

      <div className="flex items-center gap-4">

        <SearchBar />

        <NotificationBell />

        <ThemeToggle />

        <UserMenu />

      </div>

    </header>
  );
}