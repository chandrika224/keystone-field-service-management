export interface PageConfig {
  title: string;
  description: string;
}

export const pageConfig: Record<string, PageConfig> = {
  dashboard: {
    title: "Dashboard",
    description: "Overview of your system",
  },

  "work-orders": {
    title: "Work Orders",
    description: "Manage and track service requests",
  },

  customers: {
    title: "Customers",
    description: "Manage customer organizations",
  },

  sites: {
    title: "Sites",
    description: "Manage customer locations",
  },

  technicians: {
    title: "Technicians",
    description: "Manage field technicians",
  },

  inventory: {
    title: "Inventory",
    description: "Manage spare parts and stock",
  },

  reports: {
    title: "Reports",
    description: "Analyze business performance",
  },

  settings: {
    title: "Settings",
    description: "Configure application settings",
  },
};