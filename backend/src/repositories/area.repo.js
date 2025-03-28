import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findAreasByFarmId = async (farmId) => {
    return await prisma.Area.findMany({ where: { farmId } })
}

export const areaRepo = {
    findAreasByFarmId
}
