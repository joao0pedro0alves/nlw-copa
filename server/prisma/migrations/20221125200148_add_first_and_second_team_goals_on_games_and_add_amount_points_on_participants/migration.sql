-- AlterTable
ALTER TABLE "Game" ADD COLUMN "firstTeamGoals" INTEGER;
ALTER TABLE "Game" ADD COLUMN "secondTeamGoals" INTEGER;

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN "amountPoints" INTEGER DEFAULT 0;
