import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { Customer } from "@/types/customer";

interface ManagerCustomersTableProps {
  customers: Customer[];
  search: string;
  onView: (customer: Customer) => void;
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ManagerCustomersTable({
  customers,
  search,
  onView,
}: ManagerCustomersTableProps) {
  const searchValue = search.trim().toLowerCase();

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.customerName.toLowerCase().includes(searchValue) ||
      customer.email.toLowerCase().includes(searchValue) ||
      customer.phone.toLowerCase().includes(searchValue) ||
      customer.address.toLowerCase().includes(searchValue) ||
      (customer.customerCode ?? "").toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Customer Code</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Address</th>
            <th className="px-6 py-4 text-right">Action</th>
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
            filteredCustomers.map((customer) => (
              <tr key={customer.customerId} className="border-t">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {getInitials(customer.customerName)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">
                        {customer.customerName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {customer.customerId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {customer.customerCode ?? "—"}
                </td>

                <td className="px-6 py-4">
                  {customer.email}
                </td>

                <td className="px-6 py-4">
                  {customer.phone}
                </td>

                <td className="px-6 py-4">
                  <span className="block max-w-xs truncate">
                    {customer.address || "Not provided"}
                  </span>
                </td>

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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}