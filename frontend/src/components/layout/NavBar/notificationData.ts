export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export const notifications: Notification[] = [
  {
    id: 1,
    title: "Work Order Assigned",
    message: "WO-102 has been assigned to Technician Alex.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "New Customer",
    message: "ABC Industries has been added.",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    title: "Inventory Alert",
    message: "Spare Motor stock is running low.",
    time: "1 hour ago",
    unread: false,
  },
];