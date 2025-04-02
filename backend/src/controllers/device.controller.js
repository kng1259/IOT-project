import { StatusCodes } from 'http-status-codes'
import { deviceService } from '../services/device.service.js'

const syncDeviceLogs = async (req, res) => {
    const areaId = parseInt(req.query.areaId)
    const logs = await deviceService.syncDeviceLogs(areaId)
    res.status(StatusCodes.OK).json(logs)
}

const controlDevice = async (req, res) => {
    const areaId = parseInt(req.body.areaId); 
    const { action, deviceType } = req.body;

    if (!areaId || isNaN(areaId) || !action || !deviceType) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Thiếu thông tin cần thiết!' })
    }

    try {
        const result = await deviceService.controlDevice(areaId, action, deviceType)
        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

export const deviceController = {
    syncDeviceLogs,
    controlDevice
}
