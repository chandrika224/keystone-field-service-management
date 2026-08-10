import SectionHeader from "@/components/dashboard/shared/SectionHeader";

import ManagerReportsStats
  from "@/components/dashboard/manager/Reports/ManagerReportsStats";

import ManagerReportsToolbar
  from "@/components/dashboard/manager/Reports/ManagerReportsToolbar";

import ManagerReportsAnalytics
  from "@/components/dashboard/manager/Reports/ManagerReportsAnalytics";

import ManagerTechnicianPerformance
  from "@/components/dashboard/manager/Reports/ManagerTechnicianPerformance";

import ManagerCustomerServicePerformance
  from "@/components/dashboard/manager/Reports/ManagerCustomerServicePerformance";

import { useMemo, useState } from "react";

import {
  reportSummary,
  technicianPerformance,
  customerPerformance,
  servicePerformance,
  workOrderPerformance,
} from "@/data/manager/reports";

export default function ManagerReports() {

  const [period, setPeriod] = useState("Last 6 Months");
    const [customer, setCustomer] = useState("All");

    const customers = useMemo(() => {
      return customerPerformance.map(
        (item) => item.customer
      );
    }, []);

    const handlePeriodChange = (value: string) => {
      setPeriod(value);
    };

    const handleCustomerChange = (value: string) => {
      setCustomer(value);
    };

    const handleClearFilters = () => {
      setPeriod("Last 6 Months");
      setCustomer("All");
    };

    const filteredCustomers = useMemo(() => {
      if (customer === "All") {
        return customerPerformance;
      }

      return customerPerformance.filter(
        (item) => item.customer === customer
      );
    }, [customer]);

    const getPeriodMonths = (selectedPeriod: string) => {
  switch (selectedPeriod) {
    case "This Month":
      return ["Jun"];

    case "Last Month":
      return ["May"];

    case "This Quarter":
      return ["Apr", "May", "Jun"];

    case "This Year":
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ];

    case "Last 6 Months":
    default:
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ];
  }
};

const filteredWorkOrderPerformance = useMemo(() => {
  const months = getPeriodMonths(period);

  return workOrderPerformance.filter((item) =>
    months.includes(item.period)
  );
}, [period]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <SectionHeader
        title="Reports"
        subtitle="Operational performance and field-service analytics."
      />

      {/* Stats */}

      <ManagerReportsStats
        summary={reportSummary}
      />

      {/* Filters */}

      <ManagerReportsToolbar
          period={period}
          customer={customer}
          customers={customers}
          onPeriodChange={handlePeriodChange}
          onCustomerChange={handleCustomerChange}
          onClearFilters={handleClearFilters}
        />
      {/* Analytics */}

      <ManagerReportsAnalytics
        workOrderData={filteredWorkOrderPerformance}
      />

      {/* Technician Details */}

      <ManagerTechnicianPerformance
        technicians={technicianPerformance}
      />

      {/* Customer + Service Details */}

      <ManagerCustomerServicePerformance
        customers={filteredCustomers}
        services={servicePerformance}
      />

    </div>
  );
}