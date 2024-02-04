import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();
export type PrismaService = typeof prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
