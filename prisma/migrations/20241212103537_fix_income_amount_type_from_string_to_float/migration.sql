/*
  Warnings:

  - The `income_amount` column on the `Record` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Record" DROP COLUMN "income_amount",
ADD COLUMN     "income_amount" DOUBLE PRECISION;
