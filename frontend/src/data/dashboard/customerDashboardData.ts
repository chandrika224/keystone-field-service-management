import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  Users,
  type LucideIcon,
} from "lucide-react";

export type TrendType = "up" | "down";

export interface CustomerStat {
  title: string;
  value: number;
  description: string;
  trend: string;
  trendType: TrendType;
  icon: LucideIcon;
}

export const customerDashboardStats: CustomerStat[] = [
  {
  title: "Active Requests",
  value: 12,
  description: "Currently in progress",
  trend: "+12%",
  trendType: "up",
  icon: ClipboardList,
},
 {
  title: "Completed",
  value: 34,
  description: "Finished successfully",
  trend: "-3%",
  trendType: "down",
  icon: CircleCheckBig,
},
  {
    title: "Pending",
    value: 5,
    description: "Waiting for assignment",
    trend: "+5%",
    trendType: "up",
    icon: Clock3,
  },
  {
    title: "Customers",
    value: 148,
    description: "Registered customers",
    trend: "+10%",
    trendType: "up",
    icon: Users,
  },
];