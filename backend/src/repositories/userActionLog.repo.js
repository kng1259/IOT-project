import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const createUserActionLog = async (data) => {
  return await prisma.userActionLog.create({ data })
}

const getUserActionLogsByUserId = async (userId) => {
  return await prisma.userActionLog.findMany({
    where: { userId },
    orderBy: { timestamp: 'desc' }
  })
}

const getUserActionLogsByAreaId = async (areaId) => {
  return await prisma.userActionLog.findMany({
    where: { areaId },
    orderBy: { timestamp: 'desc' }
  })
}

const getUserActionLogs = async (userId, areaId) => {
  return await prisma.userActionLog.findMany({
    where: { userId, areaId },
    orderBy: { timestamp: 'desc' }
  })
}
export const userActionLogRepo = {
    createUserActionLog,
    getUserActionLogsByUserId,
    getUserActionLogsByAreaId,
    getUserActionLogs
}
