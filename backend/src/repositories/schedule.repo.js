import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createSchedule = async (areaId, scheduleData) => {
    const area = await prisma.area.findUnique({
        where: { id: areaId },
      });
    
    if (!area) {
        throw new Error(`Không có khu vực area với id ${areaId}`);
    }
    return await prisma.schedule.create({
        data: { ...scheduleData, areaId }
    })
}

const getSchedules = async (areaId) => {
    return await prisma.schedule.findMany({
        where: { areaId }
    })
}

const deleteSchedule = async (scheduleId) => {
    return await prisma.Schedule.deleteMany({
        where: { id: scheduleId }
    })
}

const updateSchedule = async (scheduleId, scheduleData) => {
    return await prisma.Schedule.update({
        where: { id: scheduleId },
        data: scheduleData
    })
}

export const scheduleRepo = {
    createSchedule,
    getSchedules,
    deleteSchedule,
    updateSchedule
}
