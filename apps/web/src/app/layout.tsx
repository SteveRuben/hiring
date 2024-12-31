import type { Metadata } from "next";
import "../styles/globals.css";

/* 
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
className={`${inter.className}`} */

export const metadata: Metadata = {
  title: "Basic assistant",
  description:
    "Your personal chef & nutritionist. Transform your eating habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html suppressHydrationWarning lang="en">
        <body>
          {children}
        </body>
      </html>
  );
}
