'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { challenges } from '@/data/challenges';
import { mockUserData } from '@/data/mockData';

// Import dynamique pour éviter les erreurs SSR
const ChallengeInterface = dynamic(() => import('@/components/codingGame/ChallengeInterface'), {
  ssr: false,
});
export default function ChallengePage({ params }: { params: { id: string } }) {
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
              ← Retour aux challenges
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">Points: {challenge.points}</div>
            <div className="text-sm text-gray-700">Difficulté: {challenge.difficulty}</div>
          </div>
        </div>
      </header>

      <ChallengeInterface
        challenge={challenge}
        userId={mockUserData.userId}
        onProgressUpdate={handleProgressUpdate}
      />
      {/* </main> */}
    </div>
  );
}
