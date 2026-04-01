"use server";
import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../api/auth/[...nextauth]/route";

export default async function getUserBalance() {
  const session = await getServerSession(AuthOptions);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
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
