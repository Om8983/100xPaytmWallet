import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

// route for checking if the token assigned to the user is valid or not via the middleware.ts.

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Getting search params from the URL
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");

    const user = await prisma.user.findFirst({
      where: {
        token: token as string,
      },
    });
    // //   if no such user exist across the token fetch via params then redirect to the invalidlogin page else
    if (!user) {
      return NextResponse.json(
        { user: null },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
