/*
  Warnings:

  - You are about to drop the column `genreId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_genreId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "genreId",
ADD COLUMN     "genre" TEXT;

-- DropTable
DROP TABLE "Genre";
