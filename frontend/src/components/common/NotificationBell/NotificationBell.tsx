import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationBellProps {
  unreadCount?: number;
  onClick?: () => void;
}

export default function NotificationBell({
  unreadCount = 0,
  onClick,
}: NotificationBellProps) {
  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="rounded-full"
      >
        <Bell className="h-5 w-5" />
      </Button>

      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1 text-xs font-semibold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
}