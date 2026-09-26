import { useEffect, useRef, useState } from "react";

import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerCustomersToolbar
  from "@/components/dashboard/manager/Customers/ManagerCustomersToolbar";

import ManagerCustomersTable
  from "@/components/dashboard/manager/Customers/ManagerCustomersTable";

import ManagerCustomerDetailsDrawer
  from "@/components/dashboard/manager/Customers/ManagerCustomerDetailsDrawer";

import { customerService } from "@/services/customerService";
import type { Customer } from "@/types/customer";

export default function ManagerCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const detailRequestId = useRef(0);

  useEffect(() => {
    let isCurrent = true;

    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await customerService.getAllCustomers(0, 20);

        if (isCurrent) {
          setCustomers(result.content);
        }
      } catch (err) {
        console.error("Failed to fetch customers:", err);

        if (isCurrent) {
          setError("Unable to load customers. Please try again.");
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    void fetchCustomers();

    return () => {
      isCurrent = false;
    };
  }, [reloadKey]);

  const handleViewCustomer = async (customer: Customer) => {
    const requestId = ++detailRequestId.current;

    setSelectedCustomer(customer);
    setDrawerOpen(true);
    setDetailLoading(true);
    setDetailError(null);

    try {
      const data = await customerService.getCustomerById(
        customer.customerId
      );

      if (requestId === detailRequestId.current) {
        setSelectedCustomer(data);
      }
    } catch (err) {
      console.error("Failed to fetch customer details:", err);

      if (requestId === detailRequestId.current) {
        setDetailError("Unable to load the latest customer details.");
      }
    } finally {
      if (requestId === detailRequestId.current) {
        setDetailLoading(false);
      }
    }
  };

  const handleDrawerOpenChange = (open: boolean) => {
    setDrawerOpen(open);

    if (!open) {
      detailRequestId.current += 1;
      setDetailLoading(false);
    }
  };

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
        <div className="rounded-lg border px-6 py-10 text-center text-muted-foreground">
          Loading customers...
        </div>
      ) : error ? (
        <div
          role="alert"
          className="rounded-lg border px-6 py-10 text-center"
        >
          <p className="text-destructive">{error}</p>

          <button
            type="button"
            className="mt-3 text-sm underline"
            onClick={() => setReloadKey((key) => key + 1)}
          >
            Retry
          </button>
        </div>
      ) : (
        <ManagerCustomersTable
          customers={customers}
          search={search}
          onView={handleViewCustomer}
        />
      )}

      <ManagerCustomerDetailsDrawer
        open={drawerOpen}
        onOpenChange={handleDrawerOpenChange}
        customer={selectedCustomer}
        loading={detailLoading}
        error={detailError}
      />
    </div>
  );
}