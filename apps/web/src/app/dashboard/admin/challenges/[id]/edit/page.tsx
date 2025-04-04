'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ChallengeService } from '@/lib/services/challenge.service';
import { ChallengeStepService } from '@/lib/services/challenge-step.service';
import { ChallengeTestCaseService } from '@/lib/services/challenge-test-case.service';
import { ChallengeStatus, ChallengeUpdateDto } from '@/model/challenge';
import { UpdateChallengeStepDto } from '@/model/challenge-step';
import { UpdateChallengeTestCaseDto } from '@/model/challenge-test-case';

export default function EditChallengePage() {
  const router = useRouter();
  const params = useParams();
  const challengeId = Number(params.id);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // États pour les informations générales du challenge
  const [challengeInfo, setChallengeInfo] = useState({
    title: '',
    description: '',
    status: ChallengeStatus.DRAFT,
  });

  // États pour les étapes et cas de test
  const [steps, setSteps] = useState<
    Array<{
      id?: number;
      stepNumber: number;
      description: string;
      testCases: Array<{
        id?: number;
        inputData: string;
        expectedOutput: string;
        score: number;
        description: string;
      }>;
    }>
  >([]);

  // Charger les données du challenge lors du montage du composant
  useEffect(() => {
    const loadChallengeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. Charger le challenge
        const challenge = await ChallengeService.getChallengeById(challengeId);
        if (!challenge) {
          throw new Error('Challenge non trouvé');
        }

        setChallengeInfo({
          title: challenge.title,
          description: challenge.description,
          status: challenge.status,
        });

        // 2. Charger les étapes
        const stepsData = await ChallengeStepService.getStepsByChallenge(challengeId);

        // 3. Pour chaque étape, charger les cas de test
        const stepsWithTestCases = await Promise.all(
          stepsData.map(async (step) => {
            const testCases = await ChallengeTestCaseService.getAllTestCases(challengeId, step.id);

            return {
              id: step.id,
              stepNumber: step.stepNumber,
              description: step.description,
              testCases: testCases.map((test) => ({
                id: test.id,
                inputData: test.inputData,
                expectedOutput: test.expectedOutput,
                score: test.score,
                description: test.description || '',
              })),
            };
          })
        );

        // Tri des étapes par numéro d'étape
        const sortedSteps = [...stepsWithTestCases].sort((a, b) => a.stepNumber - b.stepNumber);

        setSteps(sortedSteps);
      } catch (err) {
        console.error('Erreur lors du chargement des données du challenge:', err);
        setError('Impossible de charger les données du challenge. Veuillez réessayer.');
      } finally {
        setIsLoading(false);
      }
    };

    if (challengeId) {
      loadChallengeData();
    }
  }, [challengeId]);

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
      testCases: [
        {
          inputData: '',
          expectedOutput: '',
          score: 10,
          description: '',
        },
      ],
    };
    setSteps([...steps, newStep]);
  };

  // Fonction pour ajouter un cas de test à une étape
  const addTestCase = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex].testCases.push({
      inputData: '',
      expectedOutput: '',
      score: 10,
      description: '',
    });
    setSteps(newSteps);
  };

  // Fonction pour supprimer une étape
  const removeStep = async (stepIndex: number) => {
    if (steps.length <= 1) {
      alert('Un challenge doit avoir au moins une étape.');
      return;
    }

    const step = steps[stepIndex];

    // Si l'étape a un ID, elle existe en base de données et doit être supprimée via l'API
    if (step.id) {
      try {
        setIsSaving(true);

        // Avant de supprimer l'étape, nous devons d'abord supprimer tous ses cas de test
        for (const testCase of step.testCases) {
          if (testCase.id) {
            try {
              await ChallengeTestCaseService.deleteTestCase(challengeId, step.id, testCase.id);
            } catch (testErr) {
              console.error(
                `Erreur lors de la suppression du cas de test ${testCase.id}:`,
                testErr
              );
              // Continuer avec les autres cas de test même si un échoue
            }
          }
        }

        // Maintenant, supprimons l'étape
        await ChallengeStepService.deleteStep(challengeId, step.id);

        // Pour débogage
        console.log(`Étape ${step.id} supprimée avec succès`);
      } catch (err) {
        console.error(`Erreur lors de la suppression de l'étape ${step.id}:`, err);
        setError("Impossible de supprimer l'étape. Veuillez réessayer.");
        setIsSaving(false);
        return;
      }
    }

    const newSteps = steps.filter((_, index) => index !== stepIndex);

    // Réindexer les numéros d'étapes
    newSteps.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });

    setSteps(newSteps);
    setIsSaving(false);

    // Afficher un message de succès temporaire
    setSuccessMessage('Étape supprimée avec succès');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Fonction pour supprimer un cas de test
  const removeTestCase = async (stepIndex: number, testIndex: number) => {
    if (steps[stepIndex].testCases.length <= 1) {
      alert('Une étape doit avoir au moins un cas de test.');
      return;
    }

    const step = steps[stepIndex];
    const testCase = step.testCases[testIndex];

    // Si le cas de test a un ID, il existe en base de données et doit être supprimé via l'API
    if (step.id && testCase.id) {
      try {
        setIsSaving(true);
        await ChallengeTestCaseService.deleteTestCase(challengeId, step.id, testCase.id);
      } catch (err) {
        console.error(`Erreur lors de la suppression du cas de test ${testCase.id}:`, err);
        setError('Impossible de supprimer le cas de test. Veuillez réessayer.');
        setIsSaving(false);
        return;
      }
    }

    const newSteps = [...steps];
    newSteps[stepIndex].testCases = newSteps[stepIndex].testCases.filter(
      (_, index) => index !== testIndex
    );

    setSteps(newSteps);
    setIsSaving(false);

    // Afficher un message de succès temporaire
    setSuccessMessage('Cas de test supprimé avec succès');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Fonction pour mettre à jour une étape
  const updateStep = (stepIndex: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex][field] = value;
    setSteps(newSteps);
  };

  // Fonction pour mettre à jour un cas de test
  const updateTestCase = (stepIndex: number, testIndex: number, field: string, value: any) => {
    const newSteps = [...steps];
    newSteps[stepIndex].testCases[testIndex][field] = value;
    setSteps(newSteps);
  };

  // Fonction pour soumettre le formulaire et mettre à jour le challenge
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // 1. Mettre à jour les informations de base du challenge
      const updateChallengeData: ChallengeUpdateDto = {
        title: challengeInfo.title,
        description: challengeInfo.description,
      };

      await ChallengeService.updateChallenge(challengeId, updateChallengeData);

      // 2. Pour chaque étape
      for (const step of steps) {
        let stepId: number;

        if (step.id) {
          // Mettre à jour l'étape existante
          const updateStepData: UpdateChallengeStepDto = {
            description: step.description,
          };

          const updatedStep = await ChallengeStepService.updateStep(
            challengeId,
            step.id,
            updateStepData
          );

          stepId = updatedStep.id;
        } else {
          // Créer une nouvelle étape
          const createdStep = await ChallengeStepService.createStep(challengeId, {
            description: step.description,
          });

          stepId = createdStep.id;
        }

        // 3. Pour chaque cas de test de cette étape
        for (const testCase of step.testCases) {
          if (testCase.id) {
            // Mettre à jour le cas de test existant
            const updateTestData: UpdateChallengeTestCaseDto = {
              inputData: testCase.inputData,
              expectedOutput: testCase.expectedOutput,
              score: typeof testCase.score === 'string' ? parseInt(testCase.score) : testCase.score,
              description: testCase.description || undefined,
            };

            await ChallengeTestCaseService.updateTestCase(
              challengeId,
              stepId,
              testCase.id,
              updateTestData
            );
          } else {
            // Créer un nouveau cas de test
            await ChallengeTestCaseService.createTestCase(challengeId, stepId, {
              inputData: testCase.inputData,
              expectedOutput: testCase.expectedOutput,
              score: typeof testCase.score === 'string' ? parseInt(testCase.score) : testCase.score,
              description: testCase.description || undefined,
            });
          }
        }
      }

      // Afficher un message de succès
      setSuccessMessage('Challenge mis à jour avec succès');

      // Réinitialiser le message après quelques secondes
      setTimeout(() => {
        setSuccessMessage(null);
        router.push('/dashboard/admin/challenges');
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la mise à jour du challenge:', err);
      setError('Une erreur est survenue lors de la mise à jour du challenge. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  // Fonction pour publier le challenge
  const handlePublish = async () => {
    if (
      confirm(
        'Êtes-vous sûr de vouloir publier ce challenge ? Il sera visible par tous les utilisateurs.'
      )
    ) {
      try {
        setIsSaving(true);
        setError(null);

        await ChallengeService.publishChallenge(challengeId);

        setChallengeInfo((prev) => ({
          ...prev,
          status: ChallengeStatus.PUBLISHED,
        }));

        setSuccessMessage('Challenge publié avec succès');
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        console.error('Erreur lors de la publication du challenge:', err);
        setError(
          'Une erreur est survenue lors de la publication du challenge. Veuillez réessayer.'
        );
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Chargement des données du challenge...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Modifier le challenge</h1>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/admin/challenges"
                className="text-blue-600 hover:text-blue-800"
              >
                Retour aux challenges
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

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Informations générales</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titre du challenge*
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Ex: Algorithmes de tri"
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
                  Description*
                </label>
                <textarea
                  id="description"
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder="Décrivez le challenge et ses objectifs..."
                  value={challengeInfo.description}
                  onChange={(e) => updateChallengeInfo('description', e.target.value)}
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      challengeInfo.status === ChallengeStatus.DRAFT
                        ? 'bg-gray-100 text-gray-800'
                        : challengeInfo.status === ChallengeStatus.PUBLISHED
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {challengeInfo.status === ChallengeStatus.DRAFT
                      ? 'Brouillon'
                      : challengeInfo.status === ChallengeStatus.PUBLISHED
                        ? 'Publié'
                        : 'Archivé'}
                  </span>

                  {challengeInfo.status === ChallengeStatus.DRAFT && (
                    <button
                      type="button"
                      className="ml-2 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                      onClick={handlePublish}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Publication...' : 'Publier maintenant'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Étapes */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Étapes du challenge</h2>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={addStep}
              >
                Ajouter une étape
              </button>
            </div>

            {steps.map((step, stepIndex) => (
              <div key={step.id || stepIndex} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">Étape {step.stepNumber}</h3>
                  <button
                    type="button"
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                    onClick={() => removeStep(stepIndex)}
                    disabled={isSaving || steps.length <= 1}
                  >
                    {isSaving ? 'Suppression...' : 'Supprimer'}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description de l'étape*
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                      placeholder="Fournissez des instructions détaillées pour cette étape..."
                      value={step.description}
                      onChange={(e) => updateStep(stepIndex, 'description', e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Cas de test */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Cas de test*
                      </label>
                      <button
                        type="button"
                        className="px-3 py-1 text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => addTestCase(stepIndex)}
                      >
                        Ajouter un cas de test
                      </button>
                    </div>

                    {step.testCases.map((testCase, testIndex) => (
                      <div key={testCase.id || testIndex} className="border rounded-md p-4 mb-2">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Test {testIndex + 1}</h4>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => removeTestCase(stepIndex, testIndex)}
                            disabled={isSaving || step.testCases.length <= 1}
                          >
                            {isSaving ? 'Suppression...' : 'Supprimer'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Description du test
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-md text-sm"
                              placeholder="Ex: Test avec tableau trié"
                              value={testCase.description}
                              onChange={(e) =>
                                updateTestCase(stepIndex, testIndex, 'description', e.target.value)
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Entrée*
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border rounded-md text-sm min-h-[80px]"
                              placeholder="Ex: [5, 3, 8, 4, 2]"
                              value={testCase.inputData}
                              onChange={(e) =>
                                updateTestCase(stepIndex, testIndex, 'inputData', e.target.value)
                              }
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Sortie attendue*
                            </label>
                            <textarea
                              className="w-full px-3 py-2 border rounded-md text-sm min-h-[80px]"
                              placeholder="Ex: [2, 3, 4, 5, 8]"
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
              Annuler
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSaving}
            >
              {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
