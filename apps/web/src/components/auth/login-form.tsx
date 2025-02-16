'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '@/model/user.store';
import { api, loginWithTokenResponse } from '@/lib/api/user.api';
import type { User } from '@/model';
import { Form } from '@/components/layouts/form';



export default function LoginForm() {
  const router = useRouter();
  const { users, setActiveUserIndex } = useUserStore();
  const [totpToken, setTotpToken] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const login = async (body: { email: string; password?: string }) => {
    const auth = await api<
      User['auth'] | { multiFactorRequired: true; totpToken: string; type: string }
    >({
      method: 'POST',
      url: '/auth/login',
      body: {
        ...body,
        origin: window.location.origin,
      },
    });

    if ('multiFactorRequired' in auth && auth.multiFactorRequired) {
      setTotpToken(auth.totpToken);
    } else {
      await loginWithTokenResponse(auth as User['auth']);
      router.push('/');
    }
  };

  const totpLogin = async (body: { token: string }) => {
    const auth = await api<User['auth']>({
      method: 'POST',
      url: '/auth/login/totp',
      body: {
        token: totpToken,
        code: body.token,
      },
    });
    
    await loginWithTokenResponse(auth);
    router.push('/');
  };

  const changeSession = (index: number) => {
    setActiveUserIndex(index);
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {users.length ? 'Login to another account' : 'Login to your account'}
        </h1>
        <p className="mt-2 text-gray-500">
          or,{' '}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-900 font-medium">
            create an account
          </Link>
        </p>
      </div>

      {users.length > 0 && (
        <div className="bg-gray-100 rounded mt-5 mb-2 py-4 px-6">
          <p className="text-gray-500">Active sessions</p>
          {users.map((user, index) => (
            <button
              key={user.details.id}
              className="flex w-full text-gray-900 hover:text-gray-500 select-none relative py-3 transition"
              onClick={() => changeSession(index)}
            >
              <div className="flex items-center">
                <Image
                  src={user.details.profilePictureUrl}
                  alt=""
                  width={24}
                  height={24}
                  className="flex-shrink-0 h-6 w-6 rounded-full"
                />
                <span className="ml-3 block font-normal truncate">
                  {user.details.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {totpToken ? (
        <Form
        // @ts-ignore
          onSubmit={totpLogin}
          items={[
            {
              name: 'token',
              type: 'number',
              label: 'One-time password',
              required: true,
            },
          ]}
          submitText="Login to your account"
        />
      ) : (
        <Form
        // @ts-ignore
          onSubmit={login}
          items={[
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              required: true,
            },
            {
              name: 'password',
              type: 'password',
              label: 'Password',
              required: false,
            },
          ]}
          submitText="Login to your account"
        />
      )}

      <div className="mt-5 text-sm text-center">
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="text-indigo-600 hover:text-indigo-900 font-medium"
        >
          Need help?
        </button>
        
        {showHelp && (
          <div className="bg-white shadow sm:rounded-lg p-4 mt-3 text-left text-gray-600">
            <nav className="space-y-2">
              <p>
                If you&apos;re unable to log in, you can{' '}
                <Link href="/forgot" className="text-indigo-600 hover:text-indigo-900 font-medium">
                  reset your password
                </Link>
                .
              </p>
              <p>
                If you haven&apos;t received the link to verify your email, you can{' '}
                <Link href="/resend" className="text-indigo-600 hover:text-indigo-900 font-medium">
                  resend email verification
                </Link>{' '}
                after a few minutes.
              </p>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}