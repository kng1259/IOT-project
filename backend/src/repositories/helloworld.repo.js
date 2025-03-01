import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const helloworld = async () => {
    const firstUser = await prisma.user.findFirst();
    console.log(firstUser);
    return `Hello ${firstUser?.username ?? 'World'}`;
};
