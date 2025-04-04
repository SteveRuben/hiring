'use client';

import React, { useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [lastCodeHash, setLastCodeHash] = useState<string>('');
  const [lastTestTime, setLastTestTime] = useState<number>(0);

  // Réinitialiser les résultats lorsque le code change
  useEffect(() => {
    // Simple fonction de hachage pour détecter les changements de code
    const hash = btoa(encodeURIComponent(code)).slice(0, 10);
    if (lastCodeHash && lastCodeHash !== hash) {
      // Le code a changé, réinitialiser les résultats
      setResults([]);
    }
    setLastCodeHash(hash);
  }, [code]);

  const runAllTests = async () => {
    setIsLoading(true);
    // Enregistrer l'heure exacte d'exécution pour afficher des informations utiles
    const currentTime = Date.now();
    setLastTestTime(currentTime);

    try {
      const testResults = await runTests(code, testCases, language);
      setResults(testResults);
      onTestComplete(testResults);
    } catch (error) {
      console.error("Erreur lors de l'exécution des tests:", error);
      // Ajouter des résultats d'erreur pour chaque test
      const errorResults: TestResult[] = testCases.map((testCase) => ({
        testCase,
        passed: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      }));
      setResults(errorResults);
      onTestComplete(errorResults);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculer le nombre de tests réussis
  const passedCount = results.filter((r) => r.passed).length;
  const allPassed = results.length > 0 && passedCount === testCases.length;

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">{t('testRunner.title')}</h3>

      <div className="flex justify-between items-center">
        <button
          onClick={runAllTests}
          disabled={isLoading}
          className={`px-4 py-2 ${
            allPassed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded disabled:opacity-50 transition-colors`}
        >
          {isLoading ? t('testRunner.runningTests') : t('testRunner.runTests')}
        </button>

        {lastTestTime > 0 && (
          <span className="text-sm text-gray-500">
            {t('testRunner.lastRun')} {new Date(lastTestTime).toLocaleTimeString()}
          </span>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{t('testRunner.results')}</h4>
            <span className={`text-sm ${allPassed ? 'text-green-600 font-bold' : 'text-gray-600'}`}>
              {passedCount}/{testCases.length} {t('testRunner.testsPassed')}
            </span>
          </div>
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.testCase.id}
                className={`p-3 rounded-md ${
                  result.passed ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
                } border`}
              >
                <div className="flex justify-between">
                  <span className="font-medium">{result.testCase.description}</span>
                  <span>{result.passed ? t('testRunner.passed') : t('testRunner.failed')}</span>
                </div>

                <div className="mt-2 text-sm">
                  <div>
                    <strong>{t('testRunner.input')}</strong> {JSON.stringify(result.testCase.input)}
                  </div>
                  <div>
                    <strong>{t('testRunner.expectedOutput')}</strong>{' '}
                    {JSON.stringify(result.testCase.expectedOutput)}
                  </div>
                  {!result.passed && (
                    <div>
                      <strong>{t('testRunner.actualOutput')}</strong>{' '}
                      {result.error ? (
                        <span className="text-red-600">{result.error}</span>
                      ) : (
                        JSON.stringify(result.actualOutput)
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default TestRunner;
