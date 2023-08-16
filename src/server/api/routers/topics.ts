import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type Prisma, PrismaClient, type Topic } from "@prisma/client";
import { prisma } from "@/server/db"


// const prisma = new PrismaClient();


export const topicsWithCategoryData = async (topics: Topic[]) => {
  // const prisma = new PrismaClient();
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

export const getCategoryNameById = async (id: string) => {
  // const prisma = new PrismaClient();
  const category = await prisma.category.findUnique({
    where: { id: id },
  });
  return category?.name
}

export async function getUserNameById(id: string) {
  // const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user?.name ? user?.name : user?.email
}

export async function getTopicNameById(id: string) {
  // const prisma = new PrismaClient();
  const topic = await prisma.topic.findUnique({
    where: { id: id },
  });
  return topic?.title
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
        items: await topicsWithCategoryData(items),
        total: await ctx.prisma.topic.count(),
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
      const allItems = await ctx.prisma.topic.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      const searchedItems = await ctx.prisma.topic.findMany({
        take: limit + 1,
        where: {
          title: {
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
        items: await topicsWithCategoryData(items),
        total: await ctx.prisma.topic.count(),
        pageInfo: {
          count: items.length,
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),

  getByCategoryId: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string().nullish(),
        limit: z.number(),
        cursor: z.string().nullish(),
        order: z.enum(["asc", "desc"]).nullish()
      }))
    .query(async ({ ctx, input }) => {

      const limit = input.limit ?? 15
      const { cursor } = input
      const order = input.order ?? "asc"
      const totalPublished = await ctx.prisma.topic.count({
        where: {
          categoryId: input.id,
          status: "PUBLISHED"
        }
      });

      const publishedItems = await ctx.prisma.topic.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          categoryId: input.id,
          status: "PUBLISHED"
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      })

      const allItems = await ctx.prisma.topic.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          categoryId: input.id,
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });

      const publishedItems_plus_ViewersUnpublishedItems = await ctx.prisma.topic.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          OR: [
            {
              categoryId: input.id,
              starterId: input.viewerId,
              status: {
                not: "PUBLISHED"
              }
            },
            {
              categoryId: input.id,
              status: "PUBLISHED"
            }
          ]
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });

      let items;
      const isAdmin = ctx.session?.user.role === "ADMIN";
      if (input.viewerId && publishedItems_plus_ViewersUnpublishedItems.length > 0) {
        items = publishedItems_plus_ViewersUnpublishedItems
      }
      if (isAdmin) {
        items = allItems;
      }
      if (!input.viewerId) { items = publishedItems }

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }

      return {
        items,
        total: totalPublished,
        pageInfo: {
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
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
    .input(z.object({ query: z.string().max(64).nullish() }))
    .query(async ({ ctx, input }) => {
      const topics = await ctx.prisma.topic.findMany({
        where: {
          title: {
            contains: input.query,
          },
          status: "PUBLISHED"
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
        title: z.string().min(2, "Title is too short!").max(32, "Title is too long!"),
        slug: z.string(),
        id: z.string(),
        category: z.object({
          id: z.string(),
        }),
        url: z.string().url("Please provide a valid URL to docs"),
        starter: z.object({
          id: z.string(),
        }),
        analogies: z.array(z.object({
          id: z.string(),
          description: z.string().min(120, "Analogy must be at least 120 characters").max(63206, "your analogy is too long!"),
          reference: z.string().url("Please provide a valid URL").nullish(),
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
              reference: input.analogies[0]?.reference || "",
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

  delete: adminProcedure
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
