import { deviceRepo } from '../repositories/device.repo.js';
import ApiError from '../helpers/ApiError.js';
import { StatusCodes } from 'http-status-codes';

const syncDeviceLogs = async (areaId) => {
    const logs = await deviceRepo.getDeviceLogs(areaId);
    if (!logs || logs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không có dữ liệu log mới');
    }
    return logs; 
};
  
const createDeviceLog = async ({ action, deviceType, areaId, note }) => {
    if (!action || !deviceType || !areaId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu dữ liệu bắt buộc');
    }
    const logs = await deviceRepo.createDeviceLog({
      action,
      deviceType,
      areaId,
      note,
    });
    
   
    return logs;
};
  
export const deviceService = {
    syncDeviceLogs,
    createDeviceLog,
};