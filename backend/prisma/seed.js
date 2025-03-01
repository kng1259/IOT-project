import { PrismaClient } from '@prisma/client';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const prisma = new PrismaClient();

const main = async () => {
    // Seed user data
    await prisma.user.createMany({
        data: require('./data/users.json'),
    });

    // Seed other data
};

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
