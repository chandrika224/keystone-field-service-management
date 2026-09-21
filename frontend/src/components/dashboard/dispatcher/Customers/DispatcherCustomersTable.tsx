import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { Customer } from "@/types/customer";

interface DispatcherCustomersTableProps {
  customers: Customer[];
  search: string;
  onView: (customer: Customer) => void;
}

export default function DispatcherCustomersTable({
  customers,
  search,
  onView,
}: DispatcherCustomersTableProps) {
  const filteredCustomers = customers.filter((customer) => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return true;
    }

    return (
      (customer.customerName ?? "")
        .toLowerCase()
        .includes(searchValue) ||

      (customer.email ?? "")
        .toLowerCase()
        .includes(searchValue) ||

      (customer.phone ?? "")
        .toLowerCase()
        .includes(searchValue) ||

      (customer.address ?? "")
        .toLowerCase()
        .includes(searchValue) ||

      (customer.customerCode ?? "")
        .toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Contact
            </th>

            <th className="px-6 py-4 text-left">
              Address
            </th>

            <th className="px-6 py-4 text-left">
              Customer Code
            </th>

            <th className="px-6 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No customers found.
              </td>
            </tr>
          ) : (
            filteredCustomers.map((customer) => {
              const customerName =
                customer.customerName ?? "Unknown Customer";

              const initials = customerName
                .split(" ")
                .filter(Boolean)
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={customer.customerId}
                  className="border-t"
                >
                  {/* Customer */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium">
                          {customerName}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          #{customer.customerId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">
                        {customer.email ?? "—"}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {customer.phone ?? "—"}
                      </p>
                    </div>
                  </td>

                  {/* Address */}

                  <td className="px-6 py-4">
                    <p className="max-w-xs truncate">
                      {customer.address ?? "—"}
                    </p>
                  </td>

                  {/* Customer Code */}

                  <td className="px-6 py-4">
                    {customer.customerCode ?? "—"}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(customer)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}