import { StatusCodes } from 'http-status-codes';
import { scheduleService } from '../services/schedule.service.js';
import ApiError from '../helpers/ApiError.js';

const createSchedule = async (req, res) => {
    try {
      let { areaId } = req.query;
      areaId = parseInt(areaId) // chuyển từ string sang int
      const scheduleData = req.body;
      const result = await scheduleService.createSchedule(areaId, scheduleData);
      res.status(StatusCodes.CREATED).json({ success: true, schedule: result });
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  };


const getSchedules = async (req, res) => {
    const { areaId } = req.query;
    const schedules = await scheduleService.getSchedules(areaId);
    res.status(StatusCodes.OK).json(schedules);
};

export const scheduleController = {
    createSchedule,
    getSchedules
};
