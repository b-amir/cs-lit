/*
  Warnings:

  - You are about to drop the column `pinned` on the `Analogy` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `commenterId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CATEGORY_STATUS" AS ENUM ('PENDING', 'PUBLISHED', 'REJECTED', 'DELETED');

-- DropIndex
DROP INDEX "Comment_userId_idx";

-- AlterTable
ALTER TABLE "Analogy" DROP COLUMN "pinned",
ADD COLUMN     "reference" TEXT;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "status" "CATEGORY_STATUS" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId",
ADD COLUMN     "commenterId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_commenterId_idx" ON "Comment"("commenterId");
