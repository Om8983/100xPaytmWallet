import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { importJWK, SignJWT } from "jose";
import { randomUUID } from "crypto";

// now we have to make additional changes in order to ensure that only one user is being signed in per tab
// 1. create generateJWT function which will ensure creating jwt token of our choice of fields
// 2. also return token so that i can extract it in the middleware and check whether its the latest one across the database via an api call

type userTokenDetails = {
  email: string;
};
const generateJWT = async (user: userTokenDetails) => {
  if (!user) return null;
  const secret = process.env.JWT_SECRET || "secret";

  const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

  const jwt = await new SignJWT({
    ...user,
    iat: Math.floor(Date.now() / 1000),
    jti: randomUUID(), // Adding a unique jti to ensure each token is unique. This helps generate a unique jwtToken on every login
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("365d")
    .sign(jwk);
  return jwt;
};

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
            try {
              const token = await generateJWT({ email: credentials.email });
              // storing new user to db
              const newUser = await prisma.user.create({
                data: {
                  email: credentials.email as string,
                  password: newHashedPass,
                  token: token as string,
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
                token: token,
              };
            } catch (error) {
              console.log(error);
              return null;
            }
          }
          // if user exist check the password with respect to the hashed password stored in the database
          const dbHashedPass = existingUser?.password;
          const isPassCorrect = await bcrypt.compare(
            credentials.password,
            dbHashedPass ?? "",
          );
          // if password is !correct return null else allow the user to login
          if (!isPassCorrect) {
            return null;
          }
          try {
            const token: string = (await generateJWT({
              email: existingUser.email,
            })) as string;

            await prisma.user.update({
              where: {
                id: existingUser.id,
              },
              data: {
                token: token,
              },
            });

            return {
              id: existingUser.id,
              email: existingUser.email,
              token: token,
            } as any;
          } catch (error) {
            console.log(error);
            return null;
          }
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, profile }: any) {
      // we have used a condition here becuase the "user" object is only present on the first login
      if (user) {
        token.id = token.sub;
        token.jwtToken = user?.token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      // the above jwt signed token is then passed down to the session where we extract the jwt token and assign to the client side session
      session.user.id = token.sub;
      session.user.jwtToken = token.jwtToken;
      return session;
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
