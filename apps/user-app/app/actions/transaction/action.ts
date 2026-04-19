"use server";

import { prisma } from "@repo/db";
import { getUserOrThrow } from "../../../lib/auth/utils";
import { PROVIDER } from "../../../../../packages/db/generated/prisma";
import {
  P2PData,
  WalletData,
} from "../../../components/BalanceComp/TransactionTable";
import { PeerData } from "../../../components/p2pTransferComponents/QuickPayments";

// export type P2PTxnData = {
//   amount: number;
//   txn_status: string;
//   start_time: string;
//   end_time: string;
//   sender: string;
//   receiver: string;
//   txn_id: string;
// };
// peer to peer server action for user currently being logged in.
// make sure you convert the balance back to decimal if any transfers are done in decimal
export const getP2PtxnData = async (
  userId: string,
  take?: number,
): Promise<P2PData[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        token: true,
        email: true,
        Sender: {
          orderBy: {
            startTime: "desc",
          },
          take: take,
          select: {
            id: true,
            txn_id: true,
            txn_type: true,
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
        Receiver: {
          orderBy: {
            startTime: "desc",
          },
          take: take,
          select: {
            id: true,
            txn_id: true,
            txn_type: true,
            amount: true,
            status: true,
            startTime: true,
            endTime: true,
            user: {
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

    const allTxn = [
      ...user.Sender.map((txn) => ({
        id: txn.id,
        txn_id: txn.txn_id,
        txn_type: txn.txn_type as "sent" | "received",
        sender: user.email,
        receiver: txn.receiver.email,
        amount: txn.amount / 100,
        txn_status: txn.status,
        timeStamp: txn.startTime,
        start_time: {
          date: txn.startTime.toLocaleDateString(),
          time: txn.startTime.toLocaleTimeString(),
        },
        end_time: {
          date: txn.endTime !== null ? txn.endTime.toLocaleDateString() : "",
          time: txn.endTime !== null ? txn.endTime.toLocaleTimeString() : "",
        },
      })),
      ...user.Receiver.map((txn) => ({
        id: txn.id,
        txn_id: txn.txn_id,
        txn_type: txn.txn_type as "sent" | "received",
        sender: txn.user.email,
        receiver: user.email,
        amount: txn.amount / 100,
        txn_status: txn.status,
        timeStamp: txn.startTime,
        start_time: {
          date: txn.startTime.toLocaleDateString(),
          time: txn.startTime.toLocaleTimeString(),
        },
        end_time: {
          date: txn.endTime !== null ? txn.endTime.toLocaleDateString() : "",
          time: txn.endTime !== null ? txn.endTime.toLocaleTimeString() : "",
        },
      })),
    ];
    // descending sorting
    const sorted = allTxn.sort(
      (a, b) =>
        new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime(),
    );
    return sorted;
    // const mappedData: P2PData[] = user.Sender.map((txn) => ({
    //   id: txn.id,
    //   txn_id: txn.txn_id,
    //   txn_type: txn.txn_type as "sent" | "received",
    //   sender: user.email,
    //   amount: txn.amount / 100,
    //   txn_status: txn.status,
    //   timestamp: txn.startTime,
    //   start_time: {
    //     date: txn.startTime.toLocaleDateString(),
    //     time: txn.startTime.toLocaleTimeString(),
    //   },
    //   end_time: {
    //     date: txn.endTime !== null ? txn.endTime.toLocaleDateString() : "",
    //     time: txn.endTime !== null ? txn.endTime.toLocaleTimeString() : "",
    //   },
    //   receiver: txn.receiver.email,
    // }));

    // return mappedData;
  } catch (error) {
    throw error;
  }
};

// server action for getting the peers to whom the current logged in user has made the most amount of transfers.
// that means i have to fetch data based on the highest amount of total tranfers made till date.
export const getFrequentPeerTransfer = async (): Promise<PeerData[]> => {
  try {
    const user = await getUserOrThrow();
    const userId = user.id;

    const data = await prisma.peerTransfer.groupBy({
      by: ["receiverId"],
      where: {
        senderId: userId,
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
      take: 5,
    });

    const enriched = await Promise.all(
      data.map(async (item) => {
        const receiver = await prisma.user.findUnique({
          where: { id: item.receiverId },
          select: {
            email: true,
          },
        });

        return {
          receiver_id: item.receiverId,
          receiver_email: receiver?.email as string,
          totalAmount: (item._sum.amount || 0) / 100,
        };
      }),
    );

    return enriched;
  } catch (error) {
    throw error;
  }
};

// export type OnRampTxnData = {
//   id: string;
//   txn_id: string;
//   txn_status: string;
//   amount: number;
//   provider: string;
//   start_time: string;
//   end_time: string;
// };
// user's wallet and bank transaction data
// make sure you convert the balance back to decimal if any transfers are done in decimal
export const getBalanceTxnData = async (
  userId: string,
  take?: number,
): Promise<WalletData[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        OnRamping: {
          orderBy: {
            startTime: "desc",
          },
          take: take,
          select: {
            // well here we are directly treating id as the txnId rather being token the txnId. Since we know that the token is supposed to be the token that the bank server will pass us and on that basis we will open the modal for the selected bank and then while making payment we wil also send that token so that the bank can verify the token is valid and will proceed the payment with respect to that.
            id: true,
            token: true,
            status: true,
            amount: true,
            provider: true,
            startTime: true,
            endTime: true,
            txn_type: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("No data found!");
    }

    const mappedData: WalletData[] = user.OnRamping.map((txn) => ({
      id: txn.id,
      txn_id: txn.token,
      txn_status: txn.status,
      amount: txn.amount / 100,
      provider: txn.provider?.split("_")[0] as string,
      start_time: {
        date: txn.startTime.toLocaleDateString(),
        time: txn.startTime.toLocaleTimeString(),
      },
      end_time: {
        date: txn.endTime !== null ? txn.endTime.toLocaleDateString() : "",
        time: txn.endTime !== null ? txn.endTime.toLocaleTimeString() : "",
      },
      type: txn.txn_type as "added" | "withdraw",
    }));

    return mappedData;
  } catch (error) {
    throw error;
  }
};

// --------------------------------------- POST SERVER ACTIONS ------------------------------------------

type WalletProps = {
  amount: number;
  bankAcc: PROVIDER;
  txnType: "added" | "withdraw";
};
// endpoint that ensures of adding money to the users wallet balance from the respective bank account
export const initTransaction = async ({
  amount,
  bankAcc,
  txnType,
}: WalletProps) => {
  try {
    const user = await getUserOrThrow();
    const userId = user?.id;
    if (!bankAcc || !amount) {
      // return NextResponse.json({ msg: "Invalid Inputs" }, { status: 400 });
      return {
        success: false,
        token: null,
        msg: "Invalid Inputs!",
      };
    }
    const token = `TXN_${crypto.randomUUID()}`;

    const initPayment = await prisma.$transaction(async (txn) => {
      if (txnType === "withdraw") {
        const userWalletBalance = await txn.user.findFirst({
          where: {
            id: userId,
          },
          select: {
            Balance: {
              select: {
                balance: true,
              },
            },
          },
        });
        if ((userWalletBalance?.Balance?.balance as number) < amount) {
          return false;
        }
      }
      await txn.onRamping.create({
        data: {
          userId: userId,
          status: "Processing",
          provider: bankAcc,
          amount: amount * 100, // to avoid the decimal values being stored to the database.
          token: token,
          txn_type: txnType,
        },
      });
    });
    if (!initPayment) {
      return {
        success: false,
        token: null,
        msg: "",
      };
    }

    return {
      success: true,
      token: token,
      msg: "Transaction Successfull.",
    };
  } catch (error) {
    throw new Error();
  }
};

export const confirmTxnStatus = async ({
  token,
  amount,
}: {
  token: string;
  amount: number;
}) => {
  const userSession = await getUserOrThrow();
  const userId = userSession?.id;
  try {
    if (!amount || !token) {
      return {
        msg: "Payment Failed",
        success: false,
      };
    }
    await prisma.$transaction(async (txn) => {
      // updating user balance.
      await txn.balance.update({
        where: {
          userId: userId,
        },
        data: {
          balance: { increment: amount },
        },
      });
      await txn.onRamping.update({
        where: {
          userId: userId,
          token: token,
        },
        data: {
          status: "Success",
          endTime: new Date(),
        },
      });
      return true;
    });
    return {
      msg: "Payment Success.",
      success: true,
    };
  } catch (error) {
    await prisma.onRamping.update({
      where: {
        userId,
        token: token,
      },
      data: {
        status: "Failure",
        endTime: new Date(),
      },
    });

    return { msg: "Payment Failed", success: false };
  }
};

// for withdrawal we are currently just subtracting the amount from the wallet but ideally it should be deducted from the wallet and credited to the bank account
export const withdrawWalletAmt = async ({
  token,
  amount,
}: {
  token: string;
  amount: number;
}) => {
  const userSession = await getUserOrThrow();
  const userId = userSession?.id;
  try {
    if (!amount || !token) {
      return {
        msg: "Payment Failed",
        success: false,
      };
    }

    await prisma.$transaction(async (txn) => {
      // updating user balance.
      await txn.balance.update({
        where: {
          userId: userId,
        },
        data: {
          balance: { decrement: amount },
        },
      });
      await txn.onRamping.update({
        where: {
          userId: userId,
          token: token,
        },
        data: {
          status: "Success",
          endTime: new Date(),
        },
      });
      return true;
    });

    return {
      msg: "Payment Transfer Successful.",
      success: true,
    };
  } catch (error) {
    await prisma.onRamping.update({
      where: {
        userId,
        token: token,
      },
      data: {
        status: "Failure",
        endTime: new Date(),
      },
    });

    return { msg: "Payment Failed", success: false };
  }
};

// PEER TO PEER TXN's ACtion
export const peerTransfer = async ({
  amount,
  receiverId,
  // idempotency_key,
}: {
  amount: number;
  receiverId: string | null;
  // idempotency_key: string;
}) => {
  const userSession = await getUserOrThrow();
  const userId = userSession?.id;

  if (!amount || !receiverId) {
    return {
      msg: "Payment Failed",
      success: false,
      paymentInfo: null,
    };
  }
  try {
    const txn_id = `TXN_${crypto.randomUUID()}`;
    const result = await prisma.$transaction(async (txn) => {
      const initPeerTxn = await txn.peerTransfer.create({
        data: {
          status: "PENDING",
          amount: amount * 100,
          senderId: userId,
          receiverId: receiverId,
          txn_id: txn_id,
        },
        select: {
          id: true,
          txn_id: true,
        },
      });
      await txn.peerTransfer.update({
        where: {
          id: initPeerTxn.id,
          senderId: userId,
        },
        data: {
          txn_type: "sent",
        },
      });
      await txn.peerTransfer.update({
        where: {
          id: initPeerTxn.id,
          receiverId: receiverId,
        },
        data: {
          txn_type: "received",
        },
      });
      return {
        id: initPeerTxn.id,
        txn_id: initPeerTxn.txn_id,
      };
    });

    return {
      msg: "Payment Initiated Successfully",
      success: true,
      paymentInfo: {
        id: result.id,
        txn_id: result.txn_id,
      },
    }; // the result will be the payment id for the txn been created
  } catch (error) {
    return { msg: "Payment Failed", success: false, paymentInfo: null };
  }
};

// confirming the status of the payment once the request for peertransfer is success
export const confirmPeerTransfer = async ({
  paymentId,
  txn_id,
}: {
  paymentId: string | null;
  txn_id: string;
}) => {
  const userSession = await getUserOrThrow();
  const userId = userSession?.id;
  try {
    if (!paymentId) {
      return {
        msg: "Payment Credit Failed due to no id",
        success: false,
      };
    }
    await prisma.$transaction(async (txn) => {
      const txnAmount = await txn.peerTransfer.update({
        where: {
          id: paymentId,
          txn_id: txn_id,
        },
        data: {
          status: "SUCCESS",
          endTime: new Date(),
        },
        select: {
          amount: true,
          receiverId: true,
        },
      });
      // deducting that amount from the senders wallet
      await txn.balance.update({
        where: {
          userId: userId,
        },
        data: {
          balance: { decrement: txnAmount.amount },
        },
      });
      await txn.balance.update({
        where: {
          userId: txnAmount.receiverId,
        },
        data: {
          balance: { increment: txnAmount.amount },
        },
      });
    });
    return { msg: "Payment Credit Success ", success: true };
  } catch (error) {
    await prisma.peerTransfer.update({
      where: {
        id: paymentId as string,
        txn_id: txn_id,
      },
      data: {
        status: "FAILED",
      },
    });
    return { msg: "Payment Credit Failed during catch", success: false };
  }
};
