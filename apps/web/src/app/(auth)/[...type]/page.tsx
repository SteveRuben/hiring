'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, loginWithTokenResponse } from '@/lib/api/user.api';
import Error from '@/components/result/error';
import Success from '@/components/result/success';
import type { User } from '@/model';

type NotificationType = {
  text: string;
  type: 'success' | 'error';
};

// Cette fonction devrait être dans un store global ou un context
const setActiveNotification = (notification: NotificationType) => {
  // Implémenter la logique de notification ici
  console.log(notification);
};

interface VerifyProps {
  params: {
    type: string[];
  };
}

export default function Verify({ params }: VerifyProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<'ready' | 'loading' | 'success'>('ready');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const type = params.type.join('/');
  const token = searchParams.get('token');

  useEffect(() => {
    if (type !== 'reset-password') {
      verify();
    }
  }, [type]);

  const verify = async () => {
    setState('loading');
    try {
      const data: Record<string, string> = {
        token: token || '',
      };

      if (type === 'reset-password') {
        data.password = password;
      }

      const result = await api<User['auth'] | any>({
        method: 'POST',
        url: `/auth/${type}`,
        body: data,
      });

      const notifications = {
        'reset-password': 'Your password has been changed',
        'approve-subnet': 'Your location has been verified',
        'verify-email': 'Your email has been verified',
      };

      setActiveNotification({
        text: notifications[type as keyof typeof notifications] || 'All done!',
        type: 'success',
      });

      if ('accessToken' in result) {
        await loginWithTokenResponse(result as User['auth']);
        router.push('/');
      }

      setError('');
      setState('success');
    } catch (err) {
      console.log(err);
      const errorMessage = err instanceof Error ? (err as any).message : 'An error occurred';
      setError(errorMessage);
      setTimeout(() => setError(''), 10000);
      setState('ready');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {type === 'reset-password' ? 'Reset your password' : 'Verifying your link...'}
        </h1>
      </div>

      {error ? (
        <Error error={error} />
      ) : state === 'success' ? (
        <Success title="All done!">
          We were able to successfully verify your link.
        </Success>
      ) : type === 'reset-password' ? (
        <div className="bg-white shadow sm:rounded-lg">
          <form onSubmit={(e) => { e.preventDefault(); verify(); }} className={state}>
            <div className="px-4 py-5 sm:px-6 space-y-4">
              <fieldset className="space-y-4">
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    New password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </fieldset>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 w-full border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow sm:rounded-lg py-2">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600" />
          </div>
        </div>
      )}
    </div>
  );
}