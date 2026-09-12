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
  UserRound,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

import StatusBadge from "@/components/common/StatusBadge";
import type { CustomerWorkOrder } from "@/types/workOrder";

import WorkOrderTimeline from "./WorkOrderTimeline";

import { Button } from "@/components/ui/button";


// ============================================================
// PROPS
// ============================================================

interface WorkOrderDetailsDrawerProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  workOrder: CustomerWorkOrder | null;

  onCancel: (id: number) => void;

  onEdit: (order: CustomerWorkOrder) => void;
}


// ============================================================
// COMPONENT
// ============================================================

export default function WorkOrderDetailsDrawer({
  open,
  onOpenChange,
  workOrder,
  onCancel,
  onEdit,
}: WorkOrderDetailsDrawerProps) {

  console.log(
    "Drawer workOrder:",
    workOrder
  );


  // ==========================================================
  // NO WORK ORDER
  // ==========================================================

  if (!workOrder) {
    return null;
  }


  // ==========================================================
  // EDIT / CANCEL ELIGIBILITY
  // ==========================================================

  const editable =
    workOrder.status === "NEW" ||
    workOrder.status === "ASSIGNED";


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        className="sm:max-w-lg overflow-y-auto"
      >

        {/* ====================================================
            HEADER
            ==================================================== */}

        <SheetHeader className="border-b pb-6">

          <div className="space-y-3">

            <SheetTitle className="text-2xl font-bold">
              {workOrder.service}
            </SheetTitle>

            <SheetDescription className="text-base">
              Work Order ID: {workOrder.id}
            </SheetDescription>

            <StatusBadge
              status={workOrder.status}
            />

          </div>

        </SheetHeader>


        {/* ====================================================
            DETAILS
            ==================================================== */}

        <div className="mt-7 space-y-6">

          {/* ==================================================
              SERVICE INFORMATION
              ================================================== */}

          <Card>

            <CardContent className="space-y-5 p-6">

              <h3 className="font-semibold text-lg">
                Service Information
              </h3>


              {/* SERVICE */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <ClipboardList
                    className="h-4 w-4 text-primary"
                  />

                  <span>
                    Service
                  </span>

                </div>

                <span className="font-medium">
                  {workOrder.service}
                </span>

              </div>


              {/* TECHNICIAN */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <UserRound
                    className="h-4 w-4 text-primary"
                  />

                  <span>
                    Technician
                  </span>

                </div>

                <span className="font-medium">

                  {workOrder.technician}

                </span>

              </div>


              {/* CREATED / DATE */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <CalendarDays
                    className="h-4 w-4 text-primary"
                  />

                  <span>
                    Created
                  </span>

                </div>

                <span className="font-medium">

                  {workOrder.date}

                </span>

              </div>

            </CardContent>

          </Card>


          {/* ==================================================
              TIMELINE
              ================================================== */}

          <WorkOrderTimeline
            status={workOrder.status}
          />

        </div>


        {/* ====================================================
            ACTIONS
            ==================================================== */}

        <div className="mt-6 flex justify-end gap-3 border-t bg-background pt-4">

          {/* EDIT */}

          <Button
            variant="outline"
            disabled={!editable}
            onClick={() =>
              onEdit(workOrder)
            }
          >
            Edit Request
          </Button>


          {/* CANCEL */}

          <Button
            variant="destructive"
            disabled={!editable}
            onClick={() =>
              onCancel(workOrder.id)
            }
          >
            Cancel Request
          </Button>

        </div>

      </SheetContent>

    </Sheet>
  );
}