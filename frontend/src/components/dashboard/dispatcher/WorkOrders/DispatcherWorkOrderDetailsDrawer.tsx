import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  User,
  ClipboardList,
  CalendarDays,
  Wrench,
} from "lucide-react";

import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import type { WorkOrderStatus } from "@/types/workOrder";

interface DispatcherWorkOrder {
  id: string;
  customer: string;
  service: string;
  priority: "High" | "Medium" | "Low";
  status: WorkOrderStatus;
  technician: string;
  date: string;
}

interface DispatcherWorkOrderDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workOrder: DispatcherWorkOrder | null;
  onAssign: (order: DispatcherWorkOrder) => void;
}

export default function DispatcherWorkOrderDetailsDrawer({
  open,
  onOpenChange,
  workOrder,
  onAssign,
}: DispatcherWorkOrderDetailsDrawerProps) {
  if (!workOrder) return null;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="sm:max-w-xl overflow-y-auto">

        <SheetHeader>

          <SheetTitle>
            {workOrder.service}
          </SheetTitle>

          <SheetDescription>
            {workOrder.id}
          </SheetDescription>

          <StatusBadge status={workOrder.status} />

        </SheetHeader>

        <div className="mt-8 space-y-6">

          <Card>

            <CardContent className="space-y-5 p-6">

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">
                  <User className="h-4 w-4" />
                  Customer
                </div>

                <span>{workOrder.customer}</span>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">
                  <ClipboardList className="h-4 w-4" />
                  Service
                </div>

                <span>{workOrder.service}</span>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">
                  <Wrench className="h-4 w-4" />
                  Technician
                </div>

                <span>{workOrder.technician}</span>

              </div>

              <div className="flex justify-between">

                <div className="flex gap-2 items-center">
                  <CalendarDays className="h-4 w-4" />
                  Date
                </div>

                <span>{workOrder.date}</span>

              </div>

            </CardContent>

          </Card>

          <div className="flex justify-end">

            <Button
                onClick={() => onAssign(workOrder)}
              >
                Assign Technician
              </Button>

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}