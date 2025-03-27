import { StatusCodes } from 'http-status-codes';
import { deviceService } from '../services/device.service.js';
import ApiError from '../helpers/ApiError.js';

const syncDeviceLogs = async (req, res) => {
    const { areaId } = req.query;
    const logs = await deviceService.syncDeviceLogs(areaId);
    res.status(StatusCodes.OK).json(logs);
};
  

const createDeviceLogs = async (req, res) => {
    try {
      const { action, deviceType, areaId, note } = req.body;
      const log = await deviceService.createDeviceLog({
        action,
        deviceType,
        areaId,
        note,
      });
  
      res.status(StatusCodes.CREATED).json({ success: true, log });
    } catch (err) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Failed to create device log: ${err.message}`)
    }
  };
  
export const deviceController = {
    syncDeviceLogs,
    createDeviceLogs
};
