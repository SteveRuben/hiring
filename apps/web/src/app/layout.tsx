import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/components/i18n";
import Navbar from "@/components/layouts/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sharing rythms - Learn from Expert Developers",
  description:
    "Sharing more than idea.\nConnect with expert developers for personalized learning sessions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} h-full antialiased min-h-screen bg-white`}>
       <I18nProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
        </I18nProvider>
      </body>
    </html>
  );
}
