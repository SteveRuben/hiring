import Link from 'next/link';

export default function AdminDashboard() {
  // Données fictives pour la démonstration
  const stats = {
    totalChallenges: 24,
    activeChallenges: 18,
    totalUsers: 1256,
    completedSubmissions: 4872,
  };

  // Données fictives pour les activités récentes
  const recentActivities = [
    {
      id: 1,
      type: 'challenge',
      action: 'créé',
      name: 'Algorithmes de tri',
      time: 'Il y a 2 heures',
    },
    { id: 2, type: 'user', action: 'inscrit', name: 'Marie Dupont', time: 'Il y a 3 heures' },
    {
      id: 3,
      type: 'submission',
      action: 'complété',
      name: 'Structures de données avancées',
      time: 'Il y a 5 heures',
    },
    {
      id: 4,
      type: 'challenge',
      action: 'modifié',
      name: 'Introduction à la programmation fonctionnelle',
      time: 'Il y a 1 jour',
    },
    {
      id: 5,
      type: 'submission',
      action: 'démarré',
      name: 'Optimisation et complexité algorithmique',
      time: 'Il y a 1 jour',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className=" mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/admin/challenges"
                className="text-blue-600 hover:text-blue-800"
              >
                Challenges
              </Link>
              <Link href="/dashboard/admin/users" className="text-blue-600 hover:text-blue-800">
                Utilisateurs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className=" mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Total des challenges</div>
            <div className="text-3xl font-bold mt-1">{stats.totalChallenges}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Challenges actifs</div>
            <div className="text-3xl font-bold mt-1">{stats.activeChallenges}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Utilisateurs</div>
            <div className="text-3xl font-bold mt-1">{stats.totalUsers}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-sm font-medium text-gray-500">Soumissions complétées</div>
            <div className="text-3xl font-bold mt-1">{stats.completedSubmissions}</div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-medium mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard/admin/challenges/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Créer un challenge
            </Link>
            <Link
              href="/dashboard/admin/users"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Gérer les utilisateurs
            </Link>
            <Link
              href="/dashboard/admin/reports"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Voir les rapports
            </Link>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Activité récente</h2>
          </div>
          <div className="divide-y">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex items-start">
                <div className="mr-4">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === 'challenge'
                        ? 'bg-blue-100'
                        : activity.type === 'user'
                          ? 'bg-green-100'
                          : 'bg-purple-100'
                    }`}
                  >
                    <div
                      className={`h-5 w-5 ${
                        activity.type === 'challenge'
                          ? 'text-blue-600'
                          : activity.type === 'user'
                            ? 'text-green-600'
                            : 'text-purple-600'
                      }`}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {activity.type === 'challenge'
                      ? 'Challenge '
                      : activity.type === 'user'
                        ? 'Utilisateur '
                        : 'Soumission '}
                    <span className="font-semibold">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <Link
              href="/dashboard/admin/activity"
              className="text-sm text-blue-600 hover:underline"
            >
              Voir toutes les activités
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
