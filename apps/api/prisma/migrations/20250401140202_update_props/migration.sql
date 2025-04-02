/*
  Warnings:

  - The `status` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "status",
ADD COLUMN     "status" "ChallengeStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "TestCaseChallenge" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;
