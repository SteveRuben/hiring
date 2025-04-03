import '@/styles/globals.css';

import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });
console.log(inter);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}

import '@/styles/globals.css';
