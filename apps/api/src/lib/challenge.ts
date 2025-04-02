import { challengeStatus } from '@/types/challenges';

export const STATUS_CHALLENGE: Record<challengeStatus, challengeStatus> = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
};
