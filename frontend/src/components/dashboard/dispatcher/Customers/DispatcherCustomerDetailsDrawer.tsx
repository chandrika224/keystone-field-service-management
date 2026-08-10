import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
} from "lucide-react";

import type { DispatcherCustomer } from "@/data/dispatcher/customers";

interface DispatcherCustomerDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: DispatcherCustomer | null;
}

export default function DispatcherCustomerDetailsDrawer({
  open,
  onOpenChange,
  customer,
}: DispatcherCustomerDetailsDrawerProps) {
  if (!customer) {
    return null;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">

        <SheetHeader>
          <SheetTitle>
            Customer Details
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">

          {/* Customer Header */}

          <div>
            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {customer.companyName}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {customer.id}
                </p>
              </div>

            </div>
          </div>

          {/* Contact Information */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Contact Information
            </h3>

            {/* Contact Person */}

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

            {/* Email */}

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

            {/* Phone */}

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

          {/* Customer Summary */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Service Summary
            </h3>

            {/* Sites */}

            <div className="flex items-center gap-3">

              <MapPin className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Sites
                </p>

                <p className="font-medium">
                  {customer.sites}
                </p>
              </div>

            </div>

            {/* Active Work Orders */}

            <div className="flex items-center gap-3">

              <ClipboardList className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Active Work Orders
                </p>

                <p className="font-medium">
                  {customer.activeWorkOrders}
                </p>
              </div>

            </div>

          </div>

          {/* Status */}

          <div>

            <p className="mb-2 text-sm text-muted-foreground">
              Customer Status
            </p>

            <Badge variant="default">
              Active
            </Badge>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}