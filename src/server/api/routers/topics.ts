import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Prisma, PrismaClient, type Topic } from "@prisma/client";
import { Session } from 'inspector';



export const topicsWithCategoryData = async (topics: Topic[]) => {
  const prisma = new PrismaClient();
  const topicsWithCategoryData = await Promise.all(
    topics.map(async (topic) => {
      const category = await prisma.category.findUnique({
        where: { id: topic.categoryId },
      });
      return { ...topic, category };
    })
  );
  return topicsWithCategoryData;
}


export async function getUserNameById(id: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user?.name ? user?.name : user?.email
}


export const topicsRouter = createTRPCRouter({
  // getAll: publicProcedure.query(async ({ ctx }) => {
  //   const topics = await ctx.prisma.topic.findMany({
  //     take: 100,
  //     orderBy: [{ createdAt: "desc" }],
  //   });
  //   return topics;
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

      const items = await ctx.prisma.topic.findMany({
        take: limit + 1,
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
        total: await ctx.prisma.topic.count(),
        pageInfo: {
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),

  getByCategoryId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const topics = await ctx.prisma.topic.findMany({
        where: {
          categoryId: input.id,
        },
        take: 10,
        orderBy: [{ createdAt: "desc" }],
      });
      return topics;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!topic) throw new TRPCError({ code: "NOT_FOUND" });
      // return (await addUsersDataToAnalogies([analogy]))[0];
      return topic;
    }),

  getByName: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findFirst({
        where: {
          title: input.title,
        },
      });
      if (!topic) throw new TRPCError({ code: "NOT_FOUND" });
      return topic;
    }),

  searchByName: publicProcedure
    .input(z.object({ query: z.string().min(2).max(64) }))
    .query(async ({ ctx, input }) => {
      const topics = await ctx.prisma.topic.findMany({
        where: {
          title: {
            contains: input.query,
          },
        },
        take: 5,
        orderBy: [{ createdAt: "desc" }],
      });
      return topicsWithCategoryData(topics);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findFirst({
        where: {
          slug: input.slug,
        },
      });
      if (!topic) throw new TRPCError({ code: "NOT_FOUND" });
      return topic;
    }),


  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(2).max(100),
        slug: z.string(),
        id: z.string(),
        category: z.object({
          id: z.string(),
        }),
        url: z.string().url(),
        starter: z.object({
          id: z.string(),
        }),
        analogies: z.array(z.object({
          id: z.string(),
          description: z.string(),
        })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.create({
        data: {
          title: input.title,
          slug: input.slug,
          category: {
            connect: { id: input.category.id }, // Connect to an existing category using its ID
          },
          url: input.url,
          starter: {
            connect: { id: input.starter.id }, // Connect to an existing user using its ID
          },
          analogies: {
            // create first analogy and append to topic analogies array
            create: {
              // title: input.analogies[0]?.title || "",
              title: `${input.title} by ${await getUserNameById(input.starter.id)}`,
              description: input.analogies[0]?.description || "",
              author: {
                connect: { id: input.starter.id }, // Connect to an existing user using its ID
              },
            },
          },
        },
      });
      return topic;

      // throw trpc error

    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(2).max(100),
        slug: z.string(),
        // category: z.object({
        //   id: z.string(),
        // }),
        url: z.string().url(),
        // starter: z.object({
        //   id: z.string(),
        // }),
        status: z.enum(["PUBLISHED", "PENDING", "REJECTED", "DELETED"]),
        // analogies: z.array(z.object({
        //   id: z.string(),
        //   description: z.string(),
        // })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          slug: input.slug,
          // category: {
          //   connect: { id: input.category.id }, // Connect to an existing category using its ID
          // },
          url: input.url,
          // starter: {
          //   connect: { id: input.starter.id }, // Connect to an existing user using its ID
          // },
          status: input.status,
          // analogies: {
          //   // create first analogy and append to topic analogies array
          //   create: {
          //     description: input.analogies[0]?.description || "",
          //     author: {
          //       connect: { id: input.starter.id }, // Connect to an existing user using its ID
          //     },
          //   },
          // },
        },
      });
      return topic;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.analogy.deleteMany({
        where: { topicId: input.id },
      });

      // add an activity log entry
      // await ctx.prisma.activity.create({
      //   data: {
      //     action: "DELETE_TOPIC",
      //     entity: {
      //       connect: { entityId: input.id },
      //     },
      //     user: {
      //       connect: { userId: Session.user.id },
      //     },
      //   },
      // });

      const topic = await ctx.prisma.topic.delete({
        where: { id: input.id },
      });


      return topic;
    }),





});
