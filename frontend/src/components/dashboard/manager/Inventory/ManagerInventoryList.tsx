import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import type {
  ManagerInventoryItem,
  InventoryStatus,
} from "@/data/manager/inventory";

import { getInventoryStatus } from "@/data/manager/inventory";

interface ManagerInventoryListProps {
  inventory: ManagerInventoryItem[];
  onView: (item: ManagerInventoryItem) => void;
}

const getStatusClasses = (status: InventoryStatus) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-700";

    case "Low Stock":
      return "bg-yellow-100 text-yellow-700";

    case "Out of Stock":
      return "bg-red-100 text-red-700";

    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function ManagerInventoryList({
  inventory,
  onView,
}: ManagerInventoryListProps) {
  if (inventory.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-10 text-center shadow-sm">
        <p className="font-medium">
          No inventory items found
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">

      {/* Desktop table */}

      <div className="hidden overflow-x-auto md:block">

        <table className="w-full">

          <thead className="border-b bg-muted/40">

            <tr className="text-left text-sm">

              <th className="px-5 py-4 font-medium">
                Item
              </th>

              <th className="px-5 py-4 font-medium">
                SKU
              </th>

              <th className="px-5 py-4 font-medium">
                Category
              </th>

              <th className="px-5 py-4 font-medium">
                Stock
              </th>

              <th className="px-5 py-4 font-medium">
                Minimum
              </th>

              <th className="px-5 py-4 font-medium">
                Status
              </th>

              <th className="px-5 py-4 text-right font-medium">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {inventory.map((item) => {

              const status = getInventoryStatus(item);

              return (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-muted/30"
                >

                  {/* Item */}

                  <td className="px-5 py-4">

                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {item.id}
                      </p>
                    </div>

                  </td>

                  {/* SKU */}

                  <td className="px-5 py-4 text-sm text-muted-foreground">
                    {item.sku}
                  </td>

                  {/* Category */}

                  <td className="px-5 py-4 text-sm">
                    {item.category}
                  </td>

                  {/* Quantity */}

                  <td className="px-5 py-4">

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <span className="ml-1 text-xs text-muted-foreground">
                      {item.unit}
                    </span>

                  </td>

                  {/* Minimum */}

                  <td className="px-5 py-4 text-sm">
                    {item.minimumStock} {item.unit}
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                        status
                      )}`}
                    >
                      {status}
                    </span>

                  </td>

                  {/* Action */}

                  <td className="px-5 py-4 text-right">

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        console.log(
                          "Inventory item viewed:",
                          item
                        );

                        onView(item);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* Mobile cards */}

      <div className="divide-y md:hidden">

        {inventory.map((item) => {

          const status = getInventoryStatus(item);

          return (
            <div
              key={item.id}
              className="space-y-4 p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {item.sku}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                    status
                  )}`}
                >
                  {status}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>
                  <p className="text-xs text-muted-foreground">
                    Category
                  </p>

                  <p className="font-medium">
                    {item.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Stock
                  </p>

                  <p className="font-medium">
                    {item.quantity} {item.unit}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Minimum Stock
                  </p>

                  <p className="font-medium">
                    {item.minimumStock} {item.unit}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Location
                  </p>

                  <p className="font-medium">
                    {item.location}
                  </p>
                </div>

              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-2"
                onClick={() => {
                  console.log(
                    "Inventory item viewed:",
                    item
                  );

                  onView(item);
                }}
              >
                <Eye className="h-4 w-4" />
                View Details
              </Button>

            </div>
          );
        })}

      </div>

    </div>
  );
}