import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  PlayCircle,
} from "lucide-react";

import type { TechnicianScheduleItem } from "@/data/technician/schedule";

interface TechnicianScheduleStatsProps {
  items: TechnicianScheduleItem[];
}

export default function TechnicianScheduleStats({
  items,
}: TechnicianScheduleStatsProps) {

  const totalJobs = items.length;

  const scheduledJobs = items.filter(
    (item) => item.status === "Scheduled"
  ).length;

  const inProgressJobs = items.filter(
    (item) => item.status === "In Progress"
  ).length;

  const completedJobs = items.filter(
    (item) => item.status === "Completed"
  ).length;

  const cancelledJobs = items.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: CalendarDays,
    },
    {
      title: "Scheduled",
      value: scheduledJobs,
      icon: Clock,
    },
    {
      title: "In Progress",
      value: inProgressJobs,
      icon: PlayCircle,
    },
    {
      title: "Completed",
      value: completedJobs,
      icon: CheckCircle2,
    },
    {
      title: "Cancelled",
      value: cancelledJobs,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-card p-5"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-5 w-5 text-primary" />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}