'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api/user.api';
import { Form } from '@/components/layouts/form';
import Success from '@/components/result/success';
import type { User } from '@/model';

export default function Register() {
  const [done, setDone] = useState(false);

  const register = async (data: Record<string, string>) => {
    await api<User['auth']>({
      method: 'POST',
      url: '/auth/register',
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
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="mt-2 text-gray-500">
          or,{' '}
          <Link href="/login" className="text-indigo-600 font-medium">
            login to your account
          </Link>
        </p>
      </div>
      
      {done ? (
        <Success title="Verify your email address">
          Your account has been created, and we&apos;ve sent you an email with a confirmation link.
        </Success>
      ) : (
        <Form
          items={[
            { 
              name: 'name', 
              label: 'Name', 
              required: true 
            },
            { 
              name: 'email', 
              label: 'Email', 
              type: 'email', 
              required: true 
            },
            { 
              name: 'password', 
              label: 'Password', 
              type: 'password',
              hint: "If you don't set a password, we'll email you a login link"
            }
          ]}
          submitText="Create your account"
          onSubmit={register}
        />
      )}
    </div>
  );
}