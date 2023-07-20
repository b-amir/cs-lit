import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClient, type Topic } from "@prisma/client";


export const activityRouter = createTRPCRouter({

  // get all the activity logs from activity table

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
          timestamp: 'asc',
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




  // a create procedure that fires off when a mutation is made. it's gonna get called on onSuccess of other stuff.
  // here's my prisma schema for the activity table:
  //   model Activity {
  //     id        String   @id @default(cuid())
  //     user      User     @relation(fields: [userId], references: [id])
  //     userId    String
  //     entity    String // e.g. "Topic", "Analogy"
  //     entityId  String
  //     action    String // e.g. "created", "updated", "deleted"
  //     timestamp DateTime @default(now())

  //     @@index([userId])
  // }
  create: protectedProcedure
    .input(
      z.object({
        entityType: z.enum(["category", "topic", "analogy", "comment"]),
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
