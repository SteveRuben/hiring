/*
  Warnings:

  - The `status` column on the `UserChallenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserChallengeStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'FAILED', 'COMPLETED', 'ABANDONED', 'DISQUALIFIED');

-- AlterTable
ALTER TABLE "UserChallenge" ALTER COLUMN "currentStep" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "UserChallengeStatus" NOT NULL DEFAULT 'PENDING';
