import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClient, type Topic } from "@prisma/client";





async function getPendingItems() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const pendingItems = await prismaClient.$queryRaw(`
  SELECT * FROM (
    SELECT id, title, content, status, created_at, updated_at, 'topic' AS type
    FROM topics
    WHERE status = 'PENDING'

    UNION

    SELECT id, title, content, status, created_at, updated_at, 'analogy' AS type
    FROM analogies
    WHERE status = 'PENDING'

    UNION

    SELECT id, content, status, created_at, updated_at, 'comment' AS type
    FROM comments
    WHERE status = 'PENDING'
  ) AS pending_items
  ORDER BY created_at DESC;
`);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return pendingItems;
}


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
      const limit = input.limit ?? 5;
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

      const items = [...topics, ...analogies];
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
