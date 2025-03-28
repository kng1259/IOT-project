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

export const scheduleService = {
    createSchedule,
    getSchedules
}
