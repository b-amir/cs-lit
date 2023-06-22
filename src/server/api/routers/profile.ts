
// import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
// import { signIn, signOut, useSession, } from "next-auth/react";


import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { filterUserForClient } from "@/server/helpers/filterUserForClient";
import { SessionContext, SessionProvider } from "next-auth/react";
import { Session } from "inspector";
import { prisma } from "@/server/db";
// const { data: sessionData } = useSession();

export const UsersAnalogyCount = async (userId: string) => {
  const analogies = await prisma.analogy.findMany({
    where: {
      authorId: userId,
    },
  });
  return analogies.length;
}

export const profileRouter = createTRPCRouter({

  getUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {

      const user = ctx?.session?.user;
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }
      return user.id;
    }
    ),

  // gets profile for the currently logged in user
  getCurrentUsersProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {

      const user = ctx?.session?.user;
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }
      return filterUserForClient(user);
    }
    ),

  // gets profile for any user with the given id
  getProfileById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }
      return filterUserForClient(user);
    }
    ),


  getTopThree: publicProcedure
    // .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const users = await prisma.user.findMany({
        include: {
          _count: {
            select: {
              analogies: true
            }
          },
        },
        take: 3,
        orderBy: [
          // order by analogies count
          {
            analogies: {
              _count: "desc"
            }
          }
        ],
      });
      return users;
    }
    ),


});