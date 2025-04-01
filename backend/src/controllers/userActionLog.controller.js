import { userActionLogService} from '../services/userActionLog.service.js'
import { StatusCodes } from 'http-status-codes';
import ApiError from '../helpers/ApiError.js';  

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
  
const getUserLogsByUserId = async (req, res) => {
    try {
      const { userId } = req.query
      const logs = await userActionLogService.getUserActionLogsByUserId(userId)
      res.status(StatusCodes.OK).json(logs)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
}
  
const getUserLogsByAreaId = async (req, res) => {
    try {
      let { areaId } = req.query
      areaId = parseInt(areaId)
      const logs = await userActionLogService.getUserActionLogsByAreaId(areaId)
      res.status(200).json(logs)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
}

export const userActionLogController = {
    createUserActionLog,
    getUserLogsByUserId,
    getUserLogsByAreaId
}