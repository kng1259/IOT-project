import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findAreasByFarmId = async (farmId) => {
    return await prisma.Area.findMany({ where: { farmId } })
}

const findAreaById = async (areaId) => {
    return await prisma.Area.findUnique({ where: { id: areaId } })
}

export const areaRepo = {
    findAreasByFarmId,
    findAreaById
}
