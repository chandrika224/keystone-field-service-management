import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Package,
  MapPin,
  Tag,
  Boxes,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import type {
  ManagerInventoryItem,
  InventoryStatus,
} from "@/data/manager/inventory";

import { getInventoryStatus } from "@/data/manager/inventory";

interface ManagerInventoryDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: ManagerInventoryItem | null;
}

export default function ManagerInventoryDetailsDrawer({
  open,
  onOpenChange,
  item,
}: ManagerInventoryDetailsDrawerProps) {
  if (!item) {
    return null;
  }

  const status: InventoryStatus = getInventoryStatus(item);

  const getStatusDetails = () => {
    switch (status) {
      case "In Stock":
        return {
          icon: CheckCircle2,
          className: "bg-green-100 text-green-700",
        };

      case "Low Stock":
        return {
          icon: AlertTriangle,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "Out of Stock":
        return {
          icon: XCircle,
          className: "bg-red-100 text-red-700",
        };

      default:
        return {
          icon: Package,
          className: "bg-muted text-muted-foreground",
        };
    }
  };

  const statusDetails = getStatusDetails();

  const StatusIcon = statusDetails.icon;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="z-[2000] w-full overflow-y-auto sm:max-w-lg">

        {/* Header */}

        <SheetHeader>
          <SheetTitle>
            Inventory Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Item Information */}

          <div>
            <p className="text-sm font-medium text-primary">
              Inventory Item
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {item.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {item.id}
            </p>
          </div>

          {/* SKU */}

          <div className="flex items-start gap-3">
            <Tag className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                SKU
              </p>

              <p className="font-medium">
                {item.sku}
              </p>
            </div>
          </div>

          {/* Category */}

          <div className="flex items-start gap-3">
            <Package className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Category
              </p>

              <p className="font-medium">
                {item.category}
              </p>
            </div>
          </div>

          {/* Stock Information */}

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Current Stock
              </p>

              <p className="mt-1 text-2xl font-bold">
                {item.quantity}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.unit}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Minimum Stock
              </p>

              <p className="mt-1 text-2xl font-bold">
                {item.minimumStock}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.unit}
              </p>
            </div>

          </div>

          {/* Status */}

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Stock Status
            </p>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium ${statusDetails.className}`}
            >
              <StatusIcon className="h-4 w-4" />

              {status}
            </div>
          </div>

          {/* Location */}

          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Storage Location
              </p>

              <p className="font-medium">
                {item.location}
              </p>
            </div>
          </div>

          {/* Description */}

          <div className="flex items-start gap-3">
            <Boxes className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Description
              </p>

              <p className="mt-1 text-sm leading-6">
                {item.description}
              </p>
            </div>
          </div>

          {/* Low Stock Warning */}

          {status === "Low Stock" && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex items-start gap-3">

                <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600" />

                <div>
                  <p className="font-medium text-yellow-800">
                    Low Stock Alert
                  </p>

                  <p className="mt-1 text-sm text-yellow-700">
                    Current stock is at or below the
                    minimum required level. Consider
                    restocking this item.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Out of Stock Warning */}

          {status === "Out of Stock" && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">

                <XCircle className="mt-0.5 h-5 w-5 text-red-600" />

                <div>
                  <p className="font-medium text-red-800">
                    Out of Stock
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    This item is currently unavailable
                    and requires immediate restocking.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

      </SheetContent>
    </Sheet>
  );
}