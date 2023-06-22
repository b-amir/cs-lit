import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
// import { clerkClient } from "@clerk/nextjs/server";
// import type { User } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "@/server/helpers/filterUserForClient";
import { PrismaClient, type Analogy } from "@prisma/client";
import { NextPageContext } from "next";

export const analogiesWithUserData = async (analogies: Analogy[]) => {
  const prisma = new PrismaClient();
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
  const prisma = new PrismaClient();
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

export const analogyWithUserData = async (analogy: Analogy) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: analogy.authorId },
  });
  return { ...analogy, user };
};

export const analogiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const analogies = await ctx.prisma.analogy.findMany({
      take: 5,
      orderBy: [{ createdAt: "desc" }],
    });
    // return analogies;

    // return addUsersDataToAnalogies(analogies, ctx);
    return analogiesWithUserAndTopicData(analogies);
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
      return analogy;
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
          authorId,
          description: input.description,
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


});
