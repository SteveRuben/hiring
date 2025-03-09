'use client';

import { motion } from 'framer-motion';
import {
  Bell,
  ChevronLeft,
  Globe,
  Image,
  Lock,
  LogOut,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      title: 'Profil',
      href: '/parametres',
      icon: <User className="h-5 w-5" />,
      description: 'Gérez vos informations personnelles',
    },
    {
      title: 'Équipe',
      href: '/parametres/equipe',
      icon: <Users className="h-5 w-5" />,
      description: 'Gérez les membres de votre équipe',
    },
    {
      title: 'Localisation',
      href: '/parametres/localisation',
      icon: <Globe className="h-5 w-5" />,
      description: 'Configurez votre pays et fuseau horaire',
    },
    {
      title: 'Sécurité',
      href: '/parametres/securite',
      icon: <Lock className="h-5 w-5" />,
      description: 'Gérez votre mot de passe et sessions',
    },
    {
      title: 'Authentification à deux facteurs',
      href: '/parametres/securite/2fa',
      icon: <Shield className="h-5 w-5" />,
      description: 'Sécurisez votre compte avec la 2FA',
    },
    {
      title: 'Avatar',
      href: '/parametres/avatar',
      icon: <Image className="h-5 w-5" />,
      description: 'Personnalisez votre avatar',
    },
    {
      title: 'Notifications',
      href: '/parametres/notifications',
      icon: <Bell className="h-5 w-5" />,
      description: 'Configurez vos préférences de notifications',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link href="/dashboard" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Retour au dashboard
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Paramètres du compte</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-6">
        {/* Sidebar pour desktop */}
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <nav className="grid items-start px-2 py-4 lg:px-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Hiring Solution</span>
            </div>
            <div className="grid gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                    pathname === item.href
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
            <Separator className="my-4" />
            <Button variant="outline" size="sm" className="justify-start" asChild>
              <Link href="/connexion" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </Link>
            </Button>
          </nav>
        </aside>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-20 bg-background/80 backdrop-blur-sm md:hidden"
          >
            <div className="container py-4">
              <nav className="grid gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent',
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.icon}
                    <div className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/connexion" className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}

        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
