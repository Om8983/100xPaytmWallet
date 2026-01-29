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

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("token", req.nextauth.token);
    const token = req.nextauth.token;
    // here i should prolly create an api which will hit the backend server and checks whether its the latest token that it has stored across that user. this maintains single login functionality.
    // just like we have seen how cms repo has redirected users to invalidasession page if 2 user are logged in at the same time, this cna be done here
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: "/((?!api|auth|_next/static|_next/image|favicon.ico).*)",
};
