import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const helloworld = async () => {
    const firstUser = await prisma.user.findFirst();
    return `Hello ${firstUser?.username ?? 'World'}`;
};
