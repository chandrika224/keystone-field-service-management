export type PermissionAction =
  | "View"
  | "Create"
  | "Edit"
  | "Delete";

export interface StaffPermission {
  module: string;
  dispatcher: PermissionAction[];
  technician: PermissionAction[];
}

export const managerPermissions: StaffPermission[] = [
  {
    module: "Work Orders",
    dispatcher: ["View", "Create", "Edit"],
    technician: ["View", "Edit"],
  },
  {
    module: "Customers",
    dispatcher: ["View", "Create", "Edit"],
    technician: ["View"],
  },
  {
    module: "Sites",
    dispatcher: ["View", "Create", "Edit"],
    technician: ["View"],
  },
  {
    module: "Inventory",
    dispatcher: ["View", "Edit"],
    technician: ["View"],
  },
  {
    module: "Reports",
    dispatcher: ["View"],
    technician: [],
  },
  {
    module: "Staff Management",
    dispatcher: [],
    technician: [],
  },
];