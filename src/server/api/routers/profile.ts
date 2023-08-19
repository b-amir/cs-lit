
// import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
// import { signIn, signOut, useSession, } from "next-auth/react";


import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { filterUserForClient, filterUsersForClient } from "@/server/helpers/filterUserForClient";
import { SessionContext, SessionProvider } from "next-auth/react";
import { Session } from "inspector";
import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";
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
      const limit = input.limit ?? 15;
      const { cursor } = input;
      const items = await ctx.prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          emailVerified: 'asc',
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

  getAllWithQuery: publicProcedure
    .input(z.object({
      query: z.string().max(64).nullish(),
      limit: z.number(),
      cursor: z.string().nullish(),
      order: z.enum(["asc", "desc"]).nullish()
    }))
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 15
      const { cursor } = input
      const order = input.order ?? "asc"
      const hasQuery = input.query ? true : false
      const allItems = await ctx.prisma.user.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          emailVerified: 'asc',
        }
      });
      const searchedItems = await ctx.prisma.user.findMany({
        take: limit + 1,
        where: {
          name: {
            contains: input.query,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          emailVerified: 'asc',
        }
      });
      const items = hasQuery ? searchedItems : allItems
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items,
        total: await ctx.prisma.user.count(),
        pageInfo: {
          count: items.length,
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
    .query(async () => {
      const users = await prisma.user.findMany({
        where: {
          analogies: {
            some: {
              status: "PUBLISHED"
            }
          }
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              analogies: {
                where: {
                  status: "PUBLISHED"
                }
              }
            }
          }
        },
        take: 3,
        orderBy: [
          // order by analogies count
          {
            analogies: {
              _count: 'desc',

            },
          },
        ],
      });
      return filterUsersForClient(users);
    }),



  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        username: z.string(),
        name: z.string(),
        email: z.string(),
        status: z.enum(["ACTIVE", "BANNED", "DELETED"]),
        role: z.enum(["ADMIN", "EDITOR", "USER"]),
      })
    )
    .mutation(async ({ ctx, input }) => {

      const user = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          username: input.username,
          status: input.status,
          email: input.email,
          role: input.role,
        },
      });
      return user;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {

      const user = await ctx.prisma.user.delete({
        where: { id: input.id },
      });

      return user;
    }),


});