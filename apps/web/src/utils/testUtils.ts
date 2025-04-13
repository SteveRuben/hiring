// import { TestCase } from '../types';

// export type TestResult = {
//   testCase: TestCase;
//   passed: boolean;
//   actualOutput?: any;
//   error?: string;
// };

// export async function runTests(
//   code: string,
//   testCases: TestCase[],
//   language: string
// ): Promise<TestResult[]> {
//   const results: TestResult[] = [];
//   console.log(language);
//   try {
//     // Prétraiter le code pour supprimer les annotations TypeScript et les exports
//     let processedCode = code;

//     // Supprimer les annotations de type si présentes
//     processedCode = processedCode.replace(/:\s*number(\[\])?/g, '');
//     processedCode = processedCode.replace(/:\s*string(\[\])?/g, '');
//     processedCode = processedCode.replace(/:\s*boolean(\[\])?/g, '');
//     processedCode = processedCode.replace(/:\s*any(\[\])?/g, '');
//     processedCode = processedCode.replace(/:\s*void(\[\])?/g, '');

//     // Supprimer/commenter l'instruction export
//     processedCode = processedCode.replace(/export\s+default\s+(\w+);?/g, '// export removed: $1');

//     console.log('Code prétraité:', processedCode);

//     // Approche ultra simplifiée
//     try {
//       // Essayer d'identifier le nom de la fonction directement
//       const functionNameMatch = processedCode.match(/function\s+(\w+)/);
//       if (!functionNameMatch) {
//         throw new Error('Impossible de trouver le nom de la fonction');
//       }

//       const functionName = functionNameMatch[1];
//       console.log('Nom de fonction détecté:', functionName);

//       // Créer un script simple qui définit la fonction puis la retourne
//       const evalScript = `
//         ${processedCode}
//         ${functionName};  // Retourner la fonction
//       `;

//       // Utiliser une méthode d'évaluation plus directe
//       const userFunction = eval(evalScript);
//       console.log('Fonction extraite avec succès:', typeof userFunction);

//       if (typeof userFunction !== 'function') {
//         throw new Error("L'extraction de la fonction a échoué");
//       }

//       // Exécuter les tests
//       for (const testCase of testCases) {
//         try {
//           console.log(`Test: ${testCase.description}, Input:`, testCase.input);
//           const actualOutput = userFunction(testCase.input);
//           console.log('Output:', actualOutput);

//           // Vérifier si le résultat correspond à ce qui est attendu
//           let passed = false;

//           if (Array.isArray(actualOutput) && Array.isArray(testCase.expectedOutput)) {
//             // Comparaison stricte pour les tableaux
//             // Convertir en JSON pour comparer le contenu plutôt que les références
//             passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);
//           } else {
//             // Comparaison normale pour les autres types
//             passed = actualOutput === testCase.expectedOutput;
//           }

//           results.push({
//             testCase,
//             passed,
//             actualOutput,
//           });

//           console.log(`Test ${passed ? 'réussi' : 'échoué'}`);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : String(error);
//           console.error(`Erreur d'exécution du test: ${errorMessage}`);
//           results.push({
//             testCase,
//             passed: false,
//             error: `Erreur lors de l'exécution: ${errorMessage}`,
//             actualOutput: null,
//           });
//         }
//       }
//     } catch (functionError) {
//       const errorMessage =
//         functionError instanceof Error ? functionError.message : String(functionError);
//       console.error(`Erreur lors de l'analyse de la fonction: ${errorMessage}`);

//       try {
//         const wrappedCode = `
//           function extractUserFunction() {
//             ${processedCode}
//             // Essayer de détecter la fonction par son nom en cherchant dans les noms connus
//             return (typeof filterEvenNumbers !== 'undefined') ? filterEvenNumbers :
//                    (typeof arraySum !== 'undefined') ? arraySum :
//                    (typeof reverseString !== 'undefined') ? reverseString :
//                    null;
//           }
//           extractUserFunction();
//         `;

//         const userFunction = eval(wrappedCode);

//         if (typeof userFunction !== 'function') {
//           throw new Error('Fonction non trouvée dans le code');
//         }

//         // Exécuter les tests avec la fonction récupérée
//         for (const testCase of testCases) {
//           try {
//             const actualOutput = userFunction(testCase.input);

//             let passed = false;
//             if (Array.isArray(actualOutput) && Array.isArray(testCase.expectedOutput)) {
//               passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.expectedOutput);
//             } else {
//               passed = actualOutput === testCase.expectedOutput;
//             }

//             results.push({
//               testCase,
//               passed,
//               actualOutput,
//             });
//           } catch (testError) {
//             const testErrorMessage =
//               testError instanceof Error ? testError.message : String(testError);
//             results.push({
//               testCase,
//               passed: false,
//               error: `Erreur lors du test: ${testErrorMessage}`,
//               actualOutput: null,
//             });
//           }
//         }
//       } catch (finalError) {
//         const finalErrorMessage =
//           finalError instanceof Error ? finalError.message : String(finalError);
//         // Dernière option : rapport d'erreur global
//         return testCases.map((testCase) => ({
//           testCase,
//           passed: false,
//           error: `Impossible d'exécuter le code: ${finalErrorMessage}`,
//           actualOutput: null,
//         }));
//       }
//     }
//   } catch (error) {
//     const globalErrorMessage = error instanceof Error ? error.message : String(error);
//     console.error('Erreur globale:', globalErrorMessage);

//     // En cas d'erreur globale, tous les tests échouent
//     return testCases.map((testCase) => ({
//       testCase,
//       passed: false,
//       error: `Erreur générale: ${globalErrorMessage}`,
//       actualOutput: null,
//     }));
//   }

//   return results;
// }
// @/utils/testUtils.ts

// @/utils/testUtils.ts

import { TestCase, TestResult } from '@/types';

/**
 * Fonction qui exécute le code de l'utilisateur par rapport à un ensemble de cas de test
 */
export async function runTests(
  code: string,
  testCases: TestCase[],
  language: string
): Promise<TestResult[]> {
  const results: TestResult[] = [];

  try {
    // Prétraiter le code si c'est du TypeScript
    let processedCode = code;
    if (language === 'typescript') {
      // Supprimer les annotations de type TypeScript pour l'exécution
      processedCode = removeTypeAnnotations(code);
    }

    for (const testCase of testCases) {
      try {
        // Variable pour stocker le résultat de l'exécution
        let actualOutput;

        if (language === 'javascript' || language === 'typescript') {
          // Exécuter le code JavaScript/TypeScript
          actualOutput = await executeJavaScript(processedCode, testCase.input);
        } else if (language === 'python') {
          // Utiliser un service externe ou une API pour exécuter Python
          throw new Error('Python execution not implemented in browser environment');
        } else {
          throw new Error(`Language ${language} not supported`);
        }

        // Comparer la sortie réelle avec la sortie attendue
        const passed = compareResults(actualOutput, testCase.expectedOutput);

        // Ajouter le résultat
        results.push({
          testCase,
          passed,
          actualOutput,
        });
      } catch (error) {
        // Gérer les erreurs spécifiques à chaque test
        results.push({
          testCase,
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return results;
  } catch (error) {
    // Gérer les erreurs globales
    console.error('Error running tests:', error);
    throw error;
  }
}

/**
 * Supprime les annotations de type TypeScript du code
 */
function removeTypeAnnotations(code: string): string {
  // Regex simplifiée pour supprimer les annotations de type basiques
  // Note: Ceci n'est pas une solution parfaite pour toutes les syntaxes TypeScript
  let processedCode = code
    // Supprimer les annotations de paramètres de fonction
    .replace(/\s*:\s*[a-zA-Z<>[\],\s]+(?=[,)])/g, '')
    // Supprimer les types de retour
    .replace(/\)\s*:\s*[a-zA-Z<>[\],\s]+\s*{/g, ') {')
    // Supprimer les interfaces et les types
    .replace(/^interface\s+[^{]+{[\s\S]*?}$/gm, '')
    .replace(/^type\s+[^=]+=[\s\S]*?;$/gm, '');

  return processedCode;
}

/**
 * Exécute du code JavaScript avec une entrée spécifique
 */
function executeJavaScript(code: string, input: any): Promise<any> {
  try {
    // Supprimer les déclarations d'export qui ne sont pas supportées
    const codeWithoutExports = code.replace(/export\s+(default\s+)?/g, '');

    // Préparer le contexte d'exécution
    const functionName = extractFunctionName(codeWithoutExports);

    if (!functionName) {
      throw new Error('Could not extract function name from code');
    }

    // Créer la fonction à partir du code

    const userFunction = new Function(`
      ${codeWithoutExports}
      return ${functionName}(${JSON.stringify(input)});
    `);

    // Exécuter la fonction
    return userFunction();
  } catch (error) {
    console.error('Error executing JavaScript:', error);
    throw error;
  }
}

/**
 * Compare les résultats attendus avec les résultats réels
 */
function compareResults(actual: any, expected: any): boolean {
  try {
    // Utiliser une comparaison stricte via JSON.stringify pour comparer des objets/tableaux
    return JSON.stringify(actual) === JSON.stringify(expected);
  } catch (error) {
    // En cas d'erreur dans la comparaison (objets circulaires, etc.)
    console.error('Error comparing results:', error);
    return false;
  }
}

/**
 * Extrait le nom de la fonction principale du code
 */
function extractFunctionName(code: string): string | null {
  // Pour l'exercice spécifique de somme de tableau
  if (code.includes('arraySum')) {
    return 'arraySum';
  }
  if (code.includes('sumArray')) {
    return 'sumArray';
  }

  // Essayer de trouver une déclaration de fonction
  const functionMatch = code.match(/function\s+(\w+)\s*\(/);
  if (functionMatch && functionMatch[1]) {
    return functionMatch[1];
  }

  // Essayer de trouver une expression de fonction (var/let/const)
  const varFunctionMatch = code.match(/(?:var|let|const)\s+(\w+)\s*=\s*function\s*\(/);
  if (varFunctionMatch && varFunctionMatch[1]) {
    return varFunctionMatch[1];
  }

  // Essayer de trouver une fonction fléchée
  const arrowFunctionMatch = code.match(
    /(?:var|let|const)\s+(\w+)\s*=\s*(?:\(.*?\)|[^=])\s*=>\s*{/
  );
  if (arrowFunctionMatch && arrowFunctionMatch[1]) {
    return arrowFunctionMatch[1];
  }

  // Par défaut, chercher toute assignation de variable
  const assignmentMatch = code.match(/(?:var|let|const)\s+(\w+)\s*=/);
  return assignmentMatch && assignmentMatch[1] ? assignmentMatch[1] : null;
}
