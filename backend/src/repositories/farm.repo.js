import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const findFarmsByUserId = async (userId) => {
    return await prisma.Farm.findMany({ where: { userId } })
}

const findFarmById = async (farmId) => {
    return await prisma.Farm.findUnique({ where: { id: farmId } })
}


export const farmRepo = {
    findFarmsByUserId,
    findFarmById
}
