import { recentActivity } from "@/data/dashboard/recentActivity";
import { Clock3 } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border bg-card shadow-sm">
      <div className="divide-y">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-5"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <Clock3 className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                {activity.description}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}