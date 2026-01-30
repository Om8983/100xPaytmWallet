// the below is how we would do traditionally using next middleware

// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   // const sessionwhsession", session);
//   return NextResponse.redirect(new URL("auth/signin", request.url));
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    const token = req.nextauth.token;

    // here i should prolly create an api which will hit the backend server and checks whether its the latest token that it has stored across that user. this maintains single login functionality.
    // since token is unique we will create an api that would be responsible for fetching that token and then searching that token within the db. If it exist then have no objection. But if it doesn't exist then throw the user out.
    if (!token?.jwtToken) {
      return NextResponse.redirect(new URL("/invalidLogin", req.url));
    }
    const res = await fetch(
      `http://localhost:3000/api/user?token=${token?.jwtToken}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return NextResponse.redirect(new URL("/invalidLogin", req.url));
    }
    const { user } = await res.json();
    if (!user) {
      return NextResponse.redirect(new URL("/invalidLogin", req.url));
    }
    return NextResponse.next();
    // just like we have seen how cms repo has redirected users to invalidasession page if 2 user are logged in at the same time, this cna be done here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher:
    "/((?!api|auth|_next/static|invalidLogin|_next/image|favicon.ico).*)",
};
