/*
  Warnings:

  - A unique constraint covering the columns `[name,resourceId]` on the table `IncomeCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resourceId` to the `IncomeCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncomeCategory" ADD COLUMN     "resourceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "IncomeCategory_name_resourceId_key" ON "IncomeCategory"("name", "resourceId");

-- AddForeignKey
ALTER TABLE "IncomeCategory" ADD CONSTRAINT "IncomeCategory_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "IncomeResource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
