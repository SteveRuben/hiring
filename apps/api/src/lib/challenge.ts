import { challengeStatus, userChallengeStatus } from '@/types/challenges';

export const STATUS_CHALLENGE: Record<challengeStatus, challengeStatus> = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
};
export const USER_CHALLENGE_STATUS: Record<
  userChallengeStatus,
  userChallengeStatus
> = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  FAILED: 'FAILED',
  COMPLETED: 'COMPLETED',
  ABANDONED: 'ABANDONED',
  DISQUALIFIED: 'DISQUALIFIED',
};
