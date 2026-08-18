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
  Hash,
} from "lucide-react";

import type { Customer } from "@/services/customerService";

interface ManagerCustomerDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
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

          {/* ================================================== */}
          {/* Customer Identity */}
          {/* ================================================== */}

          <div>

            <h2 className="text-2xl font-bold">
              {customer.customerName}
            </h2>

            <p className="text-muted-foreground">
              Customer #{customer.customerId}
            </p>

          </div>


          {/* ================================================== */}
          {/* Contact Information */}
          {/* ================================================== */}

          <div className="space-y-4">

            {/* Name */}

            <div className="flex items-center gap-3">

              <User className="h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Customer Name
                </p>

                <p className="font-medium">
                  {customer.customerName || "N/A"}
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
                  {customer.email || "N/A"}
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
                  {customer.phone || "N/A"}
                </p>

              </div>

            </div>


            {/* Address */}

            <div className="flex items-start gap-3">

              <MapPin className="mt-0.5 h-5 w-5 text-primary" />

              <div>

                <p className="text-sm text-muted-foreground">
                  Address
                </p>

                <p className="font-medium">
                  {customer.address || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          {/* ================================================== */}
          {/* Customer Information */}
          {/* ================================================== */}

          <div className="grid grid-cols-2 gap-4">

            {/* Customer ID */}

            <div className="rounded-lg border p-4">

              <div className="flex items-center gap-2">

                <Hash className="h-5 w-5 text-primary" />

                <p className="text-sm text-muted-foreground">
                  Customer ID
                </p>

              </div>

              <p className="mt-2 text-lg font-bold">
                #{customer.customerId}
              </p>

            </div>


            {/* Customer Code */}

            <div className="rounded-lg border p-4">

              <div className="flex items-center gap-2">

                <Building2 className="h-5 w-5 text-primary" />

                <p className="text-sm text-muted-foreground">
                  Customer Code
                </p>

              </div>

              <p className="mt-2 text-lg font-bold">
                {customer.customerCode || "N/A"}
              </p>

            </div>

          </div>


          {/* ================================================== */}
          {/* Manager Information */}
          {/* ================================================== */}

          <div className="rounded-lg border bg-muted/40 p-4">

            <div className="flex items-center gap-2">

              <Building2 className="h-5 w-5 text-primary" />

              <p className="font-medium">
                Manager View
              </p>

            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              This view provides an overview of the customer's
              contact information and registered address.
            </p>

          </div>

        </div>

      </SheetContent>

    </Sheet>
  );
}