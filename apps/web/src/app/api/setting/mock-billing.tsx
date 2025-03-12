export const account = {
  id: 'bill_1234567890',
  customerId: 'cus_1234567890',
  balance: 0,
  currency: 'FCFA',
  status: 'active',
  createdAt: new Date(2023, 0, 15).toISOString(),
  billingCycle: 'monthly',
  nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
};

export const settings = {
  companyName: 'Use Hiring',
  address: 'Pk14',
  city: 'Douala',
  postalCode: '75011',
  country: 'Cameroun',
  vatNumber: 'CM12345678901',
  billingEmail: 'facturation@usehiring.com',
  billingPrefix: 'UY',
};
