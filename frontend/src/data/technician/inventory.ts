export type TechnicianInventoryStatus =
  | "Available"
  | "Low Stock"
  | "Out of Stock";

export interface TechnicianInventoryItem {
  id: string;
  itemName: string;
  partNumber: string;
  category: string;

  quantity: number;
  minimumQuantity: number;

  unit: string;

  location: string;

  status: TechnicianInventoryStatus;

  description: string;
}

export const technicianInventory: TechnicianInventoryItem[] = [
  {
    id: "INV-001",
    itemName: "Copper Pipe",
    partNumber: "CP-001",
    category: "Plumbing",
    quantity: 24,
    minimumQuantity: 10,
    unit: "meters",
    location: "Warehouse A",
    status: "Available",
    description:
      "Standard copper pipe used for plumbing maintenance and installation.",
  },

  {
    id: "INV-002",
    itemName: "Air Filter",
    partNumber: "AF-101",
    category: "HVAC",
    quantity: 6,
    minimumQuantity: 10,
    unit: "pieces",
    location: "Technician Van",
    status: "Low Stock",
    description:
      "Replacement air filter for HVAC service operations.",
  },

  {
    id: "INV-003",
    itemName: "Electrical Fuse",
    partNumber: "EF-205",
    category: "Electrical",
    quantity: 0,
    minimumQuantity: 5,
    unit: "pieces",
    location: "Technician Van",
    status: "Out of Stock",
    description:
      "Electrical fuse used for equipment repair and maintenance.",
  },

  {
    id: "INV-004",
    itemName: "Pressure Gauge",
    partNumber: "PG-301",
    category: "HVAC",
    quantity: 8,
    minimumQuantity: 3,
    unit: "pieces",
    location: "Tool Storage",
    status: "Available",
    description:
      "Pressure gauge used for HVAC system diagnostics.",
  },
];