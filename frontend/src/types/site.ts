

export interface Site {
  id: number;
  name: string;
  address: string;
  customerId: number;
  customerName: string | null;
  activeWorkOrders: number | null;
}

export interface SiteRequest {
  name: string;
  address: string;
  customerId: number;
}

export type SiteResponse = Site;