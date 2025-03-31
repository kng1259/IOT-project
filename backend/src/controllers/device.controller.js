import { StatusCodes } from 'http-status-codes'
import { deviceService } from '../services/device.service.js'

const syncDeviceLogs = async (req, res) => {
    const areaId = parseInt(req.query.areaId)
    const logs = await deviceService.syncDeviceLogs(areaId)
    res.status(StatusCodes.OK).json(logs)
}

export const deviceController = {
    syncDeviceLogs
}
