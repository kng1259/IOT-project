import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getDeviceLogs = async (areaId) => {
    return await prisma.DeviceLog.findMany({
        where: { areaId }
    });
};

// create a deviceLog
const createDeviceLog = async ({ action, deviceType, areaId, note }) => {
    const area = await prisma.area.findUnique({
        where: { id: areaId },
      });
    
    if (!area) {
        throw new Error(`Khu vực area với id ${areaId} không tồn tại`);
    }
    
    return await prisma.deviceLog.create({
      data: {
        action,
        deviceType,
        areaId,
        note,
        timestamp: new Date().toISOString()
      },
    });
  };
  

export const deviceRepo = {
    getDeviceLogs,
    createDeviceLog
};