/*
  Warnings:

  - Added the required column `txn_id` to the `PeerTransfer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `txn_type` to the `PeerTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PeerTransfer" ADD COLUMN     "txn_id" TEXT NOT NULL,
ADD COLUMN     "txn_type" TEXT NOT NULL;
