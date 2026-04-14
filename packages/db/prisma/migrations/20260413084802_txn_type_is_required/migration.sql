/*
  Warnings:

  - Made the column `txn_type` on table `OnRamping` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "OnRamping" ALTER COLUMN "txn_type" SET NOT NULL;
