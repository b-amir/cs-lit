import '@testing-library/jest-dom'
import { prisma } from '@/server/db'
import { vi } from 'vitest'
import { Archivo } from 'next/font/google';

// vi.mock('./src/server/db', () => ({
//   prisma: vPrisma.client,
// }))

vi.mock("next/font/google", () => ({
  Archivo: () => ({
    style: { fontFamily: "Archivo" }
  })
}))

// mock next/router
vi.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
    push: () => { },
    replace: () => { },
    reload: () => { },
    back: () => { },
    prefetch: () => { },
    beforePopState: () => { },
    events: {
      on: () => { },
      off: () => { },
      emit: () => { },
    },
    isFallback: false,
  }),
}));
