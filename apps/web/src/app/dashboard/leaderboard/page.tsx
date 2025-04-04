import Link from 'next/link';

import { useTranslation } from '@/components/i18n';
import { leaderboardData } from '@/data/leaderboard';

export default function LeaderboardPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('leaderboard.title')}</h1>
            <div className="flex items-center gap-4">
              <Link href="/challenges" className="text-blue-600 hover:text-blue-800">
                {t('leaderboard.challenges')}
              </Link>
              <Link href="/profile" className="text-blue-600 hover:text-blue-800">
                {t('leaderboard.myProfile')}
              </Link>
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                {t('leaderboard.logout')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Top 3 */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-12">
          {/* 2nd place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <span className="text-2xl font-bold">2</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center w-full">
              <div className="font-bold">{leaderboardData[1]!.username}</div>
              <div className="text-sm text-gray-500">
                {leaderboardData[1]!.points} {t('leaderboard.points')}
              </div>
            </div>
            <div className="h-20 w-full bg-silver"></div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-yellow-200 flex items-center justify-center mb-2">
              <span className="text-3xl font-bold">1</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center w-full">
              <div className="font-bold">{leaderboardData[0]!.username}</div>
              <div className="text-sm text-gray-500">
                {leaderboardData[0]!.points} {t('leaderboard.points')}
              </div>
            </div>
            <div className="h-32 w-full bg-gold"></div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
              <span className="text-2xl font-bold">3</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 text-center w-full">
              <div className="font-bold">{leaderboardData[2]!.username}</div>
              <div className="text-sm text-gray-500">
                {leaderboardData[2]!.points} {t('leaderboard.points')}
              </div>
            </div>
            <div className="h-16 w-full bg-bronze"></div>
          </div>
        </div>

        {/* Leaderboard table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('leaderboard.rank')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('leaderboard.user')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('leaderboard.points')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {t('leaderboard.completedChallenges')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData.map((user) => (
                <tr key={user.id} className={user.rank <= 3 ? 'bg-yellow-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{user.rank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.completedChallenges}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
