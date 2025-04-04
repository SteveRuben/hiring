'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useTranslation } from '@/components/i18n';
import { challenges } from '@/data/challenges';
import { mockUserData } from '@/data/mockData';

// Import dynamique pour éviter les erreurs SSR
const ChallengeInterface = dynamic(() => import('@/components/codingGame/ChallengeInterface'), {
  ssr: false,
});
export default function ChallengePage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const challenge = challenges.find((c) => c.id === params.id)!;
  const handleProgressUpdate = (exerciseId: string, passed: boolean) => {
    console.log(`Exercice ${exerciseId} ${passed ? 'réussi' : 'échoué'}`);
    // Ici, vous feriez un appel API pour mettre à jour la progression de l'utilisateur
  };
  // Obtenir l'étape active
  // const currentStep = challenge.[activeStep]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/dashboard/challenges" className="text-gray-500 hover:text-gray-700">
              ← {t('challengePage.backToChallenges')}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              {t('challengePage.points')}: {challenge.points}
            </div>
            <div className="text-sm text-gray-700">
              {t('challengePage.difficulty')}: {challenge.difficulty}
            </div>
          </div>
        </div>
      </header>

      <ChallengeInterface
        challenge={challenge}
        userId={mockUserData.userId}
        onProgressUpdate={handleProgressUpdate}
      />
    </div>
  );
}
