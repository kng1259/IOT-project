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
    return await prisma.area.findUnique({
        where: { id: areaId },
        include: {
            farm: {
                select: {
                    id: true, // Lấy farmId
                    user: {
                        select: {
                            id: true, // Lấy userId từ farm
                        },
                    },
                },
            },
        },
    })
}


export const deviceRepo = {
    getDeviceLogs,
    logDeviceAction,
    getAreaById
}
