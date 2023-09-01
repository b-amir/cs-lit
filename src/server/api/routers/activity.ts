import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";


export const activityRouter = createTRPCRouter({


  // --- Get all activity logs --- //
  // used in admin panel
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const items = await ctx.prisma.activity.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          timestamp: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items,
        total: await ctx.prisma.activity.count(),
        pageInfo: {
          count: items.length,
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),


  // --- create an activity log --- //
  // used in every custom hook when a mutation happens
  create: protectedProcedure
    .input(
      z.object({
        entityType: z.enum(["category", "topic", "analogy", "comment", "user"]),
        entityId: z.string(),
        entityTitle: z.string(),
        action: z.enum(["created", "updated", "deleted"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { entityType, entityId, entityTitle, action } = input;
      const userId = ctx.session?.user.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create an activity",
        });
      }
      const activity = await ctx.prisma.activity.create({
        data: {
          entityType,
          entityId,
          entityTitle,
          action,
          userId,
        },
      });
      return activity;
    }
    ),

});
