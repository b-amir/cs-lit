
import { z } from "zod";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { filterUserForClient, filterUsersForClient } from "@/server/helpers/filterUserForClient";
import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";



export const profileRouter = createTRPCRouter({


  // --- Get all users, with search ability --- //
  // used in admin panel
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
            contains: input.query || "",
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



  // --- get profile for user with the given id ---//
  // used in breadcrumbs, activity logs, profile page
  getProfileById: publicProcedure
    .input(z.object({ id: z.string().nullish() }))
    .query(async ({ ctx, input }) => {
      const user = await prisma.user.findUnique({
        where: {
          id: input.id || "",
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }
      // @ts-ignore
      return filterUserForClient(user);
    }
    ),


  // --- get top 3 contributors with most published analogies --- //
  // used in sidebar-right widget
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
      // @ts-ignore
      return filterUsersForClient(users);
    }),


  // --- edit a user --- //
  // used in a custom hook --> admin panel
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


  // --- delete a user --- //
  // used in a custom hook --> admin panel
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.delete({
        where: { id: input.id },
      });
      return user;
    }),


});