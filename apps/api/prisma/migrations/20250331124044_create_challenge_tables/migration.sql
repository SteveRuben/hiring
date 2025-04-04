-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeStep" (
    "id" SERIAL NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChallengeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestCaseChallenge" (
    "id" SERIAL NOT NULL,
    "stepId" INTEGER NOT NULL,
    "inputData" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,

    CONSTRAINT "TestCaseChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChallenge" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'in_progress',

    CONSTRAINT "UserChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionChallenge" (
    "id" SERIAL NOT NULL,
    "stepId" INTEGER NOT NULL,
    "userChallengeId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "result" BOOLEAN NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserScoreChallenge" (
    "id" SERIAL NOT NULL,
    "userChallengeId" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserScoreChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaderboardChallenge" (
    "id" SERIAL NOT NULL,
    "userChallengeId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "LeaderboardChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserChallenge_userId_challengeId_key" ON "UserChallenge"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "SubmissionChallenge_userChallengeId_stepId_key" ON "SubmissionChallenge"("userChallengeId", "stepId");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeStep" ADD CONSTRAINT "ChallengeStep_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestCaseChallenge" ADD CONSTRAINT "TestCaseChallenge_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ChallengeStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChallenge" ADD CONSTRAINT "UserChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChallenge" ADD CONSTRAINT "UserChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionChallenge" ADD CONSTRAINT "SubmissionChallenge_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "ChallengeStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionChallenge" ADD CONSTRAINT "SubmissionChallenge_userChallengeId_fkey" FOREIGN KEY ("userChallengeId") REFERENCES "UserChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScoreChallenge" ADD CONSTRAINT "UserScoreChallenge_userChallengeId_fkey" FOREIGN KEY ("userChallengeId") REFERENCES "UserChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardChallenge" ADD CONSTRAINT "LeaderboardChallenge_userChallengeId_fkey" FOREIGN KEY ("userChallengeId") REFERENCES "UserChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaderboardChallenge" ADD CONSTRAINT "LeaderboardChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
