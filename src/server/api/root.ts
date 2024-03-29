import { analogiesRouter } from './routers/analogies';
import { categoriesRouter } from './routers/categories';
import { profileRouter } from "./routers/profile";
import { createTRPCRouter } from "@/server/api/trpc";
import { topicsRouter } from './routers/topics';
import { pendingRouter } from './routers/pending';
import { activityRouter } from './routers/activity';
import { commentsRouter } from './routers/comments';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  analogy: analogiesRouter,
  profile: profileRouter,
  category: categoriesRouter,
  topic: topicsRouter,
  pending: pendingRouter,
  activity: activityRouter,
  comment: commentsRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;
