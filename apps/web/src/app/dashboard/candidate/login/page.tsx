'use client';
import Link from 'next/link';

import { useTranslation } from '@/components/i18n';

export default function CandidateLoginPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('candidateLogin.title')}</h2>
          <p className="mt-2 text-sm text-gray-600">{t('candidateLogin.subtitle')}</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('candidateLogin.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder={t('candidateLogin.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('candidateLogin.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder={t('candidateLogin.passwordPlaceholder')}
            />
          </div>

          <div>
            <Link
              href="/dashboard/candidate/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {t('candidateLogin.login')}
            </Link>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('candidateLogin.continueWith')}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/dashboard/candidate/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50"
            >
              {t('candidateLogin.uniqueAccessLink')}
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            {t('candidateLogin.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
