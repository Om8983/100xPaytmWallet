/*
  Warnings:

  - You are about to drop the column `idempotency_key` on the `PeerTransfer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PeerTransfer" DROP COLUMN "idempotency_key";
