/*
  Warnings:

  - You are about to drop the column `ebp` on the `XRate` table. All the data in the column will be lost.
  - Added the required column `date` to the `Record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gbp` to the `XRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "XRate_base_key";

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "date" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "XRate" DROP COLUMN "ebp",
ADD COLUMN     "gbp" DOUBLE PRECISION NOT NULL;
