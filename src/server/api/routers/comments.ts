import { z } from "zod";
import { prisma } from "@/server/db"
import { type Comment, type Prisma } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";


// --- append user data to comments --- //
export const commentsWithUserData = async (comments: Comment[]) => {
  const commentsWithUserData = await Promise.all(
    comments.map(async (comment) => {
      const user = await prisma.user.findUnique({
        where: { id: comment.commenterId },
      });
      return { ...comment, user };
    })
  );
  return commentsWithUserData;
};


export const commentsRouter = createTRPCRouter({

  // --- Get all comments, with search ability --- //
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
      const allItems = await ctx.prisma.comment.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      const searchedItems = await ctx.prisma.comment.findMany({
        take: limit + 1,
        where: {
          content: {
            contains: input.query || "",
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      const items = hasQuery ? searchedItems : allItems
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items: await commentsWithUserData(items),
        total: await ctx.prisma.comment.count(),
        pageInfo: {
          count: items.length,
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),


  // --- Get all comments for a specific analogy --- //
  // used in single analogy page & info row
  getByAnalogyId: publicProcedure
    .input(
      z.object({
        id: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
        order: z.enum(["asc", "desc"]).nullish()
      }))
    .query(async ({ ctx, input }) => {

      const limit = input.limit ?? 15
      const { cursor } = input
      const order = input.order ?? "asc"

      const items = await ctx.prisma.comment.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          analogyId: input.id,
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      const totalCommentsForAnalogy = await ctx.prisma.comment.count({
        where: {
          analogyId: input.id,
        },
      });
      return {
        items: await commentsWithUserData(items),
        total: totalCommentsForAnalogy,
        pageInfo: {
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),


  // --- create a comment --- //
  // used in a custom hook --> single analogy page
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(10, "Comment must be at least 10 characters").max(500, "your comment is too long!"),
        analogyId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const commenterId = ctx.session?.user.id;

      const comment = await ctx.prisma.comment.create({
        data: {
          commenterId,
          content: input.content,
          analogyId: input.analogyId,
        },
      });
      return comment;
    }),


  // --- edit a comment --- //
  // used in a custom hook --> admin panel
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
        status: z.enum(["PUBLISHED", "PENDING", "REJECTED", "DELETED"]),
        analogyId: z.string(),
        commenterId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.update({
        where: {
          id: input.id,
        },
        data: {
          content: input.content,
          status: input.status,
          commenterId: input.commenterId,
          analogyId: input.analogyId,
        },
      });
      return comment;
    }),


  // --- delete a comment --- //
  // used in a custom hook --> admin panel
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.delete({
        where: { id: input.id },
      });
      return comment;
    }),

});
