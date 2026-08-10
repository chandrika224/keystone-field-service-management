export interface ReportSummary {
  totalWorkOrders: number;
  completedWorkOrders: number;
  pendingWorkOrders: number;
  cancelledWorkOrders: number;
  completionRate: number;
}

export interface WorkOrderPerformance {
  period: string;
  completed: number;
  pending: number;
  cancelled: number;
}

export interface TechnicianPerformance {
  id: string;
  name: string;
  assigned: number;
  completed: number;
}

export interface CustomerPerformance {
  id: string;
  customer: string;
  workOrders: number;
  completed: number;
  pending: number;
}

export interface ServicePerformance {
  service: string;
  workOrders: number;
  completed: number;
}

export interface ManagerReportsData {
  summary: ReportSummary;
  workOrderPerformance: WorkOrderPerformance[];
  technicianPerformance: TechnicianPerformance[];
  customerPerformance: CustomerPerformance[];
  servicePerformance: ServicePerformance[];
}

/*
 * --------------------------------------------------
 * Report Summary
 * --------------------------------------------------
 */

export const reportSummary: ReportSummary = {
  totalWorkOrders: 42,
  completedWorkOrders: 31,
  pendingWorkOrders: 8,
  cancelledWorkOrders: 3,
  completionRate: 74,
};

/*
 * --------------------------------------------------
 * Work Order Performance
 * --------------------------------------------------
 *
 * This data can later be replaced with API data.
 */

export const workOrderPerformance: WorkOrderPerformance[] = [
  {
    period: "Jan",
    completed: 18,
    pending: 5,
    cancelled: 2,
  },
  {
    period: "Feb",
    completed: 22,
    pending: 4,
    cancelled: 1,
  },
  {
    period: "Mar",
    completed: 25,
    pending: 6,
    cancelled: 2,
  },
  {
    period: "Apr",
    completed: 21,
    pending: 7,
    cancelled: 3,
  },
  {
    period: "May",
    completed: 28,
    pending: 5,
    cancelled: 2,
  },
  {
    period: "Jun",
    completed: 31,
    pending: 8,
    cancelled: 3,
  },
];

/*
 * --------------------------------------------------
 * Technician Performance
 * --------------------------------------------------
 */

export const technicianPerformance: TechnicianPerformance[] = [
  {
    id: "TECH-001",
    name: "Rahul Sharma",
    assigned: 12,
    completed: 10,
  },
  {
    id: "TECH-002",
    name: "Priya Nair",
    assigned: 10,
    completed: 8,
  },
  {
    id: "TECH-003",
    name: "Arun Kumar",
    assigned: 9,
    completed: 7,
  },
  {
    id: "TECH-004",
    name: "Sneha Patil",
    assigned: 7,
    completed: 5,
  },
  {
    id: "TECH-005",
    name: "Vikram Rao",
    assigned: 8,
    completed: 6,
  },
];

/*
 * --------------------------------------------------
 * Customer Performance
 * --------------------------------------------------
 */

export const customerPerformance: CustomerPerformance[] = [
  {
    id: "CUS-001",
    customer: "ABC Industries",
    workOrders: 12,
    completed: 9,
    pending: 3,
  },
  {
    id: "CUS-002",
    customer: "Tech Solutions Pvt Ltd",
    workOrders: 8,
    completed: 6,
    pending: 2,
  },
  {
    id: "CUS-003",
    customer: "Global Manufacturing",
    workOrders: 14,
    completed: 11,
    pending: 3,
  },
  {
    id: "CUS-004",
    customer: "Metro Facilities",
    workOrders: 8,
    completed: 5,
    pending: 3,
  },
];

/*
 * --------------------------------------------------
 * Service Performance
 * --------------------------------------------------
 */

export const servicePerformance: ServicePerformance[] = [
  {
    service: "AC Repair",
    workOrders: 12,
    completed: 9,
  },
  {
    service: "Preventive Maintenance",
    workOrders: 10,
    completed: 8,
  },
  {
    service: "Electrical Repair",
    workOrders: 8,
    completed: 6,
  },
  {
    service: "Plumbing Service",
    workOrders: 7,
    completed: 5,
  },
  {
    service: "Equipment Installation",
    workOrders: 5,
    completed: 3,
  },
];

/*
 * --------------------------------------------------
 * Combined Reports Data
 * --------------------------------------------------
 */

export const managerReports: ManagerReportsData = {
  summary: reportSummary,
  workOrderPerformance,
  technicianPerformance,
  customerPerformance,
  servicePerformance,
};

/*
 * --------------------------------------------------
 * Helper Functions
 * --------------------------------------------------
 */

export const getTechnicianCompletionRate = (
  technician: TechnicianPerformance
): number => {
  if (technician.assigned === 0) {
    return 0;
  }

  return Math.round(
    (technician.completed / technician.assigned) * 100
  );
};

export const getCustomerCompletionRate = (
  customer: CustomerPerformance
): number => {
  if (customer.workOrders === 0) {
    return 0;
  }

  return Math.round(
    (customer.completed / customer.workOrders) * 100
  );
};

export const getServiceCompletionRate = (
  service: ServicePerformance
): number => {
  if (service.workOrders === 0) {
    return 0;
  }

  return Math.round(
    (service.completed / service.workOrders) * 100
  );
};