'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-[#190341] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium hover:text-gray-200 transition-colors ${
                    pathname === item.href ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-md text-white hover:bg-[#2a0966]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-2 pb-4 text-white">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-2 text-base text-white font-medium hover:bg-[#2a0966] ${
                    pathname === item.href ? 'font-bold' : 'font-normal'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col md:flex-row md:gap-8 pt-8">
          {/* Sidebar navigation */}
          <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
            <nav className="space-y-1 mb-6 md:sticky md:top-20">
              {sidebarNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-base md:text-lg font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-gray-50 font-bold'
                      : 'font-normal hover:bg-gray-100'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 w-full max-w-full overflow-hidden">
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
