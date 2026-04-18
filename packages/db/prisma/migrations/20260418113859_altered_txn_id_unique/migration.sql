/*
  Warnings:

  - A unique constraint covering the columns `[txn_id]` on the table `PeerTransfer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PeerTransfer_txn_id_key" ON "PeerTransfer"("txn_id");
