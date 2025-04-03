import {userActionLogRepo} from '../repositories/userActionLog.repo.js'
  
const createUserActionLog = async ({ userId, action, description, areaId }) => {
    if (!userId || !action || !areaId) {
      throw new Error('userId, action, and areaId are required')
    }
  
    return await userActionLogRepo.createUserActionLog({ userId, action, description, areaId })
}
  
const getUserActionLogsByUserId = async (userId) => {
    if (!userId) throw new Error('userId is required')
    return await userActionLogRepo.getUserActionLogsByUserId(userId)
}
  
const getUserActionLogsByAreaId = async (areaId) => {
    if (!areaId) throw new Error('areaId is required')
    return await userActionLogRepo.getUserActionLogsByAreaId(areaId)
}

const getUserActionLogs = async (userId, areaId) => {
    if (!userId) throw new Error('userId is required')
    if (!areaId) throw new Error('areaId is required')
    return await userActionLogRepo.getUserActionLogs(userId, areaId)
}

export const userActionLogService = {
    createUserActionLog,
    getUserActionLogsByUserId,
    getUserActionLogsByAreaId,
    getUserActionLogs
}