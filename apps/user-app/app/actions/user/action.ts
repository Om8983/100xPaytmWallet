"use server";
import { prisma } from "@repo/db";
import { getUserOrThrow } from "../../../lib/auth/utils";

export default async function getUserBalance() {
  const userSession = await getUserOrThrow();
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userSession?.id,
      },
      select: {
        Balance: {
          select: {
            balance: true,
          },
        },
      },
    });
    return (user?.Balance?.balance as number) / 100;
  } catch (error) {
    return Error;
  }
}

// type MoneySpent = {
//   txn_type: "received";
//   _sum: {
//     amount: number | null;
//   };
//   success: boolean;
//   msg: string;
// };
// export const getMoneySpent = async (): Promise<MoneySpent> => {
//   const userSession = await getUserOrThrow();
//   const userId = userSession.id;
//   try {
//     const spentMoney = await prisma.peerTransfer.groupBy({
//       by: ["txn_type"],
//       where: {
//         receiverId: userId,
//         status: "SUCCESS",
//       },
//       _sum: {
//         amount: true,
//       },
//     });
//     return {
//       txn_type: "received",
//       _sum: {
//         amount: ((spentMoney[0]?._sum.amount as number) / 100) as number | null,
//       },
//       msg: "Fetched Successfully",
//       success: true,
//     };
//   } catch (error) {
//     return {
//       txn_type: "received",
//       _sum: {
//         amount: 0,
//       },
//       msg: "failed To Fetch",
//       success: false,
//     };
//   }
// };

// the above code for money received fetched using the 'groupBy' query is purposely kept commented in order to understand the diff between 'AGGREGATE' and "GROUPBY"
export type MoneySpentReceive = {
  msg: string;
  amount: number;
  success: boolean;
};
export const getMoneyReceived = async (): Promise<MoneySpentReceive> => {
  const userSession = await getUserOrThrow();
  const userId = userSession.id;
  try {
    const totalMoneyReceived = await prisma.peerTransfer.aggregate({
      where: {
        receiverId: userId,
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
    });

    const amount = (totalMoneyReceived._sum.amount as number) / 100;
    return {
      msg: "Fetched Successfully",
      amount: amount as number,
      success: true,
    };
  } catch (error) {
    return {
      amount: 0,
      msg: "Failed fo fetch",
      success: false,
    };
  }
};

export const getMoneySpent = async (): Promise<MoneySpentReceive> => {
  const userSession = await getUserOrThrow();
  const userId = userSession.id;
  try {
    const totalMoneySpent = await prisma.peerTransfer.aggregate({
      where: {
        senderId: userId,
        status: "SUCCESS",
      },
      _sum: {
        amount: true,
      },
    });
    const amount = (totalMoneySpent._sum.amount as number) / 100;
    return {
      msg: "Fetched Successfully",
      amount: amount as number,
      success: true,
    };
  } catch (error) {
    return {
      amount: 0,
      msg: "Failed fo fetch",
      success: false,
    };
  }
};

export const getUserPhone = async (phoneSearchInput: string) => {
  const userSession = await getUserOrThrow();
  if (!phoneSearchInput) return { msg: "failed", user: [] };

  try {
    const user = await prisma.user.findMany({
      where: {
        phoneNumber: {
          startsWith: phoneSearchInput,
          mode: "insensitive",
        },
        NOT: {
          id: userSession.id,
        },
      },
      select: {
        phoneNumber: true,
        email: true,
        id: true,
      },
    });
    return { msg: "success", user };
  } catch (e) {
    return { msg: "Internal server error", user: [] };
  }
};
