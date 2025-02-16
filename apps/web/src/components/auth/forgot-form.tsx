'use client';

import { useState } from 'react';
import { api } from '@/lib/api/user.api';
import { Form } from '@/components/layouts/form';
import type { User } from '@/model/index';
import Success from '@/components/result/success';

export default function ForgotPassword() {
  const [done, setDone] = useState(false);

  const forgot = async (data: Record<string, string>) => {
    await api<User['auth']>({
      method: 'POST',
      url: '/auth/forgot-password',
      body: {
        ...data,
        origin: window.location.origin,
      },
    });
    setDone(true);
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Reset password</h1>
      </div>
      
      {done ? (
        <Success title="Check your email">
          We&apos;ve sent you a new link to reset your password
        </Success>
      ) : (
        <Form
          items={[
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              required: true
            }
          ]}
          submitText="Request email"
          onSubmit={forgot}
        />
      )}
    </div>
  );
}