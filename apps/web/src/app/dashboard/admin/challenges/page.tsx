import Link from 'next/link';

import { challenges } from '@/data/challenges';

export default function AdminChallengesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className=" mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Challenges</h1>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/admin/users" className="text-blue-600 hover:text-blue-800">
                Utilisateurs
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className=" mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Rechercher un challenge..."
              className="px-4 py-2 border rounded-md"
            />
            <select className="px-4 py-2 border rounded-md">
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="draft">Brouillon</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
          <Link
            href="/dashboard/admin/challenges/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Créer un challenge
          </Link>
        </div>

        {/* Challenges table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Titre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Difficulté
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Catégorie
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Étapes
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Participants
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date de création
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {challenges.map((challenge) => (
                <tr key={challenge.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {challenge.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        challenge.difficulty === 'Facile'
                          ? 'bg-green-100 text-green-800'
                          : challenge.difficulty === 'Intermédiaire'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {challenge.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{challenge.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{challenge.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{challenge.participants}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        challenge.difficulty === 'active'
                          ? 'bg-green-100 text-green-800'
                          : challenge.difficulty === 'draft'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {challenge.difficulty === 'active'
                        ? 'Actif'
                        : challenge.difficulty === 'draft'
                          ? 'Brouillon'
                          : 'Archivé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{'challenge.createdAt'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/dashboard/admin/challenges/${challenge.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </Link>
                    <button className="text-red-600 hover:text-red-900">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Affichage de 1 à {challenges.length} sur {challenges.length} challenges
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 text-gray-500">
              Précédent
            </button>
            <button className="px-3 py-1 border rounded-md text-sm bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
