import { StatusCodes } from 'http-status-codes'
import { scheduleService } from '../services/schedule.service.js'

const createSchedule = async (req, res) => {
    const areaId = parseInt(req.body.areaId)
    const scheduleData = req.body
    const result = await scheduleService.createSchedule(areaId, scheduleData)
    res.status(StatusCodes.CREATED).json(result)
}

const getSchedules = async (req, res) => {
    const areaId = parseInt(req.query.areaId)
    const schedules = await scheduleService.getSchedules(areaId)
    res.status(StatusCodes.OK).json(schedules)
}

const deleteSchedule = async (req, res) => {
    const scheduleId = req.params.id  
    const result = await scheduleService.deleteSchedule(scheduleId)
    
    if (result) {
        res.status(StatusCodes.NO_CONTENT).send()  
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Không tìm thấy lịch để xóa' })
    }
}

const updateSchedule = async (req, res) => {
    const scheduleId = req.params.id
    const scheduleData = req.body
    const updatedSchedule = await scheduleService.updateSchedule(scheduleId, scheduleData)
    res.status(StatusCodes.OK).json(updatedSchedule)
}

export const scheduleController = {
    createSchedule,
    getSchedules, 
    deleteSchedule, 
    updateSchedule
}
