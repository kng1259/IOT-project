import { deviceRepo } from '../repositories/device.repo.js'
import { callDeviceMethod } from './iotDevice.service.js'
import ApiError from '../helpers/ApiError.js'
import { StatusCodes } from 'http-status-codes'

const syncDeviceLogs = async (areaId) => {
    const logs = await deviceRepo.getDeviceLogs(areaId)
    if (!logs || logs.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Không có dữ liệu log mới')
    }
    return logs
}

const controlDevice = async (areaId, action, deviceType) => {
    const actionText = action === 'START' ? 'Bật' : 'Tắt'
    let command = ''

    const area = await deviceRepo.getAreaById(areaId)
    if (!area) throw new Error('Khu vực không tồn tại!')

    const farmId = area.farmId
    let level = 0

    if (deviceType === 'Máy bơm') {
        command = action === 'START' ? 'START_Tưới nước' : 'STOP_Tưới nước'
        level = action === 'START' ? 100 : 0
    } else if (deviceType === 'Đèn') {
        command = action === 'START' ? 'START_Chiếu đèn' : 'STOP_Chiếu đèn'
    } else {
        throw new Error('Loại thiết bị không hợp lệ!')
    }
    console.log(`${actionText} ${deviceType} tại khu vực ${areaId}`)

    //gọi
    try {
        await callDeviceMethod(command, farmId, areaId, level)
    } catch (error) {
        console.error(`Lỗi khi gọi phương thức ${command} tại khu vực ${areaId}:`, error)
    }

    try {
        await deviceRepo.logDeviceAction(areaId, command, deviceType, action)
    } catch (error) {
        console.error(`Lỗi khi lưu log: `, error)
    }
}

export const deviceService = {
    syncDeviceLogs,
    controlDevice
}
