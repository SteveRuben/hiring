'use client';

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Heart,
  Lightbulb,
  MessageSquare,
  PlayCircle,
  Save,
  Settings,
  Share2,
  Star,
  Terminal,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Challenge, TestCase, TestResult } from '@/types';
import { runTests } from '@/utils/testUtils';

import { useTranslation } from '../i18n';

// Import dynamique pour éviter les erreurs SSR
const MonacoEditor = dynamic(() => import('./MonacoEditor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-md h-[500px] bg-gray-50 flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  ),
});

interface ChallengeInterfaceProps {
  challenge: Challenge;
  userId: string;
  // eslint-disable-next-line no-unused-vars
  onSubmitChallenge?: (challengeId: string, code: string, passed: boolean) => void;
}

const ChallengeInterface: React.FC<ChallengeInterfaceProps> = ({
  challenge,
  userId,
  onSubmitChallenge,
}) => {
  const { t } = useTranslation();

  // États de base
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(challenge.languageOptions?.[0] || 'javascript');
  const [activeTab, setActiveTab] = useState('description');
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState('vs-dark');
  const [showSettings, setShowSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [executionStats, setExecutionStats] = useState<{ runtime: string; memory: string } | null>(
    null
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [expandedTests, setExpandedTests] = useState<string[]>([]);

  // Initialiser le code avec le code par défaut du challenge
  useEffect(() => {
    if (challenge && challenge.exercises.initialCode) {
      if (typeof challenge.exercises.initialCode === 'string') {
        setCode(challenge.exercises.initialCode);
      } else if (challenge.exercises.initialCode[language]) {
        setCode(challenge.exercises.initialCode[language]);
      }
    }
  }, [challenge, language]);

  // Gestion du code modifié
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  // Exécuter le code pour tester
  const runCode = async () => {
    setIsRunning(true);
    const startTime = performance.now();

    try {
      // Exécuter les tests en direct
      const results = await runTests(code, challenge.exercises.testCases || [], language);
      const endTime = performance.now();
      const executionTime = Math.floor(endTime - startTime);

      setTestResults(results);
      setExecutionStats({
        runtime: `${executionTime} ms`,
        memory: `${(Math.random() * 5 + 40).toFixed(1)} MB`, // Simulation approximative
      });

      // Basculer automatiquement vers l'onglet des résultats
      setActiveTab('results');

      // Vérifier si tous les tests sont réussis
      const allPassed = results.every((r) => r.passed);
      if (allPassed && onSubmitChallenge) {
        onSubmitChallenge(challenge.id, code, true);
      }
    } catch (error) {
      console.error("Erreur d'exécution des tests:", error);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  };

  // Soumettre le challenge
  const submitChallenge = async () => {
    setIsSubmitting(true);

    try {
      // Exécuter les tests avant de soumettre
      const results = await runTests(code, challenge.exercises.testCases || [], language);
      setTestResults(results);

      // Basculer vers l'onglet des résultats
      setActiveTab('results');

      // Vérifier si tous les tests sont réussis
      const allPassed = results.every((r) => r.passed);
      if (onSubmitChallenge) {
        onSubmitChallenge(challenge.id, code, allPassed);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculer le nombre de tests réussis
  const passedCount = testResults ? testResults.filter((r) => r.passed).length : 0;
  const allPassed =
    testResults &&
    testResults.length > 0 &&
    passedCount === (challenge.exercises.testCases?.length || 0);
  const anyFailed =
    testResults &&
    testResults.length > 0 &&
    passedCount < (challenge.exercises.testCases?.length || 0);

  // Fonction pour basculer l'expansion d'un test
  const toggleExpandTest = (testId: string) => {
    setExpandedTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Panneau latéral à gauche */}
      <div className="w-full lg:w-1/2 lg:border-r lg:border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold">{challenge.title}</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-1 rounded-full hover:bg-gray-100 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-1 rounded-full hover:bg-gray-100 ${isFavorite ? 'text-yellow-500' : 'text-gray-500'}`}
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-yellow-500' : ''}`} />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="p-0 rounded-none border-b">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              {t('challenge.description')}
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              <Terminal className="h-4 w-4 mr-1" />
              {t('challenge.results')}
            </TabsTrigger>
            <TabsTrigger
              value="solution"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              <Lightbulb className="h-4 w-4 mr-1" />
              {t('challenge.solution')}
            </TabsTrigger>
            <TabsTrigger
              value="discussion"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              {t('challenge.discussion')}
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            {/* Description */}
            <TabsContent value="description" className="p-6 mt-0 h-full overflow-auto">
              <div className="prose max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: challenge.description.replace(/\n\n/g, '<br/><br/>'),
                  }}
                />
              </div>

              {challenge.description && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">{t('challenge.examples')}:</h3>
                  <div className="space-y-4">
                    {challenge.exercises.testCases.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md border">
                        <h4 className="font-medium mb-2">
                          {t('challenge.example')} {index + 1}
                        </h4>
                        <div className="mb-2">
                          <span className="font-medium">{t('challenge.input')}:</span>{' '}
                          {example.input}
                        </div>
                        <div className="mb-2">
                          <span className="font-medium">{t('challenge.output')}:</span>{' '}
                          {example.expectedOutput}
                        </div>
                        {example.description && (
                          <div>
                            <span className="font-medium">{t('challenge.explanation')}:</span>{' '}
                            {example.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* {challenge.constraints && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">{t('challenge.constraints')}:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {challenge.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              )} */}
            </TabsContent>

            {/* Résultats des tests */}
            <TabsContent value="results" className="mt-0 p-6 h-full overflow-auto">
              {testResults &&
              challenge.exercises.testCases &&
              challenge.exercises.testCases.length > 0 ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      {t('challenge.testResults')}
                    </h3>

                    <button
                      onClick={runCode}
                      disabled={isRunning}
                      className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1 ${
                        allPassed
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      } disabled:opacity-50`}
                    >
                      {isRunning ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                          {t('challenge.running')}
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-4 w-4" />
                          {t('challenge.runAgain')}
                        </>
                      )}
                    </button>
                  </div>

                  {executionStats && (
                    <div className="mb-4 flex items-center gap-4 p-3 bg-gray-50 rounded-md border">
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          {t('challenge.runtime')}:
                        </span>
                        <span className="ml-1 font-medium">{executionStats.runtime}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">
                          {t('challenge.memory')}:
                        </span>
                        <span className="ml-1 font-medium">{executionStats.memory}</span>
                      </div>
                    </div>
                  )}

                  {/* Status Banner */}
                  <div
                    className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
                      allPassed
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {allPassed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    )}

                    <div>
                      <h4
                        className={`font-medium ${allPassed ? 'text-green-800' : 'text-red-800'}`}
                      >
                        {allPassed ? t('challenge.allTestsPassed') : t('challenge.someTestsFailed')}
                      </h4>
                      <p className="text-sm">
                        {passedCount}/{testResults.length} {t('challenge.testsPassed')}
                      </p>
                    </div>
                  </div>

                  {/* Test Results */}
                  <div className="space-y-4">
                    {testResults.map((result, index) => {
                      const isExpanded = expandedTests.includes(result.testCase.id);

                      return (
                        <div
                          key={result.testCase.id || index}
                          className={`border rounded-md overflow-hidden ${
                            result.passed ? 'border-green-200' : 'border-red-200'
                          }`}
                        >
                          <div
                            className={`p-3 flex justify-between items-center cursor-pointer ${
                              result.passed ? 'bg-green-50' : 'bg-red-50'
                            }`}
                            onClick={() => toggleExpandTest(result.testCase.id)}
                          >
                            <div className="flex items-center gap-2">
                              {result.passed ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-red-600" />
                              )}
                              <span className="font-medium">
                                {result.testCase.description ||
                                  `${t('challenge.test')} ${index + 1}`}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  result.passed
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {result.passed ? t('challenge.passed') : t('challenge.failed')}
                              </span>

                              <ArrowRight
                                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                              />
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="p-4 bg-white border-t border-gray-100">
                              <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                  <div className="text-sm font-medium text-gray-700 mb-1">
                                    {t('challenge.input')}:
                                  </div>
                                  <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto max-h-32">
                                    {JSON.stringify(result.testCase.input, null, 2)}
                                  </pre>
                                </div>

                                <div>
                                  <div className="text-sm font-medium text-gray-700 mb-1">
                                    {t('challenge.expectedOutput')}:
                                  </div>
                                  <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto max-h-32">
                                    {JSON.stringify(result.testCase.expectedOutput, null, 2)}
                                  </pre>
                                </div>
                              </div>

                              {!result.passed && (
                                <div>
                                  <div className="text-sm font-medium text-gray-700 mb-1">
                                    {t('challenge.actualOutput')}:
                                  </div>
                                  <pre
                                    className={`p-2 rounded text-sm overflow-auto max-h-32 ${
                                      result.error ? 'bg-red-50 text-red-800' : 'bg-gray-50'
                                    }`}
                                  >
                                    {result.error || JSON.stringify(result.actualOutput, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : isRunning ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
                  <p className="text-gray-500">{t('challenge.executingTests')}</p>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Terminal className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">{t('challenge.noTestsRun')}</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    {t('challenge.clickRunToExecute')}
                  </p>
                  <button
                    onClick={runCode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1 mx-auto"
                  >
                    <PlayCircle className="h-4 w-4" />
                    {t('challenge.run')}
                  </button>
                </div>
              )}
            </TabsContent>

            {/* Solution */}
            {/* <TabsContent value="solution" className="p-6 mt-0 h-full overflow-auto">
              {challenge.solution ? (
                <div>
                  <h3 className="text-lg font-semibold mb-3">{t('challenge.solution')}</h3>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{t('challenge.approach')}: {challenge.solution.approach}</h4>
                    <p>{challenge.solution.explanation}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{t('challenge.complexity')}</h4>
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">{t('challenge.time')}:</span> {challenge.solution.complexity?.time}
                      </div>
                      <div>
                        <span className="font-medium">{t('challenge.space')}:</span> {challenge.solution.complexity?.space}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">{t('challenge.solutionCode')}:</h4>
                    <div className="bg-gray-900 text-white p-4 rounded-md overflow-x-auto">
                      <pre><code>{challenge.solution.code?.javascript || challenge.solution.code}</code></pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-2">{t('challenge.solutionLocked')}</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    {t('challenge.solutionLockedMessage')}
                  </p>
                  <button 
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    onClick={() => setActiveTab("description")}
                  >
                    {t('challenge.tryChallenge')}
                  </button>
                </div>
              )}
            </TabsContent> */}

            {/* Discussion */}
            <TabsContent value="discussion" className="p-6 mt-0 h-full overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t('challenge.discussions')}</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {t('challenge.newDiscussion')}
                </button>
              </div>

              <div className="space-y-4">
                {/* Discussions simulées */}
                <div className="border rounded-md overflow-hidden">
                  <div className="p-4 bg-white">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-800">JD</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">John Doe</h4>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            Top contributeur
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Il y a 2 jours</p>
                      </div>
                    </div>
                    <h4 className="text-base font-medium mb-2">Solution O(n) avec explication</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      J'ai trouvé une solution en O(n) en utilisant une approche par hachage. L'idée
                      principale est...
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-gray-500 flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Lire la suite</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <div className="p-4 bg-white">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="font-medium text-purple-800">JS</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Jane Smith</h4>
                        <p className="text-xs text-gray-500">Il y a 1 semaine</p>
                      </div>
                    </div>
                    <h4 className="text-base font-medium mb-2">Solution en une ligne</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Voici une solution concise en une seule ligne...
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-gray-500 flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Lire la suite</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Panneau d'éditeur */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen lg:h-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-3 py-1.5 border rounded-md text-sm"
            >
              {challenge.languageOptions?.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="px-4 py-2 flex items-center gap-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                  {t('challenge.running')}
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  {t('challenge.run')}
                </>
              )}
            </button>
            <button
              onClick={submitChallenge}
              disabled={isSubmitting}
              className="px-4 py-2 flex items-center gap-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? t('challenge.submitting') : t('challenge.submit')}
            </button>
          </div>
        </div>

        {showSettings && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('editor.fontSize')}</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFontSize(Math.max(fontSize - 2, 12))}
                    className="px-2 py-1 border rounded bg-white"
                  >
                    -
                  </button>
                  <span className="text-sm w-12 text-center">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize(Math.min(fontSize + 2, 24))}
                    className="px-2 py-1 border rounded bg-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">{t('editor.theme')}</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-3 py-1.5 border rounded-md bg-white text-sm"
                >
                  <option value="vs-dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-[500px]">
          <MonacoEditor
            language={language}
            theme={theme}
            value={code}
            onChange={handleCodeChange}
            fontSize={fontSize}
          />
        </div>
      </div>
    </div>
  );
};

export default ChallengeInterface;
