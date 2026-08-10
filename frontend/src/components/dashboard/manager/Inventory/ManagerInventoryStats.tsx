import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import type { ManagerInventoryItem } from "@/data/manager/inventory";
import { getInventoryStatus } from "@/data/manager/inventory";

interface ManagerInventoryStatsProps {
  inventory: ManagerInventoryItem[];
}

export default function ManagerInventoryStats({
  inventory,
}: ManagerInventoryStatsProps) {
  const totalItems = inventory.length;

  const inStock = inventory.filter(
    (item) => getInventoryStatus(item) === "In Stock"
  ).length;

  const lowStock = inventory.filter(
    (item) => getInventoryStatus(item) === "Low Stock"
  ).length;

  const outOfStock = inventory.filter(
    (item) => getInventoryStatus(item) === "Out of Stock"
  ).length;

  const stats = [
    {
      title: "Total Items",
      value: totalItems,
      icon: Package,
      description: "Inventory items",
    },
    {
      title: "In Stock",
      value: inStock,
      icon: CheckCircle2,
      description: "Healthy stock levels",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: AlertTriangle,
      description: "Needs attention",
    },
    {
      title: "Out of Stock",
      value: outOfStock,
      icon: XCircle,
      description: "Requires restocking",
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