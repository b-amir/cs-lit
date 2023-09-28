import type { Session } from "next-auth";
import { vi, expect, describe, it } from "vitest";
import { mockPrisma } from "@/server/__mocks__/db";
import { AppRouter, appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";

/*
 * two ways to mock prisma:
 * 1. mock the prisma client directly through the __mocks__ folder
 * 2. mock the prisma client using the mockDeep function from vitest-mock-extended
 */
vi.mock("../../src/server/db.ts");
// const mockPrisma = mockDeep<PrismaClient>();

describe("Analogy", async () => {
  // setup the mock session
  const mockSession: Session = {
    expires: "1",
    user: {
      id: "test",
      role: "USER",
      email: "test",
      image: "test",
      name: "test",
    },
  };

  const ctx = await createInnerTRPCContext({ session: mockSession });
  const caller = appRouter.createCaller({ ...ctx, prisma: mockPrisma });

  // const input: inferProcedureInput<AppRouter["analogy"]["create"]> = {
  //   description:
  //     "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestv",
  //   topicId: "test",
  //   reference: "https://google.com",
  // };

  // ensure that between every individual test the mocks are restored to their original state.
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should pass the correct data via prisma", async () => {
    const mockOutput = {
      id: "test",
      description: "test",
      reference: "test",
      topicId: "test",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: "test",
      status: "PUBLISHED",
      title: "test",
      pinned: false,
      category: null,
      topic: undefined,
      user: undefined,
    };
    // @ts-ignore
    mockPrisma.analogy.findUnique.mockResolvedValue({
      ...mockOutput,
      id: "test",
    });

    const analogyById = await caller.analogy.getById({
      id: "test",
    });

    expect(analogyById).toStrictEqual(mockOutput);
    expect(analogyById.description).toBe(mockOutput.description);
    expect(analogyById.id).toBe(mockOutput.id);
  });
});
