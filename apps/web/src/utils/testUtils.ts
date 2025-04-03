import { TestCase } from '../types';

export type TestResult = {
  testCase: TestCase;
  passed: boolean;
  actualOutput?: any;
  error?: string;
};

export async function runTests(
  code: string,
  testCases: TestCase[],
  language: string
): Promise<TestResult[]> {
  const results: TestResult[] = [];
  console.log(language);
  try {
    // Prétraiter le code pour supprimer les annotations TypeScript et les exports
    let processedCode = code;

    // Supprimer les annotations de type si présentes
    processedCode = processedCode.replace(/:\s*number(\[\])?/g, '');
    processedCode = processedCode.replace(/:\s*string(\[\])?/g, '');
    processedCode = processedCode.replace(/:\s*boolean(\[\])?/g, '');
    processedCode = processedCode.replace(/:\s*any(\[\])?/g, '');
    processedCode = processedCode.replace(/:\s*void(\[\])?/g, '');

    // Supprimer/commenter l'instruction export
    processedCode = processedCode.replace(/export\s+default\s+(\w+);?/g, '// export removed: $1');

    console.log('Code prétraité:', processedCode);

    // Approche ultra simplifiée
    try {
      // Essayer d'identifier le nom de la fonction directement
      const functionNameMatch = processedCode.match(/function\s+(\w+)/);
      if (!functionNameMatch) {
        throw new Error('Impossible de trouver le nom de la fonction');
      }

      const functionName = functionNameMatch[1];
      console.log('Nom de fonction détecté:', functionName);

      // Créer un script simple qui définit la fonction puis la retourne
      const evalScript = `
        ${processedCode}
        ${functionName};  // Retourner la fonction
      `;

      // Utiliser une méthode d'évaluation plus directe
      const userFunction = eval(evalScript);
      console.log('Fonction extraite avec succès:', typeof userFunction);

      if (typeof userFunction !== 'function') {
        throw new Error("L'extraction de la fonction a échoué");
      }

      // Exécuter les tests
      for (const testCase of testCases) {
        try {
          console.log(`Test: ${testCase.description}, Input:`, testCase.input);
          const actualOutput = userFunction(testCase.input);
          console.log('Output:', actualOutput);

          // Vérifier si le résultat correspond à ce qui est attendu
          let passed = false;

          if (Array.isArray(actualOutput) && Array.isArray(testCase.expectedOutput)) {
            // Comparaison stricte pour les tableaux
            // Convertir en JSON pour comparer le contenu plutôt que les références
            passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);
          } else {
            // Comparaison normale pour les autres types
            passed = actualOutput === testCase.expectedOutput;
          }

          results.push({
            testCase,
            passed,
            actualOutput,
          });

          console.log(`Test ${passed ? 'réussi' : 'échoué'}`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error(`Erreur d'exécution du test: ${errorMessage}`);
          results.push({
            testCase,
            passed: false,
            error: `Erreur lors de l'exécution: ${errorMessage}`,
            actualOutput: null,
          });
        }
      }
    } catch (functionError) {
      const errorMessage =
        functionError instanceof Error ? functionError.message : String(functionError);
      console.error(`Erreur lors de l'analyse de la fonction: ${errorMessage}`);

      try {
        const wrappedCode = `
          function extractUserFunction() {
            ${processedCode}
            // Essayer de détecter la fonction par son nom en cherchant dans les noms connus
            return (typeof filterEvenNumbers !== 'undefined') ? filterEvenNumbers :
                   (typeof arraySum !== 'undefined') ? arraySum :
                   (typeof reverseString !== 'undefined') ? reverseString :
                   null;
          }
          extractUserFunction();
        `;

        const userFunction = eval(wrappedCode);

        if (typeof userFunction !== 'function') {
          throw new Error('Fonction non trouvée dans le code');
        }

        // Exécuter les tests avec la fonction récupérée
        for (const testCase of testCases) {
          try {
            const actualOutput = userFunction(testCase.input);

            let passed = false;
            if (Array.isArray(actualOutput) && Array.isArray(testCase.expectedOutput)) {
              passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);
            } else {
              passed = actualOutput === testCase.expectedOutput;
            }

            results.push({
              testCase,
              passed,
              actualOutput,
            });
          } catch (testError) {
            const testErrorMessage =
              testError instanceof Error ? testError.message : String(testError);
            results.push({
              testCase,
              passed: false,
              error: `Erreur lors du test: ${testErrorMessage}`,
              actualOutput: null,
            });
          }
        }
      } catch (finalError) {
        const finalErrorMessage =
          finalError instanceof Error ? finalError.message : String(finalError);
        // Dernière option : rapport d'erreur global
        return testCases.map((testCase) => ({
          testCase,
          passed: false,
          error: `Impossible d'exécuter le code: ${finalErrorMessage}`,
          actualOutput: null,
        }));
      }
    }
  } catch (error) {
    const globalErrorMessage = error instanceof Error ? error.message : String(error);
    console.error('Erreur globale:', globalErrorMessage);

    // En cas d'erreur globale, tous les tests échouent
    return testCases.map((testCase) => ({
      testCase,
      passed: false,
      error: `Erreur générale: ${globalErrorMessage}`,
      actualOutput: null,
    }));
  }

  return results;
}
