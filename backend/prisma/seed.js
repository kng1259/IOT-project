import { PrismaClient } from '@prisma/client';
import { createRequire } from 'module';
import { seedRecordData } from './records.js';

const require = createRequire(import.meta.url);
const prisma = new PrismaClient();

const main = async () => {
    seedRecordData();

    const tables = ['User', 'Farm', 'Area', 'Crop', 'PlantedCrop', 'DeviceLog', 'Record', 'Schedule'];
    for (const table of tables.slice().reverse()) {
        await prisma[table].deleteMany({});
    }

    for (const table of tables) {
        const data = require(`./data/${table}.json`);
        await prisma[table].createMany({ data });
    }

    console.log('Seed dữ liệu thành công!');

    
};

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });