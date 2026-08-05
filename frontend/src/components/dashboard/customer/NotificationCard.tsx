import { Bell } from "lucide-react";

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationCard({
  title,
  message,
  time,
  read,
}: NotificationCardProps) {
  return (
    <div
      className={`
        flex items-start gap-4 rounded-xl border p-4 transition-all
        ${read ? "bg-background" : "bg-primary/5"}
      `}
    >
      <div
        className={`
          mt-1 h-3 w-3 rounded-full
          ${read ? "bg-gray-300" : "bg-primary"}
        `}
      />

      <div className="flex-1">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {message}
        </p>

        <p className="mt-3 text-xs text-muted-foreground">
          {time}
        </p>
      </div>

      <Bell className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}