/*
  Warnings:

  - You are about to drop the column `created_at` on the `OnRamping` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PeerTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OnRamping" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "PeerTransfer" DROP COLUMN "createdAt";
