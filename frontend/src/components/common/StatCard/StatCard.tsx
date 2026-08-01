import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  iconColor = "text-blue-600",
}: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className={`rounded-full bg-slate-100 p-4 ${iconColor}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}