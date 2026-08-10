export interface DispatcherCustomer {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sites: number;
  activeWorkOrders: number;
}

export const dispatcherCustomers: DispatcherCustomer[] = [
  {
    id: "CUS-001",
    companyName: "ABC Industries",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@abcindustries.com",
    phone: "+91 9876543210",
    sites: 3,
    activeWorkOrders: 4,
  },
  {
    id: "CUS-002",
    companyName: "Tech Solutions Pvt Ltd",
    contactPerson: "Priya Sharma",
    email: "priya@techsolutions.com",
    phone: "+91 9988776655",
    sites: 2,
    activeWorkOrders: 2,
  },
  {
    id: "CUS-003",
    companyName: "Global Manufacturing",
    contactPerson: "Arun Joseph",
    email: "arun@globalmanufacturing.com",
    phone: "+91 9123456789",
    sites: 5,
    activeWorkOrders: 6,
  },
  {
    id: "CUS-004",
    companyName: "Metro Facilities",
    contactPerson: "Sneha Patil",
    email: "sneha@metrofaciities.com",
    phone: "+91 9876512345",
    sites: 1,
    activeWorkOrders: 1,
  },
];