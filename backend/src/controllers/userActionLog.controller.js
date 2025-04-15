import { userActionLogService } from '../services/userActionLog.service.js'
import { StatusCodes } from 'http-status-codes'
import ApiError from '../helpers/ApiError.js'

const createUserActionLog = async (req, res) => {
    try {
        const log = await userActionLogService.createUserActionLog(req.body)
        res.status(StatusCodes.CREATED).json(log)
    } catch (err) {
        if (err.message.includes('required')) {
            throw new ApiError(StatusCodes.BAD_REQUEST, err.message)
        } else {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Something went wrong: ${err.message}`)
        }
    }
}

const getUserLogs = async (req, res) => {
    try {
        const { userId, areaId } = req.query

        if (userId && areaId) {
            const parsedAreaId = parseInt(areaId)
            const logs = await userActionLogService.getUserActionLogs(userId, parsedAreaId)
            return res.status(StatusCodes.OK).json(logs)
        }

        if (userId) {
            const logs = await userActionLogService.getUserActionLogsByUserId(userId)
            return res.status(StatusCodes.OK).json(logs)
        }

        if (areaId) {
            const parsedAreaId = parseInt(areaId)
            const logs = await userActionLogService.getUserActionLogsByAreaId(parsedAreaId)
            return res.status(StatusCodes.OK).json(logs)
        }

        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Missing userId or areaId in query' })
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: err.message })
    }
}

export const userActionLogController = {
    createUserActionLog,
    getUserLogs
}
