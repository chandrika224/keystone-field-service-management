import type { Notification } from "./notificationData";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  return (
    <button
      className="
        flex
        w-full
        flex-col
        items-start
        gap-1
        border-b
        px-4
        py-3
        text-left
        transition-colors
        hover:bg-background
      "
    >
      <div className="flex w-full justify-between">

        <p className="font-medium">
          {notification.title}
        </p>

        {notification.unread && (
          <span className="h-2 w-2 rounded-full bg-blue-600" />
        )}

      </div>

      <p className="text-sm text-muted-foreground">
        {notification.message}
      </p>

      <p className="text-xs text-slate-400">
        {notification.time}
      </p>
    </button>
  );
}