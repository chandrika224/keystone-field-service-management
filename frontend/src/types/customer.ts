export interface Customer {
  customerId: number;
  customerCode: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  userId: number | null;
}