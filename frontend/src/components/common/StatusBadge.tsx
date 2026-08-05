import { Badge } from "@/components/ui/badge";


type WorkOrderStatus =
  | "NEW"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CLOSED"
  | "CANCELLED";

interface StatusBadgeProps {
  status: WorkOrderStatus;
}

const statusStyles: Record<WorkOrderStatus, string> = {
  NEW: "bg-blue-100 text-blue-700",
  ASSIGNED: "bg-purple-100 text-purple-700",
  IN_PROGRESS: "bg-orange-100 text-orange-700",
  ON_HOLD: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge className={statusStyles[status]}>
      {status.replaceAll("_", " ")}
    </Badge>
  );
}