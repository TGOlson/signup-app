import { PrismaClient } from '@prisma/client'

// Stores the Prisma Client in the global context
// Helps prevent multiple instances of Prisma Client in development from hot-reloading 

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
