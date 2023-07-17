
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

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          myCursor: 'asc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items,
        total: await ctx.prisma.user.count(),
        pageInfo: {
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),

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