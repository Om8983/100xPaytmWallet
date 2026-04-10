"use server";

import { prisma } from "@repo/db";
import { getUserOrThrow } from "../../../lib/auth/utils";
import { PROVIDER } from "../../../../../packages/db/generated/prisma";
import {
  P2PData,
  WalletData,
} from "../../../components/BalanceComp/TransactionTable";

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
export const getP2PtxnData = async (userId: string): Promise<P2PData[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        token: true,
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

    const mappedData: P2PData[] = user.Sender.map((txn) => ({
      txn_id: user.token,
      sender: user.email,
      amount: txn.amount / 100,
      txn_status: txn.status,
      start_time: {
        date: txn.startTime.toLocaleDateString(),
        time: txn.startTime.toLocaleTimeString(),
      },
      end_time: {
        date: txn.endTime !== null ? txn.endTime.toLocaleDateString() : "",
        time: txn.endTime !== null ? txn.endTime.toLocaleTimeString() : "",
      },
      receiver: txn.receiver.email,
    }));

    return mappedData;
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
): Promise<WalletData[]> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        OnRamping: {
          select: {
            // well here we are directly treating id as the txnId rather being token the txnId. Since we know that the token is supposed to be the token that the bank server will pass us and on that basis we will open the modal for the selected bank and then while making payment we wil also send that token so that the bank can verify the token is valid and will proceed the payment with respect to that.
            id: true,
            token: true,
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
    }));

    return mappedData;
  } catch (error) {
    throw error;
  }
};

type WalletProps = {
  amount: number;
  bankAcc: PROVIDER;
};
// endpoint that ensures of adding money to the users wallet balance from the respective bank account
export const initTransaction = async ({ amount, bankAcc }: WalletProps) => {
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
    const result = await prisma.$transaction(async (txn) => {
      const createPayment = await txn.onRamping.create({
        data: {
          userId: userId,
          status: "Processing",
          provider: bankAcc,
          amount: amount * 100, // to avoid the decimal values being stored to the database.
          token: token,
        },
      });
      if (!createPayment) {
        return false;
      }
      return true;
    });
    if (!result) {
      return {
        success: false,
        token: null,
        msg: "Internal Server Error. Unable to create payment.",
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
      const updateBalance = await txn.balance.update({
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
