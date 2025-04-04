'use client';
import Link from 'next/link';

import { useTranslation } from '@/components/i18n';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">{t('homePage.title')}</h1>

        <div className="space-y-4">
          <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
            <Link href="/dashboard/candidate/login" className="block">
              <h2 className="text-lg font-medium text-blue-600">
                {t('homePage.userInterface.title')}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {t('homePage.userInterface.description')}
              </p>
            </Link>
          </div>
          <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
            <Link href="/dashboard/challenges" className="block">
              <h2 className="text-lg font-medium text-blue-600">
                {t('homePage.visitorInterface.title')}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {t('homePage.visitorInterface.description')}
              </p>
            </Link>
          </div>

          <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
            <Link href="/dashboard/admin" className="block">
              <h2 className="text-lg font-medium text-green-600">
                {t('homePage.adminInterface.title')}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {t('homePage.adminInterface.description')}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
