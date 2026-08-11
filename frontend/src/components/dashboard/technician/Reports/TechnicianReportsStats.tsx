import {
  FileText,
  Clock3,
  Send,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import type {
  TechnicianWorkReport,
} from "@/data/technician/reports";

interface TechnicianReportsStatsProps {
  reports: TechnicianWorkReport[];
}

export default function TechnicianReportsStats({
  reports,
}: TechnicianReportsStatsProps) {
  const totalReports = reports.length;

  const draftReports = reports.filter(
    (report) => report.status === "Draft"
  ).length;

  const submittedReports = reports.filter(
    (report) => report.status === "Submitted"
  ).length;

  const approvedReports = reports.filter(
    (report) => report.status === "Approved"
  ).length;

  const rejectedReports = reports.filter(
    (report) => report.status === "Rejected"
  ).length;

  const stats = [
    {
      title: "Total Reports",
      value: totalReports,
      icon: FileText,
    },
    {
      title: "Draft",
      value: draftReports,
      icon: Clock3,
    },
    {
      title: "Submitted",
      value: submittedReports,
      icon: Send,
    },
    {
      title: "Approved",
      value: approvedReports,
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: rejectedReports,
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

              <div className="rounded-lg bg-primary/10 p-2.5">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}