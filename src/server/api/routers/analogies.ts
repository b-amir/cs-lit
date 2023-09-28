import { z } from "zod";
import { prisma } from "@/server/db"
import { TRPCError } from "@trpc/server";
import { getTopicNameById, getUserNameById } from "./topics";
import { type Analogy as AnalogyType, type Prisma } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "@/server/api/trpc";



// --- append user data to analogies --- //
export const analogiesWithUserData = async (analogies: AnalogyType[]) => {
  const analogiesWithUserData = await Promise.all(
    analogies.map(async (analogy) => {
      const user = await prisma.user.findUnique({
        where: { id: analogy.authorId },
      });
      return { ...analogy, user };
    })
  );
  return analogiesWithUserData;
};

// --- append user & topic & category data to analogies --- //
export const analogiesWithUserـTopicـCategoryData = async (analogies: AnalogyType[]) => {
  const analogiesWithUserـTopicـCategoryData = await Promise.all(

    analogies && analogies.map(async (analogy) => {
      const user = await prisma.user.findUnique({
        where: { id: analogy.authorId },
      });
      const topic = await prisma.topic.findUnique({
        where: { id: analogy.topicId },
      });
      const category = topic ? await prisma.category.findUnique({
        where: { id: topic.categoryId },
      }) : null;
      return { ...analogy, user, topic, category };
    })
  );
  return analogiesWithUserـTopicـCategoryData;
};

// --- append user & topic & category data to a single analogy --- //
export const singleAnalogyWithUserـTopicـCategoryData = async (analogy: AnalogyType) => {
  const user = await prisma?.user.findUnique({
    where: { id: analogy.authorId },
  });
  const topic = await prisma?.topic.findUnique({
    where: { id: analogy.topicId },
  });
  const category = topic ? await prisma.category.findUnique({
    where: { id: topic.categoryId },
  }) : null;
  const singleAnalogyWithUserـTopicـCategoryData = { ...analogy, user, topic, category }
  return singleAnalogyWithUserـTopicـCategoryData;
}



export const analogiesRouter = createTRPCRouter({

  // --- get all published analogies --- //
  // used in sidebar-right recent analogies
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
      const items = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        where: {
          status: "PUBLISHED"
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items?.length && items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items: await analogiesWithUserـTopicـCategoryData(items),
        total: await ctx.prisma.analogy.count(),
        pageInfo: {
          hasNextPage: items.length && items.length > limit,
          nextCursor,
        },
      };
    }),


  // --- Get all analogies, with search ability --- //
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
      const allItems = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      const searchedItems = await ctx.prisma.analogy.findMany({
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
        items: await analogiesWithUserـTopicـCategoryData(items),
        total: await ctx.prisma.analogy.count(),
        pageInfo: {
          count: items.length,
          hasNextPage: items.length > limit,
          nextCursor,
        },
      };
    }),

  // --- get single analogy for given id --- //
  // used in analogy component & landing pages's example section
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const analogy = await ctx.prisma.analogy.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!analogy) throw new TRPCError({ code: "NOT_FOUND" });
      return singleAnalogyWithUserـTopicـCategoryData(analogy);
    }),


  // --- get all analogies for given user id --- //
  // used in profile page
  getAnalogiesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number(),
        cursor: z.string().nullish(),
        order: z.enum(["asc", "desc"]).nullish()
      }))
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 15
      const { cursor } = input
      const order = input.order ?? "asc"
      const totalPublished = await ctx.prisma.analogy.count({
        where: {
          authorId: input.userId,
          status: "PUBLISHED"
        }
      });

      const publishedItems = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          authorId: input.userId,
          status: "PUBLISHED"
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      }).then(analogiesWithUserData);

      const allItems = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          authorId: input.userId,
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      }).then(analogiesWithUserData);

      let items = publishedItems;
      const isModerator = ["ADMIN", "EDITOR"].includes(ctx?.session?.user.role);
      const itemsCurrentUserStarted = allItems?.filter(item => item.authorId === ctx.session?.user.id);
      const hasAccessToUnpublished = isModerator || itemsCurrentUserStarted.length
      if (hasAccessToUnpublished) {
        items = allItems;
      }
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

  // --- get single analogy for given id, hide unpublished for non-moderators --- //
  // used in single analogy page & breadcrumbs
  getSingleAnalogyById: publicProcedure
    .input(
      z.object({
        id: z.string().nullish(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.analogy
        .findUnique({
          where: {
            id: input.id,
            OR: [
              {
                status: ["ADMIN", "EDITOR"].includes(ctx?.session?.user.role) ? { not: "DELETED" } : "PUBLISHED",
              },
              {
                status: { not: "DELETED" },
                authorId: ctx?.session?.user?.id,
              },
            ],
          },
        })
        .then((analogy) => {
          if (!analogy) throw new TRPCError({ code: "NOT_FOUND" });
          return singleAnalogyWithUserـTopicـCategoryData(analogy);
        })
    ),


  // --- get all analogies for a certain topic
  // used in topic page
  getByTopicId: publicProcedure
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
      const totalPublished = await ctx.prisma.analogy.count({
        where: {
          topicId: input.id,
          status: "PUBLISHED"
        }
      });

      const publishedItems = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          topicId: input.id,
          status: "PUBLISHED"
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      })

      const allItems = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          topicId: input.id,
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });

      const publishedItems_plus_ViewersUnpublishedItems = await ctx.prisma.analogy.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          OR: [
            {
              topicId: input.id,
              authorId: input.viewerId,
              status: {
                not: "PUBLISHED"
              }
            },
            {
              topicId: input.id,
              status: "PUBLISHED"
            }
          ]
        },
        orderBy: {
          createdAt: order as Prisma.SortOrder
        }
      });
      let items;
      const isModerator = ["ADMIN", "EDITOR"].includes(ctx?.session?.user.role);
      if (!input.viewerId) { items = publishedItems }
      if (input.viewerId && publishedItems_plus_ViewersUnpublishedItems && publishedItems_plus_ViewersUnpublishedItems.length > 0) {
        items = publishedItems_plus_ViewersUnpublishedItems
      }
      if (isModerator) {
        items = allItems;
      }
      let nextCursor: typeof cursor | undefined = undefined;
      if (items && items.length > limit) {
        const nextItem = items?.pop();
        nextCursor = nextItem?.id as typeof cursor;
      }
      return {
        items,
        total: totalPublished,
        pageInfo: {
          hasNextPage: items?.length > limit,
          nextCursor,
        },
      };
    }),



  // --- create an analogy --- //
  // used in a custom hook --> topic page & category page (first analogy of a topic)
  create: protectedProcedure
    .input(
      z.object({
        // title: z.string(),
        // id: z.string(),
        description: z.string().min(120, "Analogy must be at least 120 characters").max(63206, "your analogy is too long!"),
        topicId: z.string(),
        reference: z.string().url("Please provide a valid URL").nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session?.user.id;
      const analogy = await ctx.prisma.analogy.create({
        data: {
          title: `${await getTopicNameById(input.topicId)} by ${await getUserNameById(authorId)}`,
          authorId,
          description: input.description,
          reference: input.reference ?? null,
          topicId: input.topicId,
        },
      });
      return analogy;
    }),


  // --- edit an analogy --- //
  // used in a custom hook --> analogy editor & admin panel
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        reference: z.string(),
        status: z.enum(["PUBLISHED", "PENDING", "REJECTED", "DELETED"]),
        // pinned: z.boolean(),
        topicId: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const analogy = await ctx.prisma.analogy.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
          // pinned: input.pinned,
          authorId: input.authorId,
          topicId: input.topicId,
          reference: input.reference,
        },
      });
      return analogy;
    }),


  // --- delete an analogy --- //
  // used in a custom hook --> analogy editor & admin panel
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const analogy = await ctx.prisma.analogy.delete({
        where: { id: input.id },
      });
      return analogy;
    }),


  // --- get votes for a single analogy --- //
  // used in analogy component
  getAnalogyVotes: publicProcedure
    .input(
      z.object({
        analogyId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const analogyLikes = await ctx.prisma.like.findMany({
        where: {
          analogyId: input.analogyId,
        },
      });
      const analogyDislikes = await ctx.prisma.dislike.findMany({
        where: {
          analogyId: input.analogyId,
        },
      });
      const analogyVotes = {
        likes: analogyLikes.length,
        dislikes: analogyDislikes.length,
      }
      return analogyVotes;
    }
    ),


  // --- casting votes for a single analogy --- //
  // used in analogy component
  voting: protectedProcedure
    .input(
      z.object({
        analogyId: z.string(),
        vote: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const voterId = ctx.session?.user.id;
      const analogyId = input.analogyId;
      const vote = input.vote;
      if (vote === "like") {
        await ctx.prisma.dislike.deleteMany({
          where: {
            voterId,
            analogyId,
          },
        });
        await ctx.prisma.like.create({
          data: {
            voterId,
            analogyId,
          },
        });
      } else if (vote === "dislike") {
        await ctx.prisma.like.deleteMany({
          where: {
            voterId,
            analogyId,
          },
        });
        await ctx.prisma.dislike.create({
          data: {
            voterId,
            analogyId,
          },
        });
      } else if (vote === "retract") {
        await ctx.prisma.like.deleteMany({
          where: {
            voterId,
            analogyId,
          },
        });
        await ctx.prisma.dislike.deleteMany({
          where: {
            voterId,
            analogyId,
          },
        });

      } else {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      return "success";
    }
    ),


  // --- get current user's votes for a single analogy --- //
  // used in analogy component
  whatDidCurrentUserVote: protectedProcedure
    .input(
      z.object({
        analogyId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const voterId = ctx.session?.user.id;
      const analogyId = input.analogyId;
      const analogyLikes = await ctx.prisma.like.findMany({
        where: {
          analogyId: analogyId,
          voterId: voterId,
        },
      });
      const analogyDislikes = await ctx.prisma.dislike.findMany({
        where: {
          analogyId: analogyId,
          voterId: voterId,
        },
      });
      const whatDidCurrentUserVote =
        analogyLikes.length === 1 ? "like" : analogyDislikes.length === 1 ? "dislike" : null;
      return whatDidCurrentUserVote;
    }
    ),


});
