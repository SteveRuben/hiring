// app/billing/page.tsx
'use client';

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function BillingDetails() {
  const [customerDetails, setCustomerDetails] = useState({
    name: 'Anand Chowdhary',
    email: 'anandchowdhary@gmail.com',
    phone: '',
    address: '',
  });

  // Static info that would normally come from API
  const accountInfo = {
    balance: 'USD 0',
    customerId: 'cus_GzM6f06Q6w6s0e',
    invoicePrefix: 'EEDPCR39',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="max-w-3xl mx-auto  border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between bg-white px-6 py-4">
        <CardTitle className="text-xl font-bold text-purple-950">Customer details</CardTitle>
        <button className="rounded-md p-2 hover:bg-gray-100">
          <RefreshCw className="h-5 w-5 text-gray-500" />
        </button>
      </CardHeader>

      <CardContent className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-6">
          Manage your billing account details. This information will be used for invoicing.
        </p>

        {/* Account Info */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-purple-900">Account balance</span>
            <span className="text-gray-800">{accountInfo.balance}</span>
          </div>

          <div className="flex justify-between items-center py-2 bg-purple-50 px-3 rounded">
            <span className="font-medium text-purple-900">Customer ID</span>
            <span className="text-gray-800 font-mono text-sm">{accountInfo.customerId}</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-purple-900">Invoice prefix</span>
            <span className="text-gray-800 font-mono">{accountInfo.invoicePrefix}</span>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full border-gray-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={customerDetails.email}
                onChange={handleInputChange}
                className="w-full border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your billing phone number"
                value={customerDetails.phone}
                onChange={handleInputChange}
                className="w-full border-gray-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              id="address"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className="w-full border-gray-300"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
