import Link from 'next/link';

import { useTranslation } from '@/components/i18n';
import { challenges } from '@/data/challenges';

export default function CandidateDashboardPage() {
  const { t } = useTranslation();
  const completedChallenges = [
    {
      id: 3,
      title: 'Bases de données SQL',
      description: 'Requêtes SQL complexes et optimisation',
      completedDate: '10/05/2023',
      score: 82,
      feedback: 'Bonnes compétences en SQL, quelques optimisations à améliorer.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main content */}
      <main className=" mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">{t('candidateDashboard.title')}</h1>
        <p className="text-gray-500 mb-8">{t('candidateDashboard.welcome')}</p>

        {/* Available Challenges */}
        <div className="mb-10">
          <h2 className="text-lg font-medium mb-4">{t('candidateDashboard.availableTests')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium">{challenge.title}</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    {t('candidateDashboard.deadline')} {'date de fin'}
                  </div>{' '}
                  {/*la date de fin*/}
                  <p className="mt-3 text-sm text-gray-500">{challenge.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <span>
                      {50} {t('candidateDashboard.minutes')}
                    </span>{' '}
                    {/* timeLimit */}
                    <span className="mx-2">•</span>
                    <span>
                      {`${challenge.exercises}`} {t('candidateDashboard.exercises')}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  {/*il faut verifier si le challenges est actif*/}
                  {challenge.participants !== 0 ? (
                    <Link
                      href={`/dashboard/candidate/challenges/${challenge.id}`}
                      className="w-full block text-center py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      {t('candidateDashboard.startTest')}
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2 px-4 rounded-md text-white bg-gray-400 cursor-not-allowed"
                    >
                      {t('candidateDashboard.availableOn')} {'25 mai'} {/*la date de fin*/}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Challenges */}
        <div>
          <h2 className="text-lg font-medium mb-4">{t('candidateDashboard.completedTests')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {completedChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium">{challenge.title}</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    {t('candidateDashboard.completedOn')} {challenge.completedDate}
                  </div>
                  <p className="mt-3 text-sm text-gray-500">{challenge.description}</p>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{t('candidateDashboard.score')}</span>
                      <span className="text-sm font-medium">{challenge.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${challenge.score}%` }}
                      ></div>
                    </div>
                  </div>
                  {challenge.feedback && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <h4 className="text-sm font-medium text-blue-800">
                        {t('candidateDashboard.feedback')}
                      </h4>
                      <p className="mt-1 text-sm text-blue-700">{challenge.feedback}</p>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <Link
                    href={`/dashboard/candidate/challenges/${challenge.id}/results`}
                    className="w-full block text-center py-2 px-4 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    {t('candidateDashboard.viewDetailedResults')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
