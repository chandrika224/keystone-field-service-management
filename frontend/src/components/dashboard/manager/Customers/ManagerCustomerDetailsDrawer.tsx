import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
} from "lucide-react";

import type { DispatcherCustomer } from "@/data/dispatcher/customers";

interface ManagerCustomerDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: DispatcherCustomer | null;
}

export default function ManagerCustomerDetailsDrawer({
  open,
  onOpenChange,
  customer,
}: ManagerCustomerDetailsDrawerProps) {

  if (!customer) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full sm:max-w-md">

        <SheetHeader>
          <SheetTitle>
            Customer Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Customer identity */}

          <div>
            <h2 className="text-2xl font-bold">
              {customer.companyName}
            </h2>

            <p className="text-muted-foreground">
              {customer.id}
            </p>
          </div>

          {/* Contact information */}

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Contact Person
                </p>

                <p className="font-medium">
                  {customer.contactPerson}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {customer.email}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-3">

              <Phone className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Phone
                </p>

                <p className="font-medium">
                  {customer.phone}
                </p>
              </div>

            </div>

          </div>

          {/* Customer overview */}

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-lg border p-4">

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />

                <p className="text-sm text-muted-foreground">
                  Sites
                </p>
              </div>

              <p className="mt-2 text-2xl font-bold">
                {customer.sites}
              </p>

            </div>

            <div className="rounded-lg border p-4">

              <div className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />

                <p className="text-sm text-muted-foreground">
                  Active Work Orders
                </p>
              </div>

              <p className="mt-2 text-2xl font-bold">
                {customer.activeWorkOrders}
              </p>

            </div>

          </div>

          {/* Manager information */}

          <div className="rounded-lg border bg-muted/40 p-4">

            <div className="flex items-center gap-2">

              <Building2 className="h-5 w-5 text-primary" />

              <p className="font-medium">
                Manager View
              </p>

            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              This view provides an overview of the customer,
              their registered sites, and active service work.
            </p>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}