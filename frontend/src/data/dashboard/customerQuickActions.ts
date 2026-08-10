import {
  PlusCircle,
  ClipboardList,
  Headset,
} from "lucide-react";

export const customerQuickActions = [
  {
    title: "New Request",
    description: "Create a new service request",
    icon: PlusCircle,
    onClick: () => console.log("New Request"),
  },
  {
    title: "My Requests",
    description: "View all your service requests",
    icon: ClipboardList,
    onClick: () => console.log("My Requests"),
  },
  {
    title: "Support",
    description: "Contact customer support",
    icon: Headset,
    onClick: () => console.log("Support"),
  },
];