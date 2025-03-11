import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type React from 'react';

import { I18nProvider } from '@/components/i18n';
import NavHeader from '@/components/layouts/nav/nav-header';
import AppStateProvider from '@/lib/providers/app-state-provider';
import { QueryProvider } from '@/lib/providers/query-provider';
import { SoundEffectProvider } from '@/lib/providers/sound-effect-provider';
import { ToastProvider } from '@/lib/providers/toast-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'UseHiring',
  description: 'More than a tools.\npersonalized way of hiring',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased min-h-screen bg-background`}
      >
        <QueryProvider>
          <AppStateProvider>
            <SoundEffectProvider
              soundUrls={{
                mp3: '/sounds/sounds.mp3',
                webm: '/sounds/sounds.webm',
              }}
            >
              <I18nProvider>
                <NavHeader />
                <div className="pt-16">{children}</div>
                <ToastProvider />
              </I18nProvider>
            </SoundEffectProvider>
          </AppStateProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
