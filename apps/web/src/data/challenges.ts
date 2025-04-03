import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 'array-manipulation',
    title: 'Manipulation de tableaux',
    description: "Une série d'exercices sur la manipulation des tableaux.",
    category: 'algorithms',
    languageOptions: ['typescript', 'javascript', 'python'],
    exercises: [
      {
        id: 'array-sum',
        title: 'Somme des éléments',
        description: "Écrivez une fonction qui calcule la somme de tous les éléments d'un tableau.",
        initialCode: `// Écrivez une fonction qui calcule la somme des éléments d'un tableau
function arraySum(numbers: number[]): number {
  // Votre code ici
}

export default arraySum;`,
        testCases: [
          {
            id: 'test-1',
            input: [1, 2, 3, 4, 5],
            expectedOutput: 15,
            description: "Somme d'un tableau de 5 entiers positifs",
          },
          {
            id: 'test-2',
            input: [-1, -2, 3, 4],
            expectedOutput: 4,
            description: "Somme d'un tableau avec des nombres négatifs",
          },
          {
            id: 'test-3',
            input: [],
            expectedOutput: 0,
            description: "Somme d'un tableau vide",
          },
        ],
        difficulty: 'easy',
      },
      {
        id: 'array-filter',
        title: "Filtrage d'éléments",
        description: "Écrivez une fonction qui filtre les nombres pairs d'un tableau.",
        initialCode: `// Écrivez une fonction qui renvoie un nouveau tableau contenant uniquement les nombres pairs
function filterEvenNumbers(numbers: number[]): number[] {
  // Votre code ici
}

export default filterEvenNumbers;`,
        testCases: [
          {
            id: 'test-1',
            input: [1, 2, 3, 4, 5, 6],
            expectedOutput: [2, 4, 6],
            description: "Filtrer les nombres pairs d'un tableau mixte",
          },
          {
            id: 'test-2',
            input: [1, 3, 5, 7],
            expectedOutput: [],
            description: "Filtrer les nombres pairs d'un tableau sans nombres pairs",
          },
          {
            id: 'test-3',
            input: [2, 4, 6, 8],
            expectedOutput: [2, 4, 6, 8],
            description: "Filtrer les nombres pairs d'un tableau uniquement de nombres pairs",
          },
        ],
        difficulty: 'easy',
      },
    ],
    difficulty: 'Intermédiaire',
    participants: 50,
    completionRate: 10,
    points: 10,
  },
  {
    id: 'string-manipulation',
    title: 'Manipulation de chaînes de caractères',
    description: "Exercices sur la manipulation et l'analyse de chaînes de caractères.",
    category: 'strings',
    languageOptions: ['typescript', 'javascript', 'python'],
    exercises: [
      {
        id: 'string-reverse',
        title: 'Inversion de chaîne',
        description: 'Écrivez une fonction qui inverse une chaîne de caractères.',
        initialCode: `// Écrivez une fonction qui inverse une chaîne de caractères
function reverseString(str: string): string {
  // Votre code ici
}

export default reverseString;`,
        testCases: [
          {
            id: 'test-1',
            input: 'hello',
            expectedOutput: 'olleh',
            description: 'Inverser une chaîne simple',
          },
          {
            id: 'test-2',
            input: 'JavaScript',
            expectedOutput: 'tpircSavaJ',
            description: 'Inverser une chaîne avec majuscules',
          },
          {
            id: 'test-3',
            input: '',
            expectedOutput: '',
            description: 'Inverser une chaîne vide',
          },
        ],
        difficulty: 'easy',
      },
    ],
    difficulty: 'Difficile',
    participants: 50,
    completionRate: 10,
    points: 60,
  },
];
