/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `XRate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `XRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "XRate" ADD COLUMN     "date" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "XRate_date_key" ON "XRate"("date");
