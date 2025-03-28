import { StatusCodes } from 'http-status-codes'
import { scheduleService } from '../services/schedule.service.js'

const createSchedule = async (req, res) => {
    const areaId = parseInt(req.query.areaId)
    const scheduleData = req.body
    const result = await scheduleService.createSchedule(areaId, scheduleData)
    res.status(StatusCodes.CREATED).json(result)
}

const getSchedules = async (req, res) => {
    const areaId = parseInt(req.query.areaId)
    const schedules = await scheduleService.getSchedules(areaId)
    res.status(StatusCodes.OK).json(schedules)
}

export const scheduleController = {
    createSchedule,
    getSchedules
}
