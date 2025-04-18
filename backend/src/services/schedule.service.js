import { scheduleRepo } from '../repositories/schedule.repo.js'
import { userActionLogRepo } from '../repositories/userActionLog.repo.js'
import { deviceRepo } from '../repositories/device.repo.js'
import ApiError from '../helpers/ApiError.js'
import { StatusCodes } from 'http-status-codes'

const createSchedule = async (areaId, scheduleData) => {
    if (!scheduleData) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Dữ liệu lịch không hợp lệ')
    }
    const schedule = await scheduleRepo.createSchedule(areaId, scheduleData)
    const area = await deviceRepo.getAreaById(areaId)
    if (!area) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Khu vực không tồn tại!')
    }
    const userId = area.farm?.user?.id

    try {
        await userActionLogRepo.createUserActionLog({
            userId,
            action: 'CREATE_SCHEDULE',
            description: `Người dùng đã tạo lịch trong khu vực ${areaId}`,
            areaId
        })
    } catch (error) {
        console.error('Ghi log thất bại:', error)
    }

    return schedule
}

const getSchedules = async (areaId) => {
    const schedules = await scheduleRepo.getSchedules(areaId)
    const area = await deviceRepo.getAreaById(areaId)
    if (!area) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Khu vực không tồn tại!')
    }

    const userId = area.farm?.user?.id
    // try {
    //     await userActionLogRepo.createUserActionLog({
    //         userId,
    //         action: 'GET_SCHEDULES',
    //         description: `Người dùng đã lấy danh sách lịch trong khu vực ${areaId}`,
    //         areaId
    //     });
    // } catch (error) {
    //     console.error('Ghi log thất bại:', error);
    // }

    return schedules
}

const deleteSchedule = async (scheduleId) => {
    const schedule = await scheduleRepo.getScheduleById(scheduleId)
    if (!schedule) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Lịch không tồn tại')
    }

    const result = await scheduleRepo.deleteSchedule(scheduleId)
    const areaId = schedule.areaId

    const area = await deviceRepo.getAreaById(areaId)
    if (!area) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Khu vực không tồn tại!')
    }
    const userId = area.farm?.user?.id

    if (result.count === 0) {
        return false
    }

    try {
        await userActionLogRepo.createUserActionLog({
            userId,
            action: 'DELETE_SCHEDULE',
            description: `Người dùng đã xóa lịch có ID ${scheduleId}`,
            areaId
        })
    } catch (error) {
        console.error('Ghi log thất bại:', error)
    }

    return true
}

const updateSchedule = async (scheduleId, scheduleData) => {
    if (!scheduleId || !scheduleData) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu thông tin cập nhật')
    }
    const schedule = await scheduleRepo.getScheduleById(scheduleId)
    if (!schedule) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Lịch không tồn tại')
    }
    const areaId = schedule.areaId
    const area = await deviceRepo.getAreaById(areaId)
    if (!area) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Khu vực không tồn tại!')
    }
    const userId = area.farm?.user?.id

    const updatedSchedule = await scheduleRepo.updateSchedule(scheduleId, scheduleData)

    try {
        await userActionLogRepo.createUserActionLog({
            userId,
            action: 'UPDATE_SCHEDULE',
            description: `Người dùng đã cập nhật lịch có ID ${scheduleId}`,
            areaId
        })
    } catch (error) {
        console.error('Ghi log thất bại:', error)
    }

    return updatedSchedule
}

export const scheduleService = {
    createSchedule,
    getSchedules,
    deleteSchedule,
    updateSchedule
}
