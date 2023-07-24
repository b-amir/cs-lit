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
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
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

    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),

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
// function EmailProvider(arg0: { sendVerificationRequest?: (({ url }: { url: any; }) => void) | undefined; server: { host: string; port: string | number; auth: { user: string | undefined; pass: string; }; }; from: string; }): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

// function GithubProvider(arg0: { clientId: any; clientSecret: any; }): import("next-auth/providers").Provider {
//   throw new Error("Function not implemented.");
// }

