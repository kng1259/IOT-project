import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getDeviceLogs = async (areaId) => {
    return await prisma.DeviceLog.findMany({
        where: { areaId },
        orderBy: { timestamp: 'desc' }
    })
}

const logDeviceAction = async (areaId, action, deviceType, originalAction) => {
    const logmap = new Map([
        ['START_Chiếu đèn', 'Bật đèn'],
        ['STOP_Chiếu đèn', 'Tắt đèn'],
        ['START_Tưới nước', 'Bật tưới nước'],
        ['STOP_Tưới nước', 'Tắt tưới nước']
    ])
    return await prisma.deviceLog.create({
        data: {
            action,
            timestamp: new Date(),
            deviceType,
            note: `Hệ thống đã ${logmap.get(action) || action}`,
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
                            id: true // Lấy userId từ farm
                        }
                    }
                }
            }
        }
    })
}

export const deviceRepo = {
    getDeviceLogs,
    logDeviceAction,
    getAreaById
}
