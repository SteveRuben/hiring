import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Plateforme de Challenges de Programmation
        </h1>

        <div className="space-y-4">
          <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
            <Link href="/dashboard/candidate/login" className="block">
              <h2 className="text-lg font-medium text-blue-600">Interface Utilisateur</h2>
              <p className="text-sm text-gray-500 mt-1">
                Participez aux challenges et suivez votre progression
              </p>
            </Link>
          </div>
          <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
            <Link href="/dashboard/challenges" className="block">
              <h2 className="text-lg font-medium text-blue-600">Interface Visiteur</h2>
              <p className="text-sm text-gray-500 mt-1">
                Participez aux challenges et evoluez en niveau
              </p>
            </Link>
          </div>

          <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
            <Link href="/dashboard/admin" className="block">
              <h2 className="text-lg font-medium text-green-600">Interface Administrateur</h2>
              <p className="text-sm text-gray-500 mt-1">
                Gérez les challenges et suivez les performances des utilisateurs
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
