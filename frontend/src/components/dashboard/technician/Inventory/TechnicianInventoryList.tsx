import {
  Package,
  MapPin,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { TechnicianInventoryItem } from "@/data/technician/inventory";

interface TechnicianInventoryListProps {
  items: TechnicianInventoryItem[];
  onView: (item: TechnicianInventoryItem) => void;
}

export default function TechnicianInventoryList({
  items,
  onView,
}: TechnicianInventoryListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center">
        <Package className="mx-auto h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 font-semibold">
          No inventory items found
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="border-b p-5">
        <h2 className="font-semibold">
          Inventory Items
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Materials and equipment available for field work.
        </p>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="font-medium">
                  {item.itemName}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {item.partNumber} · {item.category}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.location}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div>
                <p className="text-xs text-muted-foreground">
                  Quantity
                </p>

                <p className="mt-1 font-semibold">
                  {item.quantity} {item.unit}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Minimum
                </p>

                <p className="mt-1 font-semibold">
                  {item.minimumQuantity} {item.unit}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Low Stock"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => onView(item)}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}