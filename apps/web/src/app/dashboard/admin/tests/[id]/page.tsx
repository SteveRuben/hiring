import {
  AlertTriangle,
  ArrowLeft,
  BarChart2,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Mail,
  RefreshCw,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { test } from '@/data/test';

export default function TestDetailPage({ params }) {
  const testId = params.id;
  console.log(testId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terminé
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            En cours
          </span>
        );
      case 'not_started':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Non commencé
          </span>
        );
      default:
        return null;
    }
  };

  const completedCandidates = test.candidates.filter((c) => c.status === 'completed').length;
  const inProgressCandidates = test.candidates.filter((c) => c.status === 'in_progress').length;
  const notStartedCandidates = test.candidates.filter((c) => c.status === 'not_started').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/admin/tests" className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{test.title}</h1>
            <p className="text-sm text-gray-500">Challenge: {test.challenge}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Relancer les invitations
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter les résultats
          </button>
        </div>
      </div>

      {/* Test Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Période</p>
              <h3 className="text-lg font-medium mt-1">
                {test.startDate} - {test.endDate}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-md">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Limite de temps: {test.timeLimit} minutes
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Candidats</p>
              <h3 className="text-lg font-medium mt-1">
                {completedCandidates}/{test.candidates.length} terminés
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-md">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-green-600 font-medium">{completedCandidates}</span>
              <span className="text-gray-500"> terminés</span>
            </div>
            <div>
              <span className="text-blue-600 font-medium">{inProgressCandidates}</span>
              <span className="text-gray-500"> en cours</span>
            </div>
            <div>
              <span className="text-gray-600 font-medium">{notStartedCandidates}</span>
              <span className="text-gray-500"> non commencés</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Score moyen</p>
              <h3 className="text-lg font-medium mt-1">{test.averageScore}%</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-md">
              <BarChart2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${test.averageScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Progress */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Progression des candidats</h2>
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <RefreshCw className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidat
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Début
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fin
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progression
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {test.candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{candidate.name}</div>
                    <div className="text-sm text-gray-500">{candidate.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(candidate.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{candidate.startTime || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{candidate.endTime || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${candidate.progress === 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                        style={{ width: `${candidate.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {candidate.progress}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {candidate.score !== null ? (
                      <div className="text-sm font-medium text-gray-900">{candidate.score}%</div>
                    ) : (
                      <div className="text-sm text-gray-500">-</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {candidate.status !== 'not_started' && (
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Exercise Performance */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Performance par exercice</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exercice
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulté
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taux de complétion
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score moyen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {test.exercises.map((exercise) => (
                <tr key={exercise.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{exercise.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{exercise.difficulty}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${exercise.completion}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {exercise.completion}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${exercise.avgScore}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {exercise.avgScore}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
