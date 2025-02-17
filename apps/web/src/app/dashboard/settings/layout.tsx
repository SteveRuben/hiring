import Link from 'next/link';
import type React from 'react';

import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const navigation = [
    { name: 'Settings', href: '/settings' },
    { name: 'Teams', href: '/teams' },
    { name: 'Developer', href: '/developer' },
  ];

  const sidebarNavigation = [
    { name: 'Profile', href: '/dashboard/settings' },
    { name: 'Emails', href: '/dashboard/settings/emails' },
    { name: 'Password', href: '/dashboard/settings/password' },
    { name: 'Identities', href: '/dashboard/settings/identities' },
    { name: 'Sessions', href: '/dashboard/settings/sessions' },
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-[#1a0b2e] text-white">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-gray-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 py-8">
          <aside className="col-span-12 sm:col-span-3">
            <nav className="space-y-1">
              {sidebarNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm font-medium',
                    'hover:bg-gray-100'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="col-span-12 sm:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
