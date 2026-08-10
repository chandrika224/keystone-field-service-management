
import { customerNotifications } from "@/data/dashboard/customerNotifications";
import NotificationCard from "./NotificationCard";

export default function NotificationsPanel() {
  return (
    <div className="space-y-4">

      {customerNotifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          title={notification.title}
          message={notification.message}
          time={notification.time}
          read={notification.read}
        />
      ))}

    </div>
  );
}