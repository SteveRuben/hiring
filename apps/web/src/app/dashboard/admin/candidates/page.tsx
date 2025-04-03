import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  Clock,
  Edit,
  Filter,
  Mail,
  Plus,
  Search,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { candidates } from '@/data/candidates';

export default function CandidatesPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Actif
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Inactif
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Candidats</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importer
          </button>
          <Link
            href="/dashboard/admin/candidates/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Ajouter un candidat
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total des candidats</p>
              <h3 className="text-3xl font-bold mt-1">{candidates.length}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-md">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Candidats actifs</p>
              <h3 className="text-3xl font-bold mt-1">
                {candidates.filter((c) => c.status === 'active').length}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Score moyen</p>
              <h3 className="text-3xl font-bold mt-1">
                {Math.round(
                  candidates
                    .filter((c) => c.averageScore !== null)
                    .reduce((acc, curr) => acc + curr.averageScore, 0) /
                    candidates.filter((c) => c.averageScore !== null).length
                )}
                %
              </h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-md">
              <BarChart2 className="h-6 w-6 text-purple-600" />
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
              placeholder="Rechercher un candidat..."
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="inactive">Inactifs</option>
            </select>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrer
            </button>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Liste des candidats</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tests
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score moyen
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière activité
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{candidate.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{candidate.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(candidate.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {candidate.completedTests}/{candidate.tests}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {candidate.averageScore !== null ? (
                      <div className="text-sm text-gray-900">{candidate.averageScore}%</div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{candidate.lastActivity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Mail className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/dashboard/admin/candidates/${candidate.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Affichage de 1 à {candidates.length} sur {candidates.length} candidats
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
