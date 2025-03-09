export interface BillingSettings {
  companyName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  vatNumber?: string;
  billingEmail: string;
  billingPrefix?: string;
}

export interface BillingAccount {
  id: string;
  customerId: string;
  balance: number;
  currency: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  billingCycle: 'monthly' | 'annual';
  nextBillingDate: string;
}
