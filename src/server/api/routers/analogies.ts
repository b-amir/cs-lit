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
import { filterUserForClient } from "@/server/helpers/filterUserForClient";
import { type Analogy, type Prisma } from "@prisma/client";
import { prisma } from "@/server/db"

// const prisma = new PrismaClient();




export const analogiesWithUserData = async (analogies: Analogy[]) => {
  // const prisma = new PrismaClient();
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


export const analogiesWithUserAndTopicData = async (analogies: Analogy[]) => {
  // const prisma = new PrismaClient();
  const analogiesWithUserAndTopicData = await Promise.all(
    analogies.map(async (analogy) => {
      const user = await prisma.user.findUnique({
        where: { id: analogy.authorId },
      });
      const topic = await prisma.topic.findUnique({
        where: { id: analogy.topicId },
      });
      return { ...analogy, user, topic };
    })
  );
  return analogiesWithUserAndTopicData;
};

export const analogiesWithUserAndTopicAndCategoryData = async (analogies: Analogy[]) => {
  const analogiesWithUserAndTopicAndCategoryData = await Promise.all(

    analogies.map(async (analogy) => {
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
  return analogiesWithUserAndTopicAndCategoryData;
};

export const singleAnalogyWithUserAndTopicAndCategoryData = async (analogy: Analogy) => {
  const user = await prisma.user.findUnique({
    where: { id: analogy.authorId },
  });
  const topic = await prisma.topic.findUnique({
    where: { id: analogy.topicId },
  });
  const category = topic ? await prisma.category.findUnique({
    where: { id: topic.categoryId },
  }) : null;
  const singleAnalogyWithUserAndTopicAndCategoryData = { ...analogy, user, topic, category }

  return singleAnalogyWithUserAndTopicAndCategoryData;
}



export const analogiesRouter = createTRPCRouter({
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
        items: await analogiesWithUserAndTopicAndCategoryData(items),
        total: await ctx.prisma.analogy.count(),
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
        items: await analogiesWithUserAndTopicAndCategoryData(items),
        total: await ctx.prisma.analogy.count(),
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
      const analogy = await ctx.prisma.analogy.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!analogy) throw new TRPCError({ code: "NOT_FOUND" });
      // return (await addUsersDataToAnalogies([analogy]))[0];
      return singleAnalogyWithUserAndTopicAndCategoryData(analogy);
    }),

  getAnalogiesByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.analogy
        .findMany({
          where: {
            authorId: input.userId,
          },
          take: 10,
          orderBy: [{ createdAt: "desc" }],
        })
        // .then(addUsersDataToAnalogies)
        .then(analogiesWithUserData)
    ),

  getSingleAnalogyById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.analogy
        .findUnique({
          where: {
            id: input.id,
          },
          include: {
            author: true,
          },
        })
        .then((analogy) => {
          if (!analogy) throw new TRPCError({ code: "NOT_FOUND" });
          return analogy;
        })
    ),


  getAnalogiesByTopicId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const analogies = await ctx.prisma.analogy.findMany({
        where: {
          topicId: input.id,
        },
        take: 10,
        orderBy: [{ createdAt: "desc" }],
      });
      return analogiesWithUserData(analogies);
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        topicId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session?.user.id;

      const analogy = await ctx.prisma.analogy.create({
        data: {
          title: input.title,
          authorId,
          description: input.description,
          topicId: input.topicId,
        },
      });
      return analogy;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        status: z.enum(["PUBLISHED", "PENDING", "REJECTED", "DELETED"]),
        pinned: z.boolean(),
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
          pinned: input.pinned,
          authorId: input.authorId,
          topicId: input.topicId,
        },
      });
      return analogy;
    }),



  deleteAllAnalogiesFromTopic: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session?.user.id;

      const analogies = await ctx.prisma.analogy.deleteMany({
        where: {
          topicId: input.topicId,
          authorId: authorId,
        },
      });
      return analogies;
    }
    ),


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
        // if analogyLikes.length === 1 { return "like" }
        // else if (analogyDislikes.length === 1) { return "dislike" }
        // else { return null }
        analogyLikes.length === 1 ? "like" : analogyDislikes.length === 1 ? "dislike" : null;





      return whatDidCurrentUserVote;
    }
    ),



  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const analogy = await ctx.prisma.analogy.delete({
        where: { id: input.id },
      });
      return analogy;
    }),


});
