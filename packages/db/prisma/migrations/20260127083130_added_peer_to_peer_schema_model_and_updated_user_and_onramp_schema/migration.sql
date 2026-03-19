/*
  Warnings:

  - The primary key for the `Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OnRamping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `startTime` to the `OnRamping` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PeerStatus" AS ENUM ('SUCCESS', 'PENDING', 'FAILED');

-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "OnRamping" DROP CONSTRAINT "OnRamping_userId_fkey";

-- AlterTable
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Balance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Balance_id_seq";

-- AlterTable
ALTER TABLE "OnRamping" DROP CONSTRAINT "OnRamping_pkey",
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OnRamping_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OnRamping_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "PeerTransfer" (
    "id" TEXT NOT NULL,
    "status" "PeerStatus" NOT NULL,
    "amount" INTEGER NOT NULL,
    "idempotency_key" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "PeerTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRamping" ADD CONSTRAINT "OnRamping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerTransfer" ADD CONSTRAINT "PeerTransfer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerTransfer" ADD CONSTRAINT "PeerTransfer_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
