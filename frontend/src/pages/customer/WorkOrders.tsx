import SectionHeader from "@/components/dashboard/shared/SectionHeader";
import WorkOrdersToolbar from "@/components/dashboard/customer/WorkOrders/WorkOrdersToolbar";
import WorkOrdersTable from "@/components/dashboard/customer/WorkOrders/WorkOrdersTable";


export default function WorkOrders() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="My Work Orders"
        subtitle="View and manage all your service requests."
      />

      <WorkOrdersToolbar />

      <WorkOrdersTable />
    </div>
  );
}