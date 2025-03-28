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

export const scheduleRepo = {
    createSchedule,
    getSchedules
}
