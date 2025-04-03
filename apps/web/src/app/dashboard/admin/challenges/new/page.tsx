'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NewChallengePage() {
  // États pour gérer le formulaire
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: '',
      description: '',
      instructions: '',
      defaultCode: '',
      testCases: [{ input: '', expected: '' }],
    },
  ]);

  // Fonction pour ajouter une étape
  const addStep = () => {
    const newStep = {
      id: steps.length + 1,
      title: '',
      description: '',
      instructions: '',
      defaultCode: '',
      testCases: [{ input: '', expected: '' }],
    };
    setSteps([...steps, newStep]);
  };

  // Fonction pour ajouter un cas de test à une étape
  const addTestCase = (stepIndex: number) => {
    const newSteps = [...steps];
    newSteps[stepIndex]?.testCases.push({ input: '', expected: '' });
    setSteps(newSteps);
  };

  // Fonction pour supprimer une étape
  const removeStep = (stepIndex: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, index) => index !== stepIndex);
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
  const updateTestCase = (stepIndex: number, testIndex: number, field: string, value: string) => {
    const newSteps = [...steps];
    newSteps[stepIndex].testCases[testIndex][field] = value;
    setSteps(newSteps);
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoi au backend
    alert('Challenge créé avec succès !');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className=" mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau challenge</h1>
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
      <main className=" mx-auto px-4 py-8">
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
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Difficulté*
                  </label>
                  <select id="difficulty" className="w-full px-3 py-2 border rounded-md" required>
                    <option value="">Sélectionner une difficulté</option>
                    <option value="Facile">Facile</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Difficile">Difficile</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Catégorie*
                  </label>
                  <select id="category" className="w-full px-3 py-2 border rounded-md" required>
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Algorithmes">Algorithmes</option>
                    <option value="Structures de données">Structures de données</option>
                    <option value="Paradigmes">Paradigmes</option>
                    <option value="Web">Web</option>
                    <option value="Base de données">Base de données</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                    Points*
                  </label>
                  <input
                    type="number"
                    id="points"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ex: 300"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Statut*
                  </label>
                  <select id="status" className="w-full px-3 py-2 border rounded-md" required>
                    <option value="draft">Brouillon</option>
                    <option value="active">Actif</option>
                    <option value="archived">Archivé</option>
                  </select>
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
              <div key={step.id} className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-medium">Étape {stepIndex + 1}</h3>
                  <button
                    type="button"
                    className="px-3 py-1 text-red-600 hover:text-red-800"
                    onClick={() => removeStep(stepIndex)}
                    disabled={steps.length === 1}
                  >
                    Supprimer
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre de l'étape*
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Ex: Tri à bulles"
                      value={step.title}
                      onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description*
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                      placeholder="Décrivez brièvement cette étape..."
                      value={step.description}
                      onChange={(e) => updateStep(stepIndex, 'description', e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructions détaillées*
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md min-h-[150px]"
                      placeholder="Fournissez des instructions détaillées pour cette étape..."
                      value={step.instructions}
                      onChange={(e) => updateStep(stepIndex, 'instructions', e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Code par défaut*
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border rounded-md min-h-[150px] font-mono"
                      placeholder="Fournissez le code de départ pour cette étape..."
                      value={step.defaultCode}
                      onChange={(e) => updateStep(stepIndex, 'defaultCode', e.target.value)}
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
                      <div key={testIndex} className="border rounded-md p-4 mb-2">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Test {testIndex + 1}</h4>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => removeTestCase(stepIndex, testIndex)}
                            disabled={step.testCases.length === 1}
                          >
                            Supprimer
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Entrée*
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-md text-sm"
                              placeholder="Ex: [5, 3, 8, 4, 2]"
                              value={testCase.input}
                              onChange={(e) =>
                                updateTestCase(stepIndex, testIndex, 'input', e.target.value)
                              }
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Sortie attendue*
                            </label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border rounded-md text-sm"
                              placeholder="Ex: [2, 3, 4, 5, 8]"
                              value={testCase.expected}
                              onChange={(e) =>
                                updateTestCase(stepIndex, testIndex, 'expected', e.target.value)
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Créer le challenge
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
