import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createSchedule = async (areaId, scheduleData) => {
    return await prisma.Schedule.create({
        data: { ...scheduleData, areaId }
    })
}

const getSchedules = async (areaId) => {
    return await prisma.Schedule.findMany({
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
