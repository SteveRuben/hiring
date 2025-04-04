'use client';
import Link from 'next/link';

import { useTranslation } from '@/components/i18n';
import { challenges } from '@/data/challenges';

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Facile':
      return 'bg-green-100 text-green-800';
    case 'Intermédiaire':
      return 'bg-yellow-100 text-yellow-800';
    case 'Difficile':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function ChallengesPage() {
  const { t } = useTranslation();
  const getDifficultyTranslation = (difficulty: string) => {
    switch (difficulty) {
      case 'Facile':
      case 'Easy':
        return t('challengesPage.easy');
      case 'Intermédiaire':
      case 'Medium':
        return t('challengesPage.medium');
      case 'Difficile':
      case 'Hard':
        return t('challengesPage.hard');
      default:
        return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className=" mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('challengesPage.title')}</h1>
            <div className="flex items-center gap-4">
              <Link href="/leaderboard" className="text-blue-600 hover:text-blue-800">
                {t('challengesPage.ranking')}
              </Link>
              <Link href="/profile" className="text-blue-600 hover:text-blue-800">
                {t('challengesPage.myProfile')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className=" mx-auto px-4 py-8">
        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={t('challengesPage.searchPlaceholder')}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border rounded-md">
                <option value="">{t('challengesPage.allDifficulties')}</option>
                <option value="Facile">{t('challengesPage.easy')}</option>
                <option value="Intermédiaire">{t('challengesPage.medium')}</option>
                <option value="Difficile">{t('challengesPage.hard')}</option>
              </select>
              <select className="px-4 py-2 border rounded-md">
                <option value="">{t('challengesPage.allCategories')}</option>
                <option value="Algorithmes">{t('challengesPage.categories.algorithms')}</option>
                <option value="Structures de données">
                  {t('challengesPage.categories.dataStructures')}
                </option>
                <option value="Paradigmes">{t('challengesPage.categories.paradigms')}</option>
                <option value="Web">{t('challengesPage.categories.web')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{challenge.title}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    {getDifficultyTranslation(challenge.difficulty)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>
                    {t('challengesPage.category')}: {challenge.category}
                  </span>
                  <span>
                    {challenge.points} {t('leaderboard.points')}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{t('challengesPage.successRate')}</span>
                    <span>{challenge.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${challenge.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {challenge.participants} {t('challengesPage.participants')}
                  </span>
                  <Link
                    href={`/dashboard/challenges/${challenge.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {t('challengesPage.participate')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
