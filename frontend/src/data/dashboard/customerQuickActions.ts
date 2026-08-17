import {
  PlusCircle,
  ClipboardList,
  Headset,
} from "lucide-react";

import type { NavigateFunction } from "react-router-dom";

export const customerQuickActions = (
  navigate: NavigateFunction
) => [
  {
    title: "New Request",
    description: "Create a new service request",
    icon: PlusCircle,

    onClick: () =>
      navigate("/customer/work-orders", {
        state: {
          openNewRequest: true,
        },
      }),
  },

  {
    title: "My Requests",
    description: "View all your service requests",
    icon: ClipboardList,

    onClick: () =>
      navigate("/customer/work-orders"),
  },

  {
    title: "Support",
    description: "Contact customer support",
    icon: Headset,

    onClick: () =>
      navigate("/customer/support"),
  },
];