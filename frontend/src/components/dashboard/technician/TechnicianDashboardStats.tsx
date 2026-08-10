import {
  ClipboardList,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { TechnicianJob } from "@/data/technician/jobs";

interface TechnicianDashboardStatsProps {
  jobs: TechnicianJob[];
}

export default function TechnicianDashboardStats({
  jobs,
}: TechnicianDashboardStatsProps) {
  const assignedJobs = jobs.filter(
    (job) => job.status === "ASSIGNED"
  ).length;

  const inProgressJobs = jobs.filter(
    (job) => job.status === "IN_PROGRESS"
  ).length;

  const completedJobs = jobs.filter(
    (job) => job.status === "COMPLETED"
  ).length;

  const pendingJobs = jobs.filter(
    (job) =>
      job.status === "ASSIGNED" ||
      job.status === "ON_HOLD"
  ).length;

  const stats = [
    {
      title: "Assigned Jobs",
      value: assignedJobs,
      icon: ClipboardList,
    },
    {
      title: "In Progress",
      value: inProgressJobs,
      icon: Clock,
    },
    {
      title: "Completed",
      value: completedJobs,
      icon: CheckCircle,
    },
    {
      title: "Pending",
      value: pendingJobs,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}