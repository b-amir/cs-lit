import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

// 2
beforeEach(() => {
  mockReset(mockPrisma)
})

// 3
export const mockPrisma = mockDeep<PrismaClient>()
