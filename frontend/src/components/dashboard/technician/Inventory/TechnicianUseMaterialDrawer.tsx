import { useMemo, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import type { TechnicianInventoryItem } from "@/data/technician/inventory";

interface TechnicianUseMaterialDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  items: TechnicianInventoryItem[];

  onUseMaterial: (
    itemId: string,
    quantity: number,
    workOrderId: string
  ) => void;
}

const workOrders = [
  {
    id: "WO-1001",
    title: "HVAC Maintenance",
  },
  {
    id: "WO-1002",
    title: "Electrical Repair",
  },
  {
    id: "WO-1003",
    title: "Plumbing Inspection",
  },
];

export default function TechnicianUseMaterialDrawer({
  open,
  onOpenChange,
  items,
  onUseMaterial,
}: TechnicianUseMaterialDrawerProps) {
  const [workOrderId, setWorkOrderId] =
    useState("");

  const [itemId, setItemId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const selectedItem = useMemo(
    () =>
      items.find(
        (item) => item.id === itemId
      ),
    [items, itemId]
  );

  const resetForm = () => {
    setWorkOrderId("");
    setItemId("");
    setQuantity("");
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      resetForm();
    }

    onOpenChange(value);
  };

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (
      !workOrderId ||
      !itemId ||
      !quantity
    ) {
      return;
    }

    const quantityUsed =
      Number(quantity);

    if (
      !Number.isFinite(quantityUsed) ||
      quantityUsed <= 0
    ) {
      return;
    }

    if (
      selectedItem &&
      quantityUsed > selectedItem.quantity
    ) {
      return;
    }

    onUseMaterial(
      itemId,
      quantityUsed,
      workOrderId
    );

    resetForm();
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={handleClose}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            Use Material
          </SheetTitle>

          <SheetDescription>
            Record material used for a work order.
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >
          {/* Work Order */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Work Order
            </label>

            <Select
              value={workOrderId}
              onValueChange={(value) => {
                setWorkOrderId(value ?? "");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select work order" />
              </SelectTrigger>

              <SelectContent>
                {workOrders.map(
                  (workOrder) => (
                    <SelectItem
                      key={workOrder.id}
                      value={workOrder.id}
                    >
                      {workOrder.id} —{" "}
                      {workOrder.title}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Item */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Material
            </label>

            <Select
              value={itemId}
              onValueChange={(value) => {
                setItemId(value ?? "");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select material" />
              </SelectTrigger>

              <SelectContent>
                {items
                  .filter(
                    (item) =>
                      item.quantity > 0
                  )
                  .map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                    >
                      {item.itemName} —{" "}
                      {item.quantity}{" "}
                      {item.unit} available
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Available Quantity */}

          {selectedItem && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                Available Quantity
              </p>

              <p className="mt-1 text-lg font-semibold">
                {selectedItem.quantity}{" "}
                {selectedItem.unit}
              </p>
            </div>
          )}

          {/* Quantity Used */}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Quantity Used
            </label>

            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  event.target.value
                )
              }
              placeholder="Enter quantity"
            />

            {selectedItem &&
              Number(quantity) >
                selectedItem.quantity && (
                <p className="text-sm text-destructive">
                  Quantity cannot exceed available
                  stock.
                </p>
              )}
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-3 border-t pt-5">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                handleClose(false)
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                !workOrderId ||
                !itemId ||
                !quantity ||
                (selectedItem
                  ? Number(quantity) >
                    selectedItem.quantity
                  : false)
              }
            >
              Record Usage
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}