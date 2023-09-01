import { z } from "zod";
import { commentsWithUserData } from "./comments";
import { topicsWithCategoryData } from "./topics";
import { analogiesWithUserـ& ـTopicـ & ـCategoryData } from "./analogies";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";


export const pendingRouter = createTRPCRouter({

  // --- get all topics, analogies and comments with the status of PENDING --- //
  // used in admin panel
  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      const categories = await ctx.prisma.category.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          status: 'PENDING'
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const topics = await ctx.prisma.topic.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          status: 'PENDING'
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const analogies = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          status: 'PENDING'
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      const comments = await ctx.prisma.comment.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          status: 'PENDING'
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const topicsWithData = await topicsWithCategoryData(topics);
      const analogiesWithData = await analogiesWithUserـ & ـTopicـ & ـCategoryData(analogies);
      const commentsWithData = await commentsWithUserData(comments)

      const items = [...categories, ...topicsWithData, ...analogiesWithData, ...commentsWithData];
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items,
        total: await ctx.prisma.topic.count(),
        pageInfo: {
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),

});
