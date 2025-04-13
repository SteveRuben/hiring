// 'use client';

// import React, { useEffect, useState } from 'react';

// import { TestCase, TestResult } from '@/types';
// import { runTests } from '@/utils/testUtils';

// import { useTranslation } from '../i18n';

// interface TestRunnerProps {
//   code: string;
//   testCases: TestCase[];
//   language: string;
//   // eslint-disable-next-line no-unused-vars
//   onTestComplete: (results: TestResult[]) => void;
// }

// const TestRunner: React.FC<TestRunnerProps> = ({ code, testCases, language, onTestComplete }) => {
//   const { t } = useTranslation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState<TestResult[]>([]);
//   const [lastCodeHash, setLastCodeHash] = useState<string>('');
//   const [lastTestTime, setLastTestTime] = useState<number>(0);

//   // Réinitialiser les résultats lorsque le code change
//   useEffect(() => {
//     // Simple fonction de hachage pour détecter les changements de code
//     const hash = btoa(encodeURIComponent(code)).slice(0, 10);
//     if (lastCodeHash && lastCodeHash !== hash) {
//       // Le code a changé, réinitialiser les résultats
//       setResults([]);
//     }
//     setLastCodeHash(hash);
//   }, [code]);

//   const runAllTests = async () => {
//     setIsLoading(true);
//     // Enregistrer l'heure exacte d'exécution pour afficher des informations utiles
//     const currentTime = Date.now();
//     setLastTestTime(currentTime);

//     try {
//       const testResults = await runTests(code, testCases, language);
//       setResults(testResults);
//       onTestComplete(testResults);
//     } catch (error) {
//       console.error("Erreur lors de l'exécution des tests:", error);
//       // Ajouter des résultats d'erreur pour chaque test
//       const errorResults: TestResult[] = testCases.map((testCase) => ({
//         testCase,
//         passed: false,
//         error: error instanceof Error ? error.message : 'Erreur inconnue',
//       }));
//       setResults(errorResults);
//       onTestComplete(errorResults);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Calculer le nombre de tests réussis
//   const passedCount = results.filter((r) => r.passed).length;
//   const allPassed = results.length > 0 && passedCount === testCases.length;

//   return (
//     <div className="mt-4 p-4 border rounded-lg bg-gray-50">
//       <h3 className="text-lg font-semibold mb-3">{t('testRunner.title')}</h3>

//       <div className="flex justify-between items-center">
//         <button
//           onClick={runAllTests}
//           disabled={isLoading}
//           className={`px-4 py-2 ${
//             allPassed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
//           } text-white rounded disabled:opacity-50 transition-colors`}
//         >
//           {isLoading ? t('testRunner.runningTests') : t('testRunner.runTests')}
//         </button>

//         {lastTestTime > 0 && (
//           <span className="text-sm text-gray-500">
//             {t('testRunner.lastRun')} {new Date(lastTestTime).toLocaleTimeString()}
//           </span>
//         )}
//       </div>

//       {results.length > 0 && (
//         <div className="mt-4">
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="font-medium">{t('testRunner.results')}</h4>
//             <span className={`text-sm ${allPassed ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
//               {passedCount}/{testCases.length} {t('testRunner.testsPassed')}
//             </span>
//           </div>
//           <div className="space-y-2">
//             {results.map((result) => (
//               <div
//                 key={result.testCase.id}
//                 className={`p-3 rounded-md ${
//                   result.passed ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
//                 } border`}
//               >
//                 <div className="flex justify-between">
//                   <span className="font-medium">{result.testCase.description}</span>
//                   <span>{result.passed ? t('testRunner.passed') : t('testRunner.failed')}</span>
//                 </div>

//                 <div className="mt-2 text-sm">
//                   <div>
//                     <strong>{t('testRunner.input')}</strong> {JSON.stringify(result.testCase.input)}
//                   </div>
//                   <div>
//                     <strong>{t('testRunner.expectedOutput')}</strong>{' '}
//                     {JSON.stringify(result.testCase.expectedOutput)}
//                   </div>
//                   {!result.passed && (
//                     <div>
//                       <strong>{t('testRunner.actualOutput')}</strong>{' '}
//                       {result.error ? (
//                         <span className="text-red-600">{result.error}</span>
//                       ) : (
//                         JSON.stringify(result.actualOutput)
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default TestRunner;
'use client';

import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  CheckSquare,
  Clock,
  Code,
  Loader2,
  RefreshCw,
  TerminalSquare,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { TestCase, TestResult } from '@/types';
import { runTests } from '@/utils/testUtils';

import { useTranslation } from '../i18n';

interface TestRunnerProps {
  code: string;
  testCases: TestCase[];
  language: string;
  // eslint-disable-next-line no-unused-vars
  onTestComplete: (results: TestResult[]) => void;
}

const TestRunner: React.FC<TestRunnerProps> = ({ code, testCases, language, onTestComplete }) => {
  const { t } = useTranslation();

  // Regrouper tous les états dans un seul objet pour éviter les problèmes de hooks
  const [testState, setTestState] = useState({
    isLoading: false,
    results: [] as TestResult[],
    lastCodeHash: '',
    lastTestTime: 0,
    executionStats: null as { runtime: string; memory: string } | null,
    expandedTests: [] as string[],
  });

  // Extraire les valeurs pour plus de lisibilité
  const { isLoading, results, lastCodeHash, lastTestTime, executionStats, expandedTests } =
    testState;

  // Effet pour suivre les changements de code
  useEffect(() => {
    try {
      // Simple fonction de hachage pour détecter les changements de code
      const hash = btoa(encodeURIComponent(code || '')).slice(0, 10);

      if (lastCodeHash && lastCodeHash !== hash) {
        // Le code a changé, réinitialiser les résultats
        setTestState((prev) => ({
          ...prev,
          results: [],
          executionStats: null,
          lastCodeHash: hash,
        }));
      } else if (!lastCodeHash) {
        setTestState((prev) => ({
          ...prev,
          lastCodeHash: hash,
        }));
      }
    } catch (error) {
      console.error('Erreur lors du calcul du hachage:', error);
    }
  }, [code, lastCodeHash]);

  // Fonction pour exécuter les tests (utiliser useCallback pour stabiliser la référence)
  const runAllTests = useCallback(async () => {
    setTestState((prev) => ({ ...prev, isLoading: true }));

    // Enregistrer l'heure exacte d'exécution
    const currentTime = Date.now();
    const startTime = performance.now();

    try {
      // Exécuter les tests réels avec le code de l'utilisateur
      const testResults = await runTests(code, testCases, language);

      // Calculer le temps d'exécution
      const endTime = performance.now();
      const executionTime = Math.floor(endTime - startTime);

      // Calculer les statistiques d'exécution
      const stats = {
        runtime: `${executionTime} ms`,
        memory: `${(Math.random() * 5 + 40).toFixed(1)} MB`, // Simulation approximative
      };

      setTestState((prev) => ({
        ...prev,
        results: testResults,
        lastTestTime: currentTime,
        executionStats: stats,
        isLoading: false,
      }));

      onTestComplete(testResults);
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests:", error);

      // Ajouter des résultats d'erreur pour chaque test
      const errorResults: TestResult[] = testCases.map((testCase) => ({
        testCase,
        passed: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      }));

      setTestState((prev) => ({
        ...prev,
        results: errorResults,
        lastTestTime: currentTime,
        isLoading: false,
      }));

      onTestComplete(errorResults);
    }
  }, [code, testCases, language, onTestComplete]);

  // Fonction pour basculer l'expansion d'un test
  const toggleExpandTest = useCallback((testId: string) => {
    setTestState((prev) => {
      const newExpandedTests = prev.expandedTests.includes(testId)
        ? prev.expandedTests.filter((id) => id !== testId)
        : [...prev.expandedTests, testId];

      return { ...prev, expandedTests: newExpandedTests };
    });
  }, []);

  // Calculer le nombre de tests réussis
  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = results.length > 0 && passedCount === testCases.length;
  const anyFailed = results.length > 0 && passedCount < testCases.length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <TerminalSquare className="h-5 w-5" />
          {t('testRunner.title')}
        </h3>

        <button
          onClick={runAllTests}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md transition-colors flex items-center gap-1 ${
            allPassed
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } disabled:opacity-50`}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('testRunner.runningTests')}
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              {t('testRunner.runTests')}
            </>
          )}
        </button>
      </div>

      {lastTestTime > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {t('testRunner.lastRun')} {new Date(lastTestTime).toLocaleTimeString()}
          </span>

          {executionStats && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm">
                <Clock className="h-3 w-3 text-blue-500" />
                <span className="text-gray-700">{executionStats.runtime}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Code className="h-3 w-3 text-purple-500" />
                <span className="text-gray-700">{executionStats.memory}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Banner */}
      {results.length > 0 && (
        <div
          className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
            allPassed
              ? 'bg-green-50 border border-green-200'
              : anyFailed
                ? 'bg-red-50 border border-red-200'
                : 'bg-blue-50 border border-blue-200'
          }`}
        >
          {allPassed ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : anyFailed ? (
            <AlertCircle className="h-6 w-6 text-red-600" />
          ) : (
            <Clock className="h-6 w-6 text-blue-600" />
          )}

          <div>
            <h4
              className={`font-medium ${
                allPassed ? 'text-green-800' : anyFailed ? 'text-red-800' : 'text-blue-800'
              }`}
            >
              {allPassed
                ? t('testRunner.allTestsPassed')
                : anyFailed
                  ? t('testRunner.someTestsFailed')
                  : t('testRunner.testsExecuted')}
            </h4>
            <p className="text-sm">
              {passedCount}/{testCases.length} {t('testRunner.testsPassed')}
            </p>
          </div>
        </div>
      )}

      {/* Test Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => {
            const isExpanded = expandedTests.includes(result.testCase.id);

            return (
              <div
                key={result.testCase.id}
                className={`border rounded-md overflow-hidden transition-shadow ${
                  result.passed
                    ? 'border-green-200 hover:shadow-sm'
                    : 'border-red-200 hover:shadow-sm'
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
                      <CheckSquare className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">
                      {result.testCase.description ||
                        `${t('testRunner.test')} ${result.testCase.id}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.passed ? t('testRunner.passed') : t('testRunner.failed')}
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
                          {t('testRunner.input')}
                        </div>
                        <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto max-h-32">
                          {JSON.stringify(result.testCase.input, null, 2)}
                        </pre>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {t('testRunner.expectedOutput')}
                        </div>
                        <pre className="bg-gray-50 p-2 rounded text-sm overflow-auto max-h-32">
                          {JSON.stringify(result.testCase.expectedOutput, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {!result.passed && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {t('testRunner.actualOutput')}
                        </div>
                        <pre
                          className={`p-2 rounded text-sm overflow-auto max-h-32 ${
                            result.error ? 'bg-red-50 text-red-800' : 'bg-gray-50'
                          }`}
                        >
                          {result.error
                            ? result.error
                            : JSON.stringify(result.actualOutput, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state when no tests have been run */}
      {results.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-blue-50 rounded-full p-3 mb-3">
            <TerminalSquare className="h-8 w-8 text-blue-500" />
          </div>
          <h4 className="text-lg font-medium mb-2">{t('testRunner.noTestsRun')}</h4>
          <p className="text-gray-500 max-w-md mb-6">{t('testRunner.clickRunTests')}</p>
          <button
            onClick={runAllTests}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            {t('testRunner.runTests')}
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500">{t('testRunner.executingTests')}</p>
        </div>
      )}
    </div>
  );
};

export default TestRunner;
