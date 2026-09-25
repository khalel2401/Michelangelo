import prismaClientPkg from '@prisma/client';
const { PrismaClient } = prismaClientPkg;

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;