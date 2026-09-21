import { useEffect, useState } from "react";
import { toast } from "sonner";

import DispatcherCustomersTable from "@/components/dashboard/dispatcher/Customers/DispatcherCustomersTable";
import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import DispatcherCustomerDetailsDrawer from "@/components/dashboard/dispatcher/Customers/DispatcherCustomerDetailsDrawer";
import DispatcherCustomersToolbar from "@/components/dashboard/dispatcher/Customers/DispatcherCustomersToolbar";

import { customerService } from "@/services/customerService";
import type { Customer } from "@/types/customer";

export default function DispatcherCustomers() {
  const [search, setSearch] = useState("");

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await customerService.getAllCustomers();

        setCustomers(data.content);
      } catch (error) {
        console.error(
          "Failed to load customers:",
          error
        );

        setError("Failed to load customers.");
        toast.error("Failed to load customers.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleViewCustomer = async (
    customer: Customer
  ) => {
    try {
      const data =
        await customerService.getCustomerById(
          customer.customerId
        );

      setSelectedCustomer(data);
      setDrawerOpen(true);
    } catch (error) {
      console.error(
        "Failed to load customer details:",
        error
      );

      toast.error(
        "Failed to load customer details."
      );
    }
  };

  return (
    <div className="space-y-6">

      <SectionHeader
        title="Customers"
        subtitle="View customer accounts and their service information."
      />

      <DispatcherCustomersToolbar
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div className="py-10 text-center text-muted-foreground">
          Loading customers...
        </div>
      ) : error ? (
        <div className="py-10 text-center text-destructive">
          {error}
        </div>
      ) : (
        <DispatcherCustomersTable
          customers={customers}
          search={search}
          onView={handleViewCustomer}
        />
      )}

      <DispatcherCustomerDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        customer={selectedCustomer}
      />

    </div>
  );
}