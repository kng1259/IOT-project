import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getDeviceLogs = async (areaId) => {
    return await prisma.DeviceLog.findMany({
        where: { areaId }
    })
}

const logDeviceAction = async (areaId, action, deviceType, originalAction) => {
    return await prisma.deviceLog.create({
        data: {
            action,
            timestamp: new Date(),
            deviceType,
            note: `Executed action: ${originalAction}`,
            areaId
        }
    })
}

const getAreaById = async (areaId) => {
    return await prisma.Area.findUnique({
        where: { id: areaId },
        select: { farmId: true }
    })
}

export const deviceRepo = {
    getDeviceLogs,
    logDeviceAction,
    getAreaById
}
