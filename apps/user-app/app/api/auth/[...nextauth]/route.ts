import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "email", placeholder: "Enter Email", type: "email" },
        password: {
          label: "password",
          placeholder: "*******",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
            },
          });
          if (!existingUser) {
            // here i should send an email verification link and prompt the user to follow that link in order to check if email is valid
            // generating salt rounds and hashing new user password
            const saltRounds = await bcrypt.genSalt(10);
            const newHashedPass = await bcrypt.hash(
              credentials.password,
              saltRounds,
            );
            // storing new user to db
            const newUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: newHashedPass,
                Balance: {
                  create: {},
                },
              },
              select: {
                id: true,
                email: true,
              },
            });
            return {
              id: newUser.id,
              email: newUser.email,
            };
          }
          // if user exist check the password with respect to the hashed password stored in the database
          const dbHashedPass = existingUser.password;
          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            dbHashedPass ?? "",
          );
          // if password is !correct return null else allow the user to login
          if (!isPassCorrect) {
            return null;
          }
          return {
            id: existingUser.id,
            email: existingUser.email,
          } as any;
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.id = token.sub;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

const handler = NextAuth(AuthOptions);
export const GET = handler;
export const POST = handler;
