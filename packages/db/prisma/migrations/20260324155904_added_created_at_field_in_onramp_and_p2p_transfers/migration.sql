/*
  Warnings:

  - Added the required column `created_at` to the `OnRamping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `PeerTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRamping" ADD COLUMN     "created_at" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PeerTransfer" ADD COLUMN     "createdAt" TEXT NOT NULL;
