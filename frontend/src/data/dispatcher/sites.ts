export interface DispatcherSite {
  id: string;
  name: string;
  customer: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  activeWorkOrders: number;
}

export const dispatcherSites: DispatcherSite[] = [
  {
    id: "SITE-001",
    name: "ABC Industries - Main Plant",
    customer: "ABC Industries",
    address: "45 Industrial Area, Peenya",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560058",
    activeWorkOrders: 3,
  },
  {
    id: "SITE-002",
    name: "ABC Industries - Warehouse",
    customer: "ABC Industries",
    address: "12 Warehouse Road, Yeshwanthpur",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560022",
    activeWorkOrders: 1,
  },
  {
    id: "SITE-003",
    name: "Tech Solutions - Office",
    customer: "Tech Solutions Pvt Ltd",
    address: "78 Electronic City Phase 1",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560100",
    activeWorkOrders: 2,
  },
  {
    id: "SITE-004",
    name: "Global Manufacturing - Factory",
    customer: "Global Manufacturing",
    address: "22 Industrial Estate",
    city: "Mysuru",
    state: "Karnataka",
    postalCode: "570016",
    activeWorkOrders: 4,
  },
  {
    id: "SITE-005",
    name: "Metro Facilities - Corporate Office",
    customer: "Metro Facilities",
    address: "15 MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560001",
    activeWorkOrders: 1,
  },
];