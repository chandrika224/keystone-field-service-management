import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Hash,
  UserRound,
} from "lucide-react";

import type { Customer } from "@/types/customer";

interface ManagerCustomerDetailsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  loading?: boolean;
  error?: string | null;
}

export default function ManagerCustomerDetailsDrawer({
  open,
  onOpenChange,
  customer,
  loading = false,
  error = null,
}: ManagerCustomerDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Customer Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading customer details...
            </p>
          ) : error ? (
            <div
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/5 p-4"
            >
              <p className="font-medium">Could not load customer details</p>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          ) : !customer ? (
            <p className="text-sm text-muted-foreground">
              Select a customer to view their details.
            </p>
          ) : (
            <div className="space-y-6">
              {/* Customer identity */}
              <div>
                <h2 className="text-2xl font-bold">
                  {customer.customerName}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Customer ID: {customer.customerId}
                </p>
              </div>

              {/* Customer information */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Customer Code
                    </p>
                    <p className="font-medium">
                      {customer.customerCode ?? "Not assigned"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="break-all font-medium">
                      {customer.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">
                      {customer.address || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Linked User ID
                    </p>
                    <p className="font-medium">
                      {customer.userId ?? "No linked user"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Manager information */}
              <div className="rounded-lg border bg-muted/40 p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <p className="font-medium">Manager View</p>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  This profile shows the customer information returned by
                  the customer API. Registered sites and active work orders
                  are not included in this response.
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}