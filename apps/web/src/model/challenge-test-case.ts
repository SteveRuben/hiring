export interface TestCaseChallenge {
  id: number;
  stepId: number;
  inputData: string;
  expectedOutput: string;
  score: number;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChallengeTestCaseDto {
  stepId: number;
  inputData: string;
  expectedOutput: string;
  score?: number;
  description?: string;
}

export interface UpdateChallengeTestCaseDto {
  inputData?: string;
  expectedOutput?: string;
  score?: number;
  description?: string;
}
