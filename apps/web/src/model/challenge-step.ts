export interface ChallengeStep {
  id: number;
  challengeId: number;
  stepNumber: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChallengeStepDto {
  challengeId: number;
  description: string;
}

export interface UpdateChallengeStepDto {
  description?: string;
}
