import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  ShieldCheck,
} from "lucide-react";

import type { Customer } from "@/types/customer";

interface DispatcherCustomerDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
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
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">

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
                <User className="h-6 w-6 text-primary" />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {customer.customerName}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Customer #{customer.customerId}
                </p>
              </div>

            </div>
          </div>


          {/* Customer Information */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Customer Information
            </h3>

            {/* Customer Code */}

            <div className="flex items-center gap-3">

              <Hash className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Customer Code
                </p>

                <p className="font-medium">
                  {customer.customerCode ?? "—"}
                </p>
              </div>

            </div>

            {/* Customer Name */}

            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Customer Name
                </p>

                <p className="font-medium">
                  {customer.customerName}
                </p>
              </div>

            </div>

          </div>


          {/* Contact Information */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Contact Information
            </h3>

            {/* Email */}

            <div className="flex items-center gap-3">

              <Mail className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium break-all">
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


          {/* Address */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Address
            </h3>

            <div className="flex items-start gap-3">

              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Registered Address
                </p>

                <p className="font-medium">
                  {customer.address}
                </p>
              </div>

            </div>

          </div>


          {/* Account Information */}

          <div className="space-y-4">

            <h3 className="font-semibold">
              Account Information
            </h3>

            {/* User ID */}

            <div className="flex items-center gap-3">

              <Hash className="h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">
                  User ID
                </p>

                <p className="font-medium">
                  {customer.userId ?? "—"}
                </p>
              </div>

            </div>

          </div>


          {/* Status */}

          <div>

            <div className="mb-2 flex items-center gap-2">

              <ShieldCheck className="h-5 w-5 text-primary" />

              <p className="text-sm text-muted-foreground">
                Customer Status
              </p>

            </div>

            <Badge variant="default">
              Active
            </Badge>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}