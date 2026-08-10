import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import type { ReportSummary } from "@/data/manager/reports";

interface ManagerReportsStatsProps {
  summary: ReportSummary;
}

export default function ManagerReportsStats({
  summary,
}: ManagerReportsStatsProps) {
  const stats = [
    {
      title: "Total Work Orders",
      value: summary.totalWorkOrders,
      description: "Work orders in reporting period",
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: summary.completedWorkOrders,
      description: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Pending",
      value: summary.pendingWorkOrders,
      description: "Currently pending",
      icon: Clock3,
    },
    {
      title: "Completion Rate",
      value: `${summary.completionRate}%`,
      description: "Overall completion performance",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-2">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}