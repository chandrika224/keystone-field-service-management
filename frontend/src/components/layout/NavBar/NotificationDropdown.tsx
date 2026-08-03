import NotificationItem from "./NotificationItem";
import { notifications } from "./notificationData";

export default function NotificationDropdown() {
  return (
    <div
      className="
        w-96
        overflow-hidden
        rounded-xl
        border
        bg-card
        shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-semibold text-slate-800">
          Notifications
        </h2>

        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
          {notifications.length}
        </span>
      </div>

      {/* Notification List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        ) : (
          <div className="p-6 text-center text-sm text-muted-foreground">
            No notifications available.
          </div>
        )}
      </div>

      {/* Footer */}
      <button
        className="
          w-full
          border-t
          py-3
          text-sm
          font-medium
          text-blue-600
          transition-colors
          hover:bg-background
        "
      >
        View All Notifications
      </button>
    </div>
  );
}