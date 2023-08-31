import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
// import { clerkClient } from "@clerk/nextjs/server";
// import type { User } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { type Prisma } from "@prisma/client";


export const categoriesRouter = createTRPCRouter({
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const categories = await ctx.prisma.category.findMany({
  //     take: 50,
  //     orderBy: [{ createdAt: "asc" }],
  //   });
  //   return categories;
  // }),

  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        order: z.enum(["asc", "desc"]).nullish()
      })
    )
    .query(async ({ ctx, input }) => {

      const limit = input.limit ?? 15
      const { cursor } = input
      const order = input.order ?? "asc"

      const items = await ctx.prisma.category.findMany({
        take: limit + 1,
        where: { status: "PUBLISHED" },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items,
        total: await ctx.prisma.category.count(),
        pageInfo: {
          count: items.length,
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
      const allItems = await ctx.prisma.category.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      const searchedItems = await ctx.prisma.category.findMany({
        take: limit + 1,
        where: {
          name: {
            contains: input.query,
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
        items,
        total: await ctx.prisma.category.count(),
        pageInfo: {
          count: items.length,
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),




  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!category) throw new TRPCError({ code: "NOT_FOUND" });
      // return (await addUsersDataToAnalogies([analogy]))[0];
      return category;
    }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: {
          name: input.name,
        },
      });
      if (!category) throw new TRPCError({ code: "NOT_FOUND" });
      return category;
    }),


  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.findFirst({
        where: {
          slug: input.slug,
        },
      });
      if (!category) throw new TRPCError({ code: "NOT_FOUND" });
      return category;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3).max(32),
        id: z.string(),
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.create({
        data: {
          name: input.name,
          slug: input.slug,
        },
      });
      return category;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(3, "Category name must be < 2 characters!").max(32, "Category name must be < 32 characters!"),
        slug: z.string(),
        status: z.enum(["PENDING", "PUBLISHED", "REJECTED", "DELETED"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.prisma.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          slug: input.slug,
          status: input.status,
        },
      });
      return category;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // delete associated analogies first
      await ctx.prisma.analogy.deleteMany({
        where: { topic: { categoryId: input.id } },
      });

      // delete associated topics
      await ctx.prisma.topic.deleteMany({
        where: { categoryId: input.id },
      });

      const category = await ctx.prisma.category.delete({
        where: { id: input.id },
      });

      return category;
    }),


});
