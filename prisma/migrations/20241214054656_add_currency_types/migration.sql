/*
  Warnings:

  - Added the required column `cad` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chf` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cny` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ebp` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hkd` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `krw` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mxn` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nzd` to the `XRate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sgd` to the `XRate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "XRate" ADD COLUMN     "cad" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "chf" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cny" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "ebp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hkd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "krw" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mxn" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "nzd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sgd" DOUBLE PRECISION NOT NULL;
