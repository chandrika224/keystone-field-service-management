import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import type { Customer } from "@/services/customerService";

interface ManagerCustomersTableProps {
  customers: Customer[];
  search: string;
  onView: (customer: Customer) => void;
}

export default function ManagerCustomersTable({
  customers,
  search,
  onView,
}: ManagerCustomersTableProps) {

  const searchValue = search.trim().toLowerCase();

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.customerName
        ?.toLowerCase()
        .includes(searchValue) ||

      customer.email
        ?.toLowerCase()
        .includes(searchValue) ||

      customer.phone
        ?.toLowerCase()
        .includes(searchValue) ||

      customer.address
        ?.toLowerCase()
        .includes(searchValue)
    );
  });

  return (
    <div className="overflow-hidden rounded-lg border">

      <table className="w-full">

        <thead className="bg-muted">
          <tr>

            <th className="px-6 py-4 text-left">
              Customer
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Phone
            </th>

            <th className="px-6 py-4 text-left">
              Address
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

              const initials = customer.customerName
                ?.split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase() || "CU";

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
                          {customer.customerName}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Customer #{customer.customerId}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Email */}

                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {customer.email || "N/A"}
                    </span>

                  </td>


                  {/* Phone */}

                  <td className="px-6 py-4">
                    {customer.phone || "N/A"}
                  </td>


                  {/* Address */}

                  <td className="px-6 py-4">

                    <span className="text-sm text-muted-foreground">
                      {customer.address || "Not provided"}
                    </span>

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