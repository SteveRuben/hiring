'use client';

// import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';

import { challenges } from '@/data/challenges';
import { mockUserData } from '@/data/mockData';

// Import dynamique pour éviter les erreurs SSR
const ChallengeInterface = dynamic(() => import('@/components/codingGame/ChallengeInterface'), {
  ssr: false,
});
export default function ChallengeTestPage({ params }: { params: { id: string } }) {
  // const [challenge, setChallenge] = useState<Challenge | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simuler un appel API pour récupérer le challenge
  //   const foundChallenge = challenges.find(c => c.id === params.id);
  //   if (foundChallenge) {
  const challenge = challenges.find((c) => c.id === params.id)!;
  //   }
  //  setLoading(false);
  // }, [params.id]);

  const handleProgressUpdate = (exerciseId: string, passed: boolean) => {
    console.log(`Exercice ${exerciseId} ${passed ? 'réussi' : 'échoué'}`);
    // Ici, vous feriez un appel API pour mettre à jour la progression de l'utilisateur
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard/candidate/dashboard" className="text-gray-500 hover:text-gray-700">
            Retour au tableau de bord
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-gray-700">Temps restant: 01:58:45</div>
            <button
              className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => alert('Test soumis avec succès!')}
            >
              Terminer le test
            </button>
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
