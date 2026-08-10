import { useState } from "react";

import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";

import ManagerCustomersToolbar
  from "@/components/dashboard/manager/Customers/ManagerCustomersToolbar";

import ManagerCustomersTable
  from "@/components/dashboard/manager/Customers/ManagerCustomersTable";

import {
  dispatcherCustomers,
} from "@/data/dispatcher/customers";

import type {
  DispatcherCustomer,
} from "@/data/dispatcher/customers";

import ManagerCustomerDetailsDrawer
  from "@/components/dashboard/manager/Customers/ManagerCustomerDetailsDrawer";

export default function ManagerCustomers() {

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState<DispatcherCustomer | null>(null);
  
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Customers"
        subtitle="Monitor customer accounts and service relationships."
      />

      <ManagerCustomersToolbar
        search={search}
        onSearchChange={setSearch}
      />

      <ManagerCustomersTable
        customers={dispatcherCustomers}
        search={search}
        onView={(customer) => {
          console.log(
            "Manager viewed customer:",
            customer
          );

          setSelectedCustomer(customer);
          setDrawerOpen(true);
        }}
      />

        <ManagerCustomerDetailsDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          customer={selectedCustomer}
        />
    </div>
  );
}