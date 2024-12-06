/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Poem` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `GuessedTitle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuessedTitle" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Poem" DROP COLUMN "updatedAt";
