export type challengeStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type userChallengeStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'FAILED'
  | 'COMPLETED'
  | 'ABANDONED'
  | 'DISQUALIFIED';

export interface GetChallengeByUser {
  id: number;
  title: string;
  description: string;
  status: string;
}
