'use client';

import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { use } from 'react';

import { useTranslation } from '@/components/i18n';
import { challenges } from '@/data/challenges';
import { mockUserData } from '@/data/mockData';

// Import dynamique pour éviter les erreurs SSR
const ChallengeInterface = dynamic(() => import('@/components/codingGame/ChallengeInterface'), {
  ssr: false,
  loading: () => (
    <div className="p-8 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  ),
});

export default function ChallengeTestPage({ params }: { params: any }) {
  // Utiliser React.use pour déballer les params (important pour Next.js 15+)
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const { t } = useTranslation();

  // Trouver le challenge
  const challenge = challenges.find((c) => c.id === id);

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Challenge non trouvé</h2>
          <p className="text-gray-600 mb-6">
            Le challenge que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            href="/dashboard/challenges"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitChallenge = (challengeId: string, code: string, passed: boolean) => {
    console.log(`Challenge ${challengeId} ${passed ? 'réussi' : 'échoué'}`);
    console.log(`Code soumis: ${code}`);
    // Ici, vous feriez un appel API pour mettre à jour la progression de l'utilisateur
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/dashboard/challenges"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('challengeTest.backToDashboard')}
          </Link>

          <div className="text-sm px-3 py-1 bg-blue-50 text-blue-700 rounded-md">
            {challenge.difficulty === 'easy'
              ? t('difficulty.easy')
              : challenge.difficulty === 'medium'
                ? t('difficulty.medium')
                : t('difficulty.hard')}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1">
        <ChallengeInterface
          challenge={challenge}
          userId={mockUserData.userId}
          onSubmitChallenge={handleSubmitChallenge}
        />
      </main>
    </div>
  );
}
