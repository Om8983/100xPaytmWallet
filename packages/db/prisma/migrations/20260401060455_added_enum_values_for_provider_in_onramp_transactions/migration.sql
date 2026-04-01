/*
  Warnings:

  - The `provider` column on the `OnRamping` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PROVIDER" AS ENUM ('HDFC_BANK', 'ICICI_BANK', 'SBI_BANK');

-- AlterTable
ALTER TABLE "OnRamping" DROP COLUMN "provider",
ADD COLUMN     "provider" "PROVIDER" NOT NULL DEFAULT 'HDFC_BANK';
