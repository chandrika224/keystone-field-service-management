import { Card, CardContent } from "@/components/ui/card";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function AccountSummaryCard() {
  const stats = [
    {
      title: "Total Requests",
      value: 8,
      icon: ClipboardList,
    },
    {
      title: "Completed",
      value: 5,
      icon: CheckCircle2,
    },
    {
      title: "In Progress",
      value: 2,
      icon: Clock3,
    },
    {
      title: "Cancelled",
      value: 1,
      icon: XCircle,
    },
  ];

  return (
    <Card>

      <CardContent className="p-6">

        <h2 className="mb-6 text-xl font-semibold">
          Account Summary
        </h2>

        <div className="space-y-5">

          {stats.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-lg border p-4"
              >

                <div className="flex items-center gap-3">

                  <Icon className="h-5 w-5 text-primary" />

                  <span className="font-medium">
                    {item.title}
                  </span>

                </div>

                <span className="text-xl font-bold">
                  {item.value}
                </span>

              </div>
            );
          })}

        </div>

      </CardContent>

    </Card>
  );
}