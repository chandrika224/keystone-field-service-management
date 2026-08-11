import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import type { TechnicianInventoryItem } from "@/data/technician/inventory";

interface TechnicianInventoryStatsProps {
  items: TechnicianInventoryItem[];
}

export default function TechnicianInventoryStats({
  items,
}: TechnicianInventoryStatsProps) {
  const totalItems = items.length;

  const availableItems = items.filter(
    (item) => item.status === "Available"
  ).length;

  const lowStockItems = items.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const outOfStockItems = items.filter(
    (item) => item.status === "Out of Stock"
  ).length;

  const stats = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Package,
    },
    {
      title: "Available",
      value: availableItems,
      icon: CheckCircle2,
    },
    {
      title: "Low Stock",
      value: lowStockItems,
      icon: AlertTriangle,
    },
    {
      title: "Out of Stock",
      value: outOfStockItems,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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