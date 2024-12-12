-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_xrateId_fkey";

-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "regular_num" DROP NOT NULL,
ALTER COLUMN "xrateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_xrateId_fkey" FOREIGN KEY ("xrateId") REFERENCES "XRate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
