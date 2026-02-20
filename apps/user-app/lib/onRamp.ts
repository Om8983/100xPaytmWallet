import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../app/api/auth/[...nextauth]/route";
import { randomUUID } from "crypto";

// onramp means we are adding money to our own wallet from certain Provider(hdfc, axis etc)
// onramp will later on hit the bank webhook that we created which will confirm and make the entry to the onramp table if the payment was confirmed or not
// here we are just creating an onramp and the status of the payment remains "Processing".
export default async function onRamp({
  amount,
  provider,
}: {
  amount: number;
  provider: string;
}) {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session?.user || !session?.user?.id) {
      return NextResponse.json(
        { msg: "Unauthenticated User" },
        { status: 401 },
      );
    }
    // since there's no real bank server that will be giving us the token we are gnerating a random uuid as token
    const refId = randomUUID();
    // now across the current user from fetched from the session we will create an entry in the onramp table and make its status as pending.
    await prisma.onRamping.create({
      data: {
        amount: amount,
        provider: provider,
        userId: session.user.id,
        token: refId,
        startTime: new Date(),
        status: "Processing",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error!" },
      { status: 500 },
    );
  }
}
