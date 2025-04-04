export enum ChallengeStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
}

export interface Challenge {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  status: ChallengeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengeDto {
  ownerId: number;
  title: string;
  description: string;
}

export interface ChallengeUpdateDto {
  title?: string;
  description?: string;
}
