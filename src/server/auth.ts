import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google"

import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type USER_ROLE } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: USER_ROLE; // Update to use the USER_ROLE enum
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: USER_ROLE;
  }
}


// // Create a type for the token
// type AuthToken = {
//   role?: USER_ROLE;
//   // Add other relevant fields as needed
// };

// // Modify the session type to include the user role
// type AuthSession = {
//   user: {
//     role: USER_ROLE;
//     // Add other user fields as needed
//   };
// };




/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),

    // jwt: async ({ token, user, account, profile, isNewUser }: { user: User, token: AuthToken }) => {
    //   if (user) {
    //     token.role = user.role; // Map Prisma's USER_ROLE to token's role
    //   }
    //   return token;
    // },
    // session(session: AuthSession, token: AuthToken) {
    //   session.user.role = token?.role || USER_ROLE.USER; // Set default role if not present
    //   return session;
    // },


  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    // signOut: '/auth/logout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER || 'http://localhost:3000',
        port: process.env.EMAIL_PORT || 587,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD || '',
        },
      },
      from: process.env.EMAIL_FROM || 'default@mail.com',

      // only enable in development - debugs email sending
      ...(process.env.NODE_ENV !== 'production' ? {
        sendVerificationRequest({ url }) {
          console.log("Login Link", url)
        },
      } : {}),
    }),

  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */


export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

// export const getServerAuthSession = async (ctx: {
//   req: GetServerSidePropsContext["req"];
//   res: GetServerSidePropsContext["res"];
// }) => {
//   // In test environment, we don't want to use the real next-auth session
//   // because we are not going through the login flow.
//   // Instead, we use the session provided by the header.
//   if (process.env.APP_ENV === "test" && ctx.req.headers.session) {
//     return JSON.parse(ctx.req.headers.session as string) as Session;
//   }
//   return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
// };

// function EmailProvider(arg0: { sendVerificationRequest?: (({ url }: { url: any; }) => void) | undefined; server: { host: string; port: string | number; auth: { user: string | undefined; pass: string; }; }; from: string; }): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

// function GithubProvider(arg0: { clientId: any; clientSecret: any; }): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

