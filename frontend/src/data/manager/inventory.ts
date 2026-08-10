export type InventoryStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

export interface ManagerInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minimumStock: number;
  unit: string;
  location: string;
  description: string;
}

export const managerInventory: ManagerInventoryItem[] = [
  {
    id: "INV-001",
    sku: "HVAC-FLT-001",
    name: "AC Air Filter",
    category: "HVAC Parts",
    quantity: 24,
    minimumStock: 10,
    unit: "pieces",
    location: "Bengaluru Warehouse",
    description:
      "Standard replacement air filter used for commercial AC service and maintenance.",
  },
  {
    id: "INV-002",
    sku: "HVAC-CMP-001",
    name: "AC Compressor",
    category: "HVAC Parts",
    quantity: 3,
    minimumStock: 5,
    unit: "pieces",
    location: "Bengaluru Warehouse",
    description:
      "Replacement compressor for commercial air-conditioning units.",
  },
  {
    id: "INV-003",
    sku: "HVAC-GAS-001",
    name: "Refrigerant Gas",
    category: "HVAC Materials",
    quantity: 18,
    minimumStock: 8,
    unit: "kg",
    location: "Bengaluru Warehouse",
    description:
      "Refrigerant gas used during AC installation, repair and maintenance.",
  },
  {
    id: "INV-004",
    sku: "ELEC-CBL-001",
    name: "Electrical Cable",
    category: "Electrical",
    quantity: 45,
    minimumStock: 20,
    unit: "meters",
    location: "Bengaluru Warehouse",
    description:
      "Electrical cable used for equipment installation and repair work.",
  },
  {
    id: "INV-005",
    sku: "ELEC-MCB-001",
    name: "MCB Circuit Breaker",
    category: "Electrical",
    quantity: 12,
    minimumStock: 10,
    unit: "pieces",
    location: "Bengaluru Warehouse",
    description:
      "Miniature circuit breaker used for electrical protection and replacement.",
  },
  {
    id: "INV-006",
    sku: "PLMB-VAL-001",
    name: "Water Control Valve",
    category: "Plumbing",
    quantity: 7,
    minimumStock: 10,
    unit: "pieces",
    location: "Bengaluru Warehouse",
    description:
      "Control valve used for plumbing maintenance and replacement work.",
  },
  {
    id: "INV-007",
    sku: "PLMB-PMP-001",
    name: "Water Pump",
    category: "Plumbing",
    quantity: 6,
    minimumStock: 3,
    unit: "pieces",
    location: "Bengaluru Warehouse",
    description:
      "Replacement water pump used for commercial plumbing systems.",
  },
  {
    id: "INV-008",
    sku: "MECH-BLT-001",
    name: "Industrial Belt",
    category: "Mechanical",
    quantity: 15,
    minimumStock: 5,
    unit: "pieces",
    location: "Mysuru Warehouse",
    description:
      "Industrial drive belt used for mechanical equipment maintenance.",
  },
  {
    id: "INV-009",
    sku: "MECH-BRG-001",
    name: "Ball Bearing",
    category: "Mechanical",
    quantity: 2,
    minimumStock: 5,
    unit: "pieces",
    location: "Mysuru Warehouse",
    description:
      "Replacement bearing used in motors and rotating mechanical equipment.",
  },
  {
    id: "INV-010",
    sku: "SAFETY-GLV-001",
    name: "Safety Gloves",
    category: "Safety Equipment",
    quantity: 0,
    minimumStock: 10,
    unit: "pairs",
    location: "Bengaluru Warehouse",
    description:
      "Protective gloves required for technician field-service activities.",
  },
  {
    id: "INV-011",
    sku: "SAFETY-HEL-001",
    name: "Safety Helmet",
    category: "Safety Equipment",
    quantity: 14,
    minimumStock: 8,
    unit: "pieces",
    location: "Bengaluru Warehouse",
    description:
      "Protective helmet required for technicians working at service locations.",
  },
  {
    id: "INV-012",
    sku: "TOOL-MTR-001",
    name: "Digital Multimeter",
    category: "Tools",
    quantity: 8,
    minimumStock: 5,
    unit: "pieces",
    location: "Technician Store",
    description:
      "Digital multimeter used by technicians for electrical diagnostics.",
  },
];

export const getInventoryStatus = (
  item: ManagerInventoryItem
): InventoryStatus => {
  if (item.quantity === 0) {
    return "Out of Stock";
  }

  if (item.quantity <= item.minimumStock) {
    return "Low Stock";
  }

  return "In Stock";
};