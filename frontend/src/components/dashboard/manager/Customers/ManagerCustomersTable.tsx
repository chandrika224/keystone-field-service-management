import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { DispatcherCustomer } from "@/data/dispatcher/customers";

interface ManagerCustomersTableProps {
  customers: DispatcherCustomer[];
  search: string;
  onView: (customer: DispatcherCustomer) => void;
}

export default function ManagerCustomersTable({
  customers,
  search,
  onView,
}: ManagerCustomersTableProps) {

  const searchValue = search.toLowerCase();

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.companyName
        .toLowerCase()
        .includes(searchValue) ||

      customer.contactPerson
        .toLowerCase()
        .includes(searchValue) ||

      customer.email
        .toLowerCase()
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
              Contact Person
            </th>

            <th className="px-6 py-4 text-left">
              Phone
            </th>

            <th className="px-6 py-4 text-left">
              Sites
            </th>

            <th className="px-6 py-4 text-left">
              Active Work Orders
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
                colSpan={6}
                className="px-6 py-10 text-center text-muted-foreground"
              >
                No customers found.
              </td>
            </tr>

          ) : (

            filteredCustomers.map((customer) => {

              const initials = customer.companyName
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={customer.id}
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
                          {customer.companyName}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {customer.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium">
                        {customer.contactPerson}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {customer.email}
                      </p>

                    </div>

                  </td>

                  {/* Phone */}

                  <td className="px-6 py-4">
                    {customer.phone}
                  </td>

                  {/* Sites */}

                  <td className="px-6 py-4">
                    {customer.sites}
                  </td>

                  {/* Active Work Orders */}

                  <td className="px-6 py-4">
                    {customer.activeWorkOrders}
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