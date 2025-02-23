'use client';

import { ChevronDown, Menu } from 'lucide-react';
import React, { useState } from 'react';

import ApiKeyManagementPage from '@/components/team-settings/ApiKey';
import BillingDetails from '@/components/team-settings/BillingDetils';
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
    label: 'Products',
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
      { id: 'billing details', label: 'Billing details', component: <BillingDetails /> },
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
      { id: 'API Keys', label: 'API Keys', component: <ApiKeyManagementPage /> },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubNavOpen, setMobileSubNavOpen] = useState(false);

  const handleMainNavChange = (navItem: MainNavItem) => {
    setActiveMainNav(navItem);
    setActiveSubNavId(navItem.subNavs?.[0]?.id || '');
    setMobileMenuOpen(false);
  };

  const handleSubNavChange = (subNavId: string) => {
    setActiveSubNavId(subNavId);
    setMobileSubNavOpen(false);
  };

  // Déterminer le composant actif
  const activeComponent = activeMainNav.subNavs
    ? activeMainNav.subNavs.find((sub) => sub.id === activeSubNavId)?.component
    : activeMainNav.component;

  // Obtenir le libellé du sous-nav actif pour l'affichage mobile
  const activeSubNavLabel = activeMainNav.subNavs?.find((sub) => sub.id === activeSubNavId)?.label;

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header principal - responsive */}
      <header className="bg-[#190341] text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#2a0a5e] md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="ml-2">{activeMainNav.label}</span>
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-8">
              {SETTINGS_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMainNavChange(item)}
                  className={`text-sm font-medium hover:text-gray-200 transition-colors py-2 px-1 border-b-2 ${
                    activeMainNav.id === item.id ? 'border-white font-bold' : 'border-transparent'
                  }`}
                  aria-selected={activeMainNav.id === item.id}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              {/* Placeholder pour l'équilibre visuel sur mobile */}
              <div className="w-6"></div>
            </div>
          </div>
        </div>

        {/* Mobile menu déroulant */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2a0a5e] shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {SETTINGS_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMainNavChange(item)}
                  className={`w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                    activeMainNav.id === item.id
                      ? 'bg-[#3b0e80] text-white'
                      : 'text-gray-200 hover:bg-[#3b0e80] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {Array.isArray(activeMainNav.subNavs) && activeMainNav.subNavs.length > 0 ? (
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Sidebar pour les sous-navigations */}
            <aside className="w-full md:w-64 flex-shrink-0">
              {/* Version mobile du sous-menu (dropdown) */}
              <div className="md:hidden mb-4">
                <button
                  type="button"
                  onClick={() => setMobileSubNavOpen(!mobileSubNavOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <span className="font-medium">
                    {activeSubNavLabel || 'Sélectionnez une option'}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      mobileSubNavOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileSubNavOpen && (
                  <div className="mt-2  rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    {activeMainNav.subNavs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSubNavChange(item.id)}
                        className={`w-full text-left px-4 py-3 text-sm ${
                          activeSubNavId === item.id
                            ? 'bg-gray-100 font-medium'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Version desktop du sous-menu (sidebar) */}
              <nav className="hidden md:block space-y-1 sticky top-20">
                {activeMainNav.subNavs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSubNavChange(item.id)}
                    className={cn(
                      `block w-full text-left rounded-lg px-3 py-2 text-base font-medium transition-colors`,
                      activeSubNavId === item.id
                        ? 'bg-gray-100 text-[#190341] font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                    aria-selected={activeSubNavId === item.id}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Contenu principal */}
            <main className="flex-grow mt-4 md:mt-0">
              <div className=" rounded-lg shadow-sm pb-4 px-4 md:px-6 md:pb-6 w-full">
                {activeComponent ?? <div>Sélectionnez une section</div>}
              </div>
            </main>
          </div>
        ) : (
          // Contenu sans sous-navigation
          <main className="w-full">
            <div className=" rounded-lg shadow-sm  p-4 md:p-6">
              {activeComponent ?? <div>Sélectionnez une section</div>}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
