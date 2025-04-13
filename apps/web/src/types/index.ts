export interface TestCase {
  id: string;
  input: any;
  expectedOutput: any;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  testCases: TestCase[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  exercises: Exercise;
  languageOptions: string[];
  difficulty: string;
  participants: number;
  completionRate: number;
  points: number;
}

export interface UserProgress {
  userId: string;
  completedExercises: {
    exerciseId: string;
    completedAt: Date;
    code: string;
    passedTests: string[]; // IDs of passed tests
  }[];
}

export type TestResult = {
  testCase: TestCase;
  passed: boolean;
  actualOutput?: any;
  error?: string;
};
