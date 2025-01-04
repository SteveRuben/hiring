import type { Metadata } from "next";
import "../styles/globals.css";
import localFont from "next/font/local";
import { I18nProvider } from "../common/i18n";
import Navbar from "../common/layouts/nav-bar";
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Sharing rythms - Learn from Expert Developers",
  description:
    "Sharing more than idea.\nConnect with expert developers for personalized learning sessions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.className} h-full antialiased min-h-screen bg-white`}
      >
        <I18nProvider>
          <Navbar />
          <div className="pt-16">{children}</div>
        </I18nProvider>
      </body>
    </html>
  );
}
