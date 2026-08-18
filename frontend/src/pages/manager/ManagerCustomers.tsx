import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import SectionHeader
  from "@/components/dashboard/shared/SectionHeader";

import ManagerCustomersToolbar
  from "@/components/dashboard/manager/Customers/ManagerCustomersToolbar";

import ManagerCustomersTable
  from "@/components/dashboard/manager/Customers/ManagerCustomersTable";

import ManagerCustomerDetailsDrawer
  from "@/components/dashboard/manager/Customers/ManagerCustomerDetailsDrawer";

import {
  customerService,
  type Customer,
} from "@/services/customerService";

export default function ManagerCustomers() {
  const [search, setSearch] = useState("");

  const [customers, setCustomers] =
    useState<Customer[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        const response =
          await customerService.getAllCustomers();

        setCustomers(response.content);

      } catch (error) {
        console.error(
          "Failed to fetch customers:",
          error
        );

        toast.error(
          "Failed to load customers."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);


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

      {loading ? (

        <div className="flex h-64 items-center justify-center rounded-lg border bg-card text-muted-foreground">

          <Loader2
            className="mr-2 h-6 w-6 animate-spin text-primary"
          />

          <span>
            Loading customers...
          </span>

        </div>

      ) : (

        <ManagerCustomersTable
          customers={customers}
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

      )}

      <ManagerCustomerDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        customer={selectedCustomer}
      />

    </div>
  );
}