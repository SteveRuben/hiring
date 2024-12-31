import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className}`}>
        </body>
      </html>
  );
}
