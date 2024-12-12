/*
  Warnings:

  - You are about to drop the column `payment_methodId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the column `regular_unitId` on the `Record` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegularUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_payment_methodId_fkey";

-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_regular_unitId_fkey";

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "payment_methodId",
DROP COLUMN "regular_unitId",
ADD COLUMN     "payment_method" TEXT,
ADD COLUMN     "regular_unit" TEXT;

-- DropTable
DROP TABLE "PaymentMethod";

-- DropTable
DROP TABLE "RegularUnit";
