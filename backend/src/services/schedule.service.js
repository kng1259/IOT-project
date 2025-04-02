import { scheduleRepo } from '../repositories/schedule.repo.js'
import ApiError from '../helpers/ApiError.js'
import { StatusCodes } from 'http-status-codes'

const createSchedule = async (areaId, scheduleData) => {
    if (!scheduleData) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Dữ liệu lịch không hợp lệ')
    }
    return await scheduleRepo.createSchedule(areaId, scheduleData)
}

const getSchedules = async (areaId) => {
    return await scheduleRepo.getSchedules(areaId)
}

const deleteSchedule = async (scheduleId) => {
    const result = await scheduleRepo.deleteSchedule(scheduleId)
    if (result.count === 0) {
        return false  
    }
    return true  
}

const updateSchedule = async (scheduleId, scheduleData) => {
    if (!scheduleId || !scheduleData) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu thông tin cập nhật')
    }
    return await scheduleRepo.updateSchedule(scheduleId, scheduleData)
}

export const scheduleService = {
    createSchedule,
    getSchedules,
    deleteSchedule,
    updateSchedule
}
