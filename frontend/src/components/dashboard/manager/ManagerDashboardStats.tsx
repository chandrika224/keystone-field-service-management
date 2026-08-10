import {
  ClipboardList,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ManagerDashboardStatsProps {
  totalWorkOrders: number;
  activeJobs: number;
  completedJobs: number;
  availableTechnicians: number;
}

export default function ManagerDashboardStats({
  totalWorkOrders,
  activeJobs,
  completedJobs,
  availableTechnicians,
}: ManagerDashboardStatsProps) {
  const stats = [
    {
      title: "Total Work Orders",
      value: totalWorkOrders,
      icon: ClipboardList,
      description: "All work orders",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: Clock,
      description: "Currently in progress",
    },
    {
      title: "Completed Jobs",
      value: completedJobs,
      icon: CheckCircle,
      description: "Successfully completed",
    },
    {
      title: "Available Technicians",
      value: availableTechnicians,
      icon: Users,
      description: "Ready for assignment",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="p-6">

              <div className="flex items-center justify-between">

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

                <div className="rounded-lg bg-primary/10 p-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

              </div>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}