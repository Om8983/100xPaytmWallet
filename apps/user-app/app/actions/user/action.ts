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
