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
    return user?.Balance?.balance;
  } catch (error) {
    return Error;
  }
}

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
