import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { mockUserProgress } from '@/data/mockData';
import { Challenge, Exercise, TestResult } from '@/types';

import ProgressTracker from './ProgressTracker';
import TestRunner from './TestRunner';

// Import dynamique pour éviter les erreurs SSR
const MonacoEditor = dynamic(() => import('./MonacoEditor'), { ssr: false });

interface ChallengeInterfaceProps {
  challenge: Challenge;
  userId: string;
  // eslint-disable-next-line no-unused-vars
  onProgressUpdate?: (exerciseId: string, passed: boolean, code: string) => void;
}

const ChallengeInterface: React.FC<ChallengeInterfaceProps> = ({
  challenge,
  userId,
  onProgressUpdate,
}) => {
  const [currentExerciseId, setCurrentExerciseId] = useState<string>('');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(challenge.languageOptions[0] || 'typescript');
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  // Initialiser avec le premier exercice
  useEffect(() => {
    if (challenge.exercises.length > 0) {
      const firstExercise = challenge.exercises[0];
      setCurrentExerciseId(firstExercise!.id);
      setCurrentExercise(firstExercise!);
      setCode(firstExercise!.initialCode);
    }

    // Charger la progression de l'utilisateur
    if (userId && mockUserProgress[userId]) {
      const completed = Object.entries(mockUserProgress[userId])
        .filter(([, isCompleted]) => isCompleted)
        .map(([exerciseId]) => exerciseId);

      setCompletedExercises(completed);
    }
  }, [challenge, userId]);

  // Changer d'exercice
  const handleExerciseSelect = (exerciseId: string) => {
    const selectedExercise = challenge.exercises.find((ex) => ex.id === exerciseId);
    if (selectedExercise) {
      setCurrentExerciseId(exerciseId);
      setCurrentExercise(selectedExercise);
      setCode(selectedExercise.initialCode);
    }
  };

  // Gestion du code modifié
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Gestion des résultats de test
  const handleTestComplete = (results: TestResult[]) => {
    const allPassed = results.every((r) => r.passed);
    if (allPassed && currentExerciseId && onProgressUpdate) {
      onProgressUpdate(currentExerciseId, true, code);

      // Mettre à jour la liste des exercices complétés
      if (!completedExercises.includes(currentExerciseId)) {
        setCompletedExercises([...completedExercises, currentExerciseId]);
      }
    }
  };

  if (!currentExercise) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-3">
        <div className="mb-4 p-4 border rounded-lg bg-white">
          <h2 className="text-xl font-bold">{currentExercise.title}</h2>
          <p className="mt-2">{currentExercise.description}</p>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="language-select" className="font-medium">
                Langage:
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-2 py-1 border rounded"
              >
                {challenge.languageOptions.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <MonacoEditor language={language} value={code} onChange={handleCodeChange} />
          </div>
        </div>

        <TestRunner
          code={code}
          testCases={currentExercise.testCases}
          language={language}
          onTestComplete={handleTestComplete}
        />
      </div>

      <div className="md:col-span-1">
        <ProgressTracker
          exercises={challenge.exercises}
          completedExercises={completedExercises}
          currentExerciseId={currentExerciseId}
          onExerciseSelect={handleExerciseSelect}
        />
      </div>
    </div>
  );
};

export default ChallengeInterface;
