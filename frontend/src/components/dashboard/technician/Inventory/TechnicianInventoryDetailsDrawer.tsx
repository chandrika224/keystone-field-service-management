import {
  MapPin,
  Package,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { TechnicianInventoryItem } from "@/data/technician/inventory";

interface TechnicianInventoryDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: TechnicianInventoryItem | null;
}

export default function TechnicianInventoryDetailsDrawer({
  open,
  onOpenChange,
  item,
}: TechnicianInventoryDetailsDrawerProps) {
  if (!item) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>

            <div>
              <SheetTitle>
                {item.itemName}
              </SheetTitle>

              <SheetDescription>
                {item.partNumber}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status */}

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                item.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : item.status === "Low Stock"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status}
            </span>
          </div>

          {/* Category */}

          <div>
            <p className="text-sm text-muted-foreground">
              Category
            </p>

            <p className="mt-1 font-medium">
              {item.category}
            </p>
          </div>

          {/* Quantity */}

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Available Quantity
              </p>

              <p className="mt-2 text-xl font-semibold">
                {item.quantity}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.unit}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Minimum Quantity
              </p>

              <p className="mt-2 text-xl font-semibold">
                {item.minimumQuantity}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.unit}
              </p>
            </div>
          </div>

          {/* Location */}

          <div>
            <p className="text-sm text-muted-foreground">
              Storage Location
            </p>

            <div className="mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />

              <span className="font-medium">
                {item.location}
              </span>
            </div>
          </div>

          {/* Description */}

          <div>
            <p className="text-sm text-muted-foreground">
              Description
            </p>

            <p className="mt-2 text-sm leading-6">
              {item.description}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}