import { StatusCodes } from 'http-status-codes';
import { deviceService } from '../services/device.service.js';

const syncDeviceLogs = async (req, res) => {
    const { areaId } = req.query;
    const logs = await deviceService.syncDeviceLogs(areaId);
    res.status(StatusCodes.OK).json(logs);
};
  


export const deviceController = {
    syncDeviceLogs
};
