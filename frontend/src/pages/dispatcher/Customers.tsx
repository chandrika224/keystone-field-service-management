
import DispatcherCustomersTable from "@/components/dashboard/dispatcher/Customers/DispatcherCustomersTable";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import { dispatcherCustomers, type DispatcherCustomer } from "@/data/dispatcher/customers";
import { useState } from "react";
import DispatcherCustomerDetailsDrawer
  from "@/components/dashboard/dispatcher/Customers/DispatcherCustomerDetailsDrawer";
import DispatcherCustomersToolbar from "@/components/dashboard/dispatcher/Customers/DispatcherCustomersToolbar";

  export default function DispatcherCustomers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] =
  useState<DispatcherCustomer | null>(null);

const [drawerOpen, setDrawerOpen] =
  useState(false);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Customers"
        subtitle="Manage customer accounts and their service information."
      />

      <DispatcherCustomersToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <DispatcherCustomersTable
        customers={dispatcherCustomers}
        search={search}
        onView={(customer) => {
          console.log("Customer View clicked:", customer);

          setSelectedCustomer(customer);
          setDrawerOpen(true);
        }}
      />

      <DispatcherCustomerDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        customer={selectedCustomer}
      />
    </div>
  );
}