export interface Customer {
  customerId: number;
  customerCode: string | null;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  userId: number | null;
}

export interface CustomerPageResponse {
  content: Customer[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}