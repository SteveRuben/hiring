'use client';

import { useState } from 'react';
import { api } from '@/lib/api/user.api';
import { Form } from '@/components/layouts/form';
import Success from '@/components/result/success';
import type { User } from '@/model';

export default function ResendVerification() {
  const [done, setDone] = useState(false);

  const resend = async (data: Record<string, string>) => {
    await api<User['auth']>({
      method: 'POST',
      url: '/auth/resend-email-verification',
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
        <h1 className="text-3xl font-bold">Resend email verification</h1>
      </div>
      
      {done ? (
        <Success title="Check your email">
          We&apos;ve sent you a new link to verify your email
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
          onSubmit={resend}
        />
      )}
    </div>
  );
}