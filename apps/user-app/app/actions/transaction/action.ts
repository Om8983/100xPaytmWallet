"use server";

import { prisma } from "@repo/db";
import { getUserOrThrow } from "../../../lib/auth/utils";
type SessionData = {
  user: {
    id: string;
    email: string;
  };
};

export type P2PTxnData = {
  amount: number;
  status: string;
  startTime: string;
  endTime: string;
  receiver_email: string;
  sender_email: string;
};
// peer to peer server action for user currently being logged in.
export const getP2PtxnData = async (): Promise<P2PTxnData[]> => {
  try {
    const userSession = await getUserOrThrow();
    const user = await prisma.user.findUnique({
      where: {
        id: userSession.user.id,
      },
      select: {
        email: true,
        Sender: {
          select: {
            amount: true,
            status: true,
            startTime: true,
            endTime: true,
            receiver: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("No data found!");
    }

    const mappedData: P2PTxnData[] = user.Sender.map((txn) => ({
      amount: txn.amount,
      status: txn.status,
      startTime: txn.startTime.toISOString(),
      endTime: txn.endTime ? txn.endTime.toISOString() : "",
      receiver_email: txn.receiver.email,
      sender_email: user.email,
    }));

    return mappedData;
  } catch (error) {
    throw error;
  }
};

export type OnRampTxnData = {
  id: string;
  status: string;
  amount: number;
  provider: string;
  startTime: string;
  endTime: string;
};
// user balance fetching server action
export const getBalanceTxnData = async (): Promise<OnRampTxnData[]> => {
  try {
    const userSession = await getUserOrThrow();
    const user = await prisma.user.findUnique({
      where: {
        id: userSession.user.id,
      },
      select: {
        OnRamping: {
          select: {
            // well here we are directly treating id as the txnId rather being token the txnId. Since we know that the token is supposed to be the token that the bank server will pass us and on that basis we will open the modal for the selected bank and then while making payment we wil also send that token so that the bank can verify the token is valid and will proceed the payment with respect to that.
            id: true,
            status: true,
            amount: true,
            provider: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("No data found!");
    }

    const mappedData: OnRampTxnData[] = user.OnRamping.map((txn) => ({
      id: txn.id,
      status: txn.status,
      amount: txn.amount,
      provider: txn.provider,
      startTime: txn.startTime.toISOString(),
      endTime: txn.endTime ? txn.endTime.toISOString() : "",
    }));

    return mappedData;
  } catch (error) {
    throw error;
  }
};
