'use client';

import React, { useState } from 'react';

import TeamPage from '@/components/team-settings/TeamPage';
import { cn } from '@/lib/utils';

import SettingsPage from '../settings/page';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

type SubNav = {
  id: string;
  label: string;
  component: React.ReactNode;
};

type MainNavItem = {
  id: string;
  label: string;
  subNavs?: readonly SubNav[];
  component?: React.ReactNode;
};

// Définition des éléments de navigation
const SETTINGS_NAV: readonly MainNavItem[] = [
  {
    id: 'Products',
    label: 'Profil',
    subNavs: [
      { id: 'personal', label: 'Informations personnelles', component: <SettingsPage /> },
      { id: 'security', label: 'Sécurité', component: <div>Contenu sécurité</div> },
    ],
  },
  {
    id: 'Members',
    label: 'Members',
    component: <TeamPage />,
  },
  {
    id: 'billing',
    label: 'Billing',
    subNavs: [
      { id: 'billing details', label: 'Billing details', component: <div>Contenu plans</div> },
      { id: 'subscription', label: 'Subscription', component: <div>Contenu historique</div> },
      { id: 'payment methods', label: 'Payment methods', component: <div>Contenu historique</div> },
      { id: 'invoices', label: 'Invoices', component: <div>Contenu historique</div> },
      {
        id: 'credits & history',
        label: 'Credits & History',
        component: <div>Contenu historique</div>,
      },
    ],
  },
  {
    id: 'Developper',
    label: 'Developper',
    subNavs: [
      { id: 'API Keys', label: 'API Keys', component: <SettingsPage /> },
      { id: 'Webhooks', label: 'Webhooks', component: <div>Contenu sécurité</div> },
      { id: 'Logs', label: 'Logs', component: <div>Contenu sécurité</div> },
    ],
  },
  {
    id: 'Team Settings',
    label: 'Team Settings',
    component: <div>Manage Team</div>,
  },
] as const;

if (!SETTINGS_NAV || SETTINGS_NAV.length === 0) {
  throw new Error('SETTINGS_NAV must have at least one item');
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const firstNavItem: MainNavItem = SETTINGS_NAV[0] ?? {
    id: '',
    label: 'Aucune section',
    subNavs: [],
    component: <div>Aucune section disponible</div>,
  };
  const firstSubNav = firstNavItem.subNavs?.[0]?.id || '';

  const [activeMainNav, setActiveMainNav] = useState<MainNavItem>(firstNavItem);
  const [activeSubNavId, setActiveSubNavId] = useState<string>(firstSubNav);

  const handleMainNavChange = (navItem: MainNavItem) => {
    setActiveMainNav(navItem);
    setActiveSubNavId(navItem.subNavs?.[0]?.id || '');
  };

  const handleSubNavChange = (subNavId: string) => {
    setActiveSubNavId(subNavId);
  };

  // Déterminer le composant actif
  const activeComponent = activeMainNav.subNavs
    ? activeMainNav.subNavs.find((sub) => sub.id === activeSubNavId)?.component
    : activeMainNav.component;
  return (
    <>
      <div className="h-screen overflow-hidden block">
        <header className="top-20 w-full h-24  max-w-7xl bg-[#190341] z-0 text-white">
          <nav className="  mr-24 ml-4  px-16 sm:px-32 lg:px-8">
            <div className="flex h-16 items-center justify-start space-x-8">
              {SETTINGS_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMainNavChange(item)}
                  className={`text-sm font-bold hover:text-gray-200 ${
                    activeMainNav.id === item.id ? 'font-extrabold' : 'font-normal'
                  }`}
                  aria-selected={activeMainNav.id === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <div className="h pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0">
          {Array.isArray(activeMainNav.subNavs) && activeMainNav.subNavs.length > 0 ? (
            <div className="grid grid-cols-9 gap-8 py-0">
              <aside className="col-span-12 sm:col-span-3 mt-8">
                <nav className="space-y-1">
                  {activeMainNav.subNavs.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSubNavChange(item.id)}
                      className={`${cn(
                        `block rounded-lg px-3 py-2 text-xl font-medium  ${
                          activeSubNavId === item.id ? 'font-bold' : 'font-normal'
                        }`,
                        'hover:bg-gray-100'
                      )} `}
                      aria-selected={activeSubNavId === item.id}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </aside>
              <div className="w-[800px] h-full ">
                <main className="">{activeComponent ?? <div>Sélectionnez une section</div>}</main>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-9 gap-8 py-0">
              <div className="w-[1150px] h-full  ">
                <main className="">{activeComponent ?? <div>Sélectionnez une section</div>}</main>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
