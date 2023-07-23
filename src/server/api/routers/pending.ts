import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { topicsWithCategoryData } from "./topics";
import { analogiesWithUserAndTopicAndCategoryData } from "./analogies";


export const pendingRouter = createTRPCRouter({

  // get all topics, analogies and comments with the status of PENDING

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

      const topicsWithData = await topicsWithCategoryData(topics);
      const analogiesWithData = await analogiesWithUserAndTopicAndCategoryData(analogies);

      const items = [...topicsWithData, ...analogiesWithData];
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
