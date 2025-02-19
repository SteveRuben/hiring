'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';

import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Settings', href: '/dashboard/settings' },
    { name: 'Teams', href: '/dashboard/team-settings' },
    { name: 'Developer', href: '/dashboard/developer' },
  ];

  const sidebarNavigation = [
    { name: 'Profile', href: '/dashboard/settings' },
    { name: 'Emails', href: '/dashboard/settings/emails' },
    { name: 'Password', href: '/dashboard/settings/password' },
    { name: 'Identities', href: '/dashboard/settings/identities' },
    { name: 'Sessions', href: '/dashboard/settings/sessions' },
  ];

  return (
    <>
      <div className="h-screen overflow-hidden block">
        <header className="top-20 w-full h-24  max-w-7xl bg-[#190341] z-0 text-white">
          <nav className="  mr-24 ml-4  px-16 sm:px-32 lg:px-8">
            <div className="flex h-16 items-center justify-start space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-bold hover:text-gray-200 ${
                    pathname === item.href ? 'font-extrabold' : 'font-normal'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <div className="h pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          <div className="grid grid-cols-9 gap-8 py-0">
            <aside className="col-span-12 sm:col-span-3 mt-8">
              <nav className="space-y-1">
                {sidebarNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${cn(
                      `block rounded-lg px-3 py-2 text-xl font-medium  ${
                        pathname === item.href ? 'font-bold' : 'font-normal'
                      }`,
                      'hover:bg-gray-100'
                    )} `}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </aside>
            <div className="w-[800px] h-[800px] ">
              <main className="">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
