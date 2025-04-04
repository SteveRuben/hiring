'use client';
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

import { useTranslation } from '@/components/i18n';
import { candidates } from '@/data/candidates';

export default function CandidatesPage() {
  const { t } = useTranslation();
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t('active')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            {t('pending')}
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            {t('inactive')}
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
            {t('import')}
          </button>
          <Link
            href="/dashboard/admin/candidates/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {t('addCandidate')}
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('totalCandidates')}</p>
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
              <p className="text-sm font-medium text-gray-500">{t('activeCandidates')}</p>
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
              <p className="text-sm font-medium text-gray-500">{t('averageScore')}</p>
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
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">{t('allStatuses')}</option>
              <option value="active">{t('active')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="inactive">{t('inactive')}</option>
            </select>
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {t('filter')}
            </button>
          </div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">{t('candidatesList')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('name')}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('email')}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('tests')}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('averageScore')}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('lastActivity')}
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('actions')}
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
            {t('showing')} {t('of')} {candidates.length} {t('to')} {candidates.length}{' '}
            {t('candidates')}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 text-gray-500">
              {t('previous')}
            </button>
            <button className="px-3 py-1 border rounded-md text-sm bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">
              {t('next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
