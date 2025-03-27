import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDeviceLogs = async (areaId) => {
    return await prisma.DeviceLog.findMany({
        where: { areaId }
    });
};

export const deviceRepo = {
    getDeviceLogs
};
