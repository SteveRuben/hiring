import { BarChart2, CheckCircle, Clock, Eye, Filter, Plus, Search, Users } from 'lucide-react';
import Link from 'next/link';

export default function TestsPage() {
  // Données fictives pour la démonstration
  const tests = [
    {
      id: 1,
      title: 'Test Frontend React',
      challenge: 'Frontend React',
      startDate: '15/05/2023',
      endDate: '22/05/2023',
      candidates: 8,
      completedCandidates: 6,
      status: 'active',
      averageScore: 76,
    },
    {
      id: 2,
      title: 'Évaluation Algorithmes',
      challenge: 'Algorithmes avancés',
      startDate: '10/05/2023',
      endDate: '17/05/2023',
      candidates: 12,
      completedCandidates: 10,
      status: 'active',
      averageScore: 68,
    },
    {
      id: 3,
      title: 'Test SQL pour Data Analysts',
      challenge: 'Bases de données SQL',
      startDate: '05/05/2023',
      endDate: '12/05/2023',
      candidates: 5,
      completedCandidates: 5,
      status: 'completed',
      averageScore: 82,
    },
    {
      id: 4,
      title: 'Challenge DevOps',
      challenge: 'DevOps et CI/CD',
      startDate: '20/05/2023',
      endDate: '27/05/2023',
      candidates: 4,
      completedCandidates: 0,
      status: 'scheduled',
      averageScore: null,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            En cours
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Programmé
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terminé
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Suivi des Tests</h1>
        <Link
          href="/admin/tests/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Lancer un nouveau test
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Tests actifs</p>
              <h3 className="text-3xl font-bold mt-1">
                {tests.filter((t) => t.status === 'active').length}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Candidats évalués</p>
              <h3 className="text-3xl font-bold mt-1">
                {tests.reduce((acc, curr) => acc + curr.completedCandidates, 0)}
              </h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-md">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Score moyen</p>
              <h3 className="text-3xl font-bold mt-1">
                {Math.round(
                  tests
                    .filter((t) => t.averageScore !== null)
                    .reduce((acc, curr) => acc + curr.averageScore, 0) /
                    tests.filter((t) => t.averageScore !== null).length
                )}
                %
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-md">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un test..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tous les statuts</option>
              <option value="active">En cours</option>
              <option value="scheduled">Programmés</option>
              <option value="completed">Terminés</option>
            </select>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </button>
          </div>
        </div>
      </div>

      {/* Tests List */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Liste des tests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Challenge
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidats
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score moyen
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{test.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{test.challenge}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {test.startDate} - {test.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(test.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {test.completedCandidates}/{test.candidates}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {test.averageScore !== null ? (
                      <div className="text-sm text-gray-900">{test.averageScore}%</div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/tests/${test.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Affichage de 1 à {tests.length} sur {tests.length} tests
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
      </div>
    </div>
  );
}
