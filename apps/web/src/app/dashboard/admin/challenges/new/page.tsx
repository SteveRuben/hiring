'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useTranslation } from '@/components/i18n';
import { ChallengeService } from '@/lib/services/challenge.service';
import { ChallengeStepService } from '@/lib/services/challenge-step.service';
import { ChallengeTestCaseService } from '@/lib/services/challenge-test-case.service';
import { ChallengeDto, ChallengeStatus } from '@/model/challenge';

export default function NewChallengePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  // État pour les informations générales du challenge
  const [challengeInfo, setChallengeInfo] = useState({
    title: '',
    description: '',
    difficulty: '',
    category: '',
    points: 0,
    status: ChallengeStatus.DRAFT,
  });

  // États pour gérer les étapes et cas de test
  const [steps, setSteps] = useState([
    {
      stepNumber: 1,
      description: '',
      testCases: [{ inputData: '', expectedOutput: '', score: 10, description: '' }],
    },
  ]);

  // Fonction pour mettre à jour les informations du challenge
  const updateChallengeInfo = (field: string, value: any) => {
    setChallengeInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fonction pour ajouter une étape
  const addStep = () => {
    const newStep = {
      stepNumber: steps.length + 1,
      description: '',
      testCases: [{ inputData: '', expectedOutput: '', score: 10, description: '' }],
    };
    setSteps([...steps, newStep]);
  };

  // Fonction pour ajouter un cas de test à une étape
  const addTestCase = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex]?.testCases.push({
      inputData: '',
      expectedOutput: '',
      score: 10,
      description: '',
    });
    setSteps(newSteps);
  };

  // Fonction pour supprimer une étape
  const removeStep = (stepIndex: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, index) => index !== stepIndex);
      // Réajuster les numéros d'étape
      newSteps.forEach((step, idx) => {
        step.stepNumber = idx + 1;
      });
      setSteps(newSteps);
    }
  };

  // Fonction pour supprimer un cas de test
  const removeTestCase = (stepIndex: number, testIndex: number) => {
    if (steps[stepIndex]!.testCases.length > 1) {
      const newSteps = [...steps];
      newSteps[stepIndex]!.testCases = newSteps[stepIndex]!.testCases.filter(
        (_, index) => index !== testIndex
      );
      setSteps(newSteps);
    }
  };

  // Fonction pour mettre à jour une étape
  const updateStep = (stepIndex: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex][field] = value;
    setSteps(newSteps);
  };

  // Fonction pour mettre à jour un cas de test
  const updateTestCase = (
    stepIndex: number,
    testIndex: number,
    field: string,
    value: string | number
  ) => {
    const newSteps = [...steps];
    newSteps[stepIndex].testCases[testIndex][field] = value;
    setSteps(newSteps);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Créer le challenge
      const challengeData: ChallengeDto = {
        title: challengeInfo.title,
        description: challengeInfo.description,
        ownerId: 10386852,
      };

      const createdChallenge = await ChallengeService.createChallenge(challengeData);

      // 2. Créer les étapes pour ce challenge
      for (const step of steps) {
        const createdStep = await ChallengeStepService.createStep(createdChallenge.id, {
          description: step.description,
        });

        // 3. Créer les cas de test pour chaque étape
        for (const testCase of step.testCases) {
          await ChallengeTestCaseService.createTestCase(createdChallenge.id, createdStep.id, {
            inputData: testCase.inputData,
            expectedOutput: testCase.expectedOutput,
            score: typeof testCase.score === 'string' ? parseInt(testCase.score) : testCase.score,
            description: testCase.description || undefined,
          });
        }
      }

      // Redirection vers la page des challenges
      router.push('/dashboard/admin/challenges');
    } catch (err) {
      console.error('Erreur lors de la création du challenge:', err);
      setError(t('errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/admin/challenges"
                className="text-blue-600 hover:text-blue-800"
              >
                {t('backToChallenges')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">{t('generalInfo')}</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('challengeTitle')}
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder={t('titlePlaceholder')}
                  value={challengeInfo.title}
                  onChange={(e) => updateChallengeInfo('title', e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t('description')}
                </label>
                <textarea
                  id="description"
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder={t('descriptionPlaceholder')}
                  value={challengeInfo.description}
                  onChange={(e) => updateChallengeInfo('description', e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('difficulty')}
                  </label>
                  <select
                    id="difficulty"
                    className="w-full px-3 py-2 border rounded-md"
                    value={challengeInfo.difficulty}
                    onChange={(e) => updateChallengeInfo('difficulty', e.target.value)}
                    required
                  >
                    <option value="">{t('selectDifficulty')}</option>
                    <option value="Facile">{t('easy')}</option>
                    <option value="Intermédiaire">{t('medium')}</option>
                    <option value="Difficile">{t('hard')}</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t('category')}
                  </label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border rounded-md"
                    value={challengeInfo.category}
                    onChange={(e) => updateChallengeInfo('category', e.target.value)}
                    required
                  >
                    <option value="">{t('selectCategory')}</option>
                    <option value="Algorithmes">{t('algorithms')}</option>
                    <option value="Structures de données">{t('dataStructures')}</option>
                    <option value="Paradigmes">{t('paradigms')}</option>
                    <option value="Web">{t('web')}</option>
                    <option value="Base de données">{t('database')}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('points')}
                  </label>
                  <input
                    type="number"
                    id="points"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder={t('pointsPlaceholder')}
                    min="0"
                    value={challengeInfo.points}
                    onChange={(e) => updateChallengeInfo('points', parseInt(e.target.value))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('status')}
                  </label>
                  <select
                    id="status"
                    className="w-full px-3 py-2 border rounded-md"
                    value={challengeInfo.status}
                    onChange={(e) => updateChallengeInfo('status', e.target.value)}
                    required
                  >
                    <option value={ChallengeStatus.DRAFT}>{t('draft')}</option>
                    <option value={ChallengeStatus.PUBLISHED}>{t('published')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Étapes */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{t('steps')}</h2>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={addStep}
              >
                {t('addStep')}
              </button>
            </div>

            {steps.map((step, stepIndex) => (
              <div key={stepIndex} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">
                    {t('step')} {step.stepNumber}
                  </h3>
                  <button
                    type="button"
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                    onClick={() => removeStep(stepIndex)}
                    disabled={steps.length === 1}
                  >
                    {t('delete')}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('stepDescription')}
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                      placeholder={t('stepPlaceholder')}
                      value={step.description}
                      onChange={(e) => updateStep(stepIndex, 'description', e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Cas de test */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {t('testCases')}
                      </label>
                      <button
                        type="button"
                        className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => addTestCase(stepIndex)}
                      >
                        {t('addTestCase')}
                      </button>
                    </div>

                    {step.testCases.map((testCase, testIndex) => (
                      <div key={testIndex} className="border rounded-md p-4 mb-2">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">
                            {t('test')} {testIndex + 1}
                          </h4>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => removeTestCase(stepIndex, testIndex)}
                            disabled={step.testCases.length === 1}
                          >
                            {t('delete')}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {t('testDescription')}
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-md text-sm"
                              placeholder={t('testDescriptionPlaceholder')}
                              value={testCase.description}
                              onChange={(e) =>
                                updateTestCase(stepIndex, testIndex, 'description', e.target.value)
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {t('input')}
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border rounded-md text-sm min-h-[80px]"
                              placeholder={t('inputPlaceholder')}
                              value={testCase.inputData}
                              onChange={(e) =>
                                updateTestCase(stepIndex, testIndex, 'inputData', e.target.value)
                              }
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              {t('expectedOutput')}
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border rounded-md text-sm min-h-[80px]"
                              placeholder={t('outputPlaceholder')}
                              value={testCase.expectedOutput}
                              onChange={(e) =>
                                updateTestCase(
                                  stepIndex,
                                  testIndex,
                                  'expectedOutput',
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Score*
                            </label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border rounded-md text-sm"
                              placeholder="Ex: 10"
                              min="0"
                              value={testCase.score}
                              onChange={(e) =>
                                updateTestCase(
                                  stepIndex,
                                  testIndex,
                                  'score',
                                  parseInt(e.target.value)
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4">
            <Link
              href="/dashboard/admin/challenges"
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t('cancel')}
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('submitting') : t('createChallenge')}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
