import { getServerSession } from "next-auth";
import { AuthOptions } from "../../app/api/auth/[...nextauth]/route";

export async function getUserOrThrow() {
  const session = await getServerSession(AuthOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user;
}
