// seed prisma database

import { prisma } from "@/server/db";

export async function seed() {
  console.log('Seeding...');

  // --- First, delete anything left behind --- //
  await prisma.like.deleteMany({});
  await prisma.dislike.deleteMany({});
  await prisma.comment.deleteMany({});

  await prisma.analogy.deleteMany({});
  await prisma.topic.deleteMany({});
  await prisma.category.deleteMany({});

  await prisma.activity.deleteMany({});

  await prisma.verificationToken.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});




  // --- Create a user for each role --- //

  await prisma.user.create({
    data: {
      id: 'user-1',
      username: 'test-admin',
      name: 'Test Admin',
      emailVerified: new Date(),
      image: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      role: 'ADMIN',
      email: 'test.admin@example.com',
      status: 'ACTIVE',
      sessions: {
        create: {
          id: 'session-1',
          // a day in the far future:
          expires: new Date(3000, 1, 1),
          sessionToken: 'this-is-a-testing-token',
        }
      }

    },
  });
  await prisma.user.create({
    data: {
      id: 'user-2',
      username: 'test-editor',
      role: 'EDITOR',
      email: 'test.editor@example.com',
      status: 'ACTIVE',
    },
  });
  await prisma.user.create({
    data: {
      id: 'user-3',
      username: 'test-user',
      role: 'USER',
      email: 'test.user@example.com',
      status: 'ACTIVE',
    },
  });



  // --- create Categories, Topics and Analogies --- //

  // category #1 with 2 topics, one has 2 analogies and second one is empty
  await prisma.category.create({
    data: {
      id: 'category-1',
      name: 'JavaScript',
      slug: 'javascript',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'PUBLISHED',

      // connecting to:
      topics: {
        connectOrCreate: [
          {
            where: { id: 'topic-1' },
            create: {
              id: 'topic-1',
              title: 'Closure',
              slug: 'closure',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'PUBLISHED',

              // connecting to:
              starter: { connect: { id: 'user-1' } },
            },
          },
          {
            where: { id: 'topic-2' },
            create: {
              id: 'topic-2',
              title: 'Scopes',
              slug: 'scopes',
              url: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope',
              createdAt: new Date(),
              updatedAt: new Date(),
              status: 'PENDING',

              // connecting to:
              starter: { connect: { id: 'user-2' } },
            },
          },
        ],
      }
    },
  });

  await prisma.analogy.create({
    data: {
      id: 'analogy-1',
      title: 'Closures are like envelopes',
      description: 'A closure is like an envelope: it has a message inside, and it has an address on the outside. The message is the inner function. The address is the outer function. The inner function has access to variables in the outer function, but the outer function does not have access to variables in the inner function.',
      createdAt: new Date(),
      updatedAt: new Date(),
      reference: 'https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36',
      status: 'PUBLISHED',

      // connecting to:
      comments: {
        connectOrCreate: {
          where: { id: 'comment-1' },
          create: {
            id: 'comment-1',
            content: 'This is a comment',
            createdAt: new Date(),
            updatedAt: new Date(),

            // connecting to:
            commenter: {
              connect: { id: 'user-1' },
            },
          },
        },
      },
      likes: {
        connectOrCreate: {
          where: { id: 'like-1' },
          create: {
            id: 'like-1',
            createdAt: new Date(),
            updatedAt: new Date(),

            // connecting to:
            voter: {
              connect: { id: 'user-1' },
            },
          },
        },
      },
      dislikes: {
        connectOrCreate: {
          where: { id: 'dislike-1' },
          create: {
            id: 'dislike-1',
            createdAt: new Date(),
            updatedAt: new Date(),

            // connecting to:
            voter: {
              connect: { id: 'user-2' },
            },
          },
        },
      },
      topic: {
        connect: { id: 'topic-1' },
      },
      author: {
        connect: { id: 'user-1' },
      },
    },
  });
  await prisma.analogy.create({
    data: {
      id: 'analogy-2',
      title: 'Closures are like a backpack',
      description: 'A closure is like a backpack: it has a message inside, and it has an address on the outside. The message is the inner function. The address is the outer function. The inner function has access to variables in the outer function, but the outer function does not have access to variables in the inner function.',
      createdAt: new Date(),
      updatedAt: new Date(),
      reference: 'https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36',
      status: 'PENDING',

      // connecting to:
      comments: {
        connectOrCreate: {
          where: { id: 'comment-2' },
          create: {
            id: 'comment-2',
            content: 'This is another comment',
            createdAt: new Date(),
            updatedAt: new Date(),

            // connecting to:
            commenter: {
              connect: { id: 'user-2' },
            },
          },
        },
      },
      likes: {
        connectOrCreate: {
          where: { id: 'like-2' },
          create: {
            id: 'like-2',
            createdAt: new Date(),
            updatedAt: new Date(),

            // connecting to:
            voter: {
              connect: { id: 'user-2' },
            },
          },
        },
      },
      dislikes: {
        connectOrCreate: {
          where: { id: 'dislike-2' },
          create: {
            id: 'dislike-2',
            createdAt: new Date(),
            updatedAt: new Date(),

            // connecting to:
            voter: {
              connect: { id: 'user-1' },
            },
          },
        },
      },
      topic: {
        connect: { id: 'topic-1' },
      },
      author: {
        connect: { id: 'user-2' },
      },
    },
  });


  // category #2 with 0 topics and therefore 0 analogies
  await prisma.category.create({
    data: {
      id: 'category-2',
      name: 'Next.js',
      slug: 'nextjs',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'PUBLISHED',

      // connecting to:
      topics: {
        connectOrCreate: [],
      }
    },
  });




  // --- activity logs --- //

  await prisma.activity.create({
    data: {
      id: 'activity-1',
      entityType: "analogy",
      entityTitle: "Closures are like envelopes",
      action: "created",
      entityId: 'analogy-1',
      timestamp: new Date(),

      // connecting to:
      user: {
        connect: { id: 'user-1' },
      },
    },
  });
  await prisma.activity.create({
    data: {
      id: 'activity-2',
      entityType: "analogy",
      entityTitle: "Closures are like envelopes",
      action: "updated",
      entityId: 'analogy-1',
      timestamp: new Date(),

      // connecting to:
      user: {
        connect: { id: 'user-2' },
      },
    },
  });
  await prisma.activity.create({
    data: {
      id: 'activity-3',
      entityType: "analogy",
      entityTitle: "Closures are like envelopes",
      action: "deleted",
      entityId: 'analogy-1',
      timestamp: new Date(),

      // connecting to:
      user: {
        connect: { id: 'user-3' },
      },
    },
  });

}