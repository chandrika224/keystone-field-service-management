import Breadcrumb from "./Breadcrumb";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "@/components/common/NotificationBell";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <Breadcrumb />

      <div className="flex items-center gap-5">
        <ThemeToggle />
        <NotificationBell unreadCount={4} />
        <UserMenu />
      </div>
    </header>
  );
}