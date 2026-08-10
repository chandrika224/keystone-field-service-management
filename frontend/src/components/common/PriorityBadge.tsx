import { Badge } from "@/components/ui/badge";

interface PriorityBadgeProps {
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const priorityStyles = {
  LOW: "bg-green-100 text-green-700 hover:bg-green-100",
  MEDIUM: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  HIGH: "bg-orange-100 text-orange-700 hover:bg-orange-100",
  CRITICAL: "bg-red-100 text-red-700 hover:bg-red-100",
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge className={priorityStyles[priority]}>
      {priority}
    </Badge>
  );
}