import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation principale */}
      <div className="mx-auto px-4 py-4">
        <nav className="bg-white p-2 rounded-lg shadow-sm mb-6">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href="/dashboard/admin"
                className="px-4 py-2 rounded-md inline-block hover:bg-gray-100"
              >
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/challenges"
                className="px-4 py-2 rounded-md inline-block hover:bg-gray-100"
              >
                Gestion des Challenges
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/candidates"
                className="px-4 py-2 rounded-md inline-block hover:bg-gray-100"
              >
                Gestion des Candidats
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/tests"
                className="px-4 py-2 rounded-md inline-block hover:bg-gray-100"
              >
                Suivi des Tests
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenu principal */}
        <main>{children}</main>
      </div>
    </div>
  );
}
