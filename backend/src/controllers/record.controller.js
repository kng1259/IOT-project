import { StatusCodes } from 'http-status-codes';
import { recordService } from '../services/record.service.js';
import ApiError from '../helpers/ApiError.js';

const getLatestRecordByArea = async (req, res) => {
    const areaId = parseInt(req.query.areaId)
    const record = await recordService.getLatestRecordByArea(areaId)
    res.status(StatusCodes.OK).json(record)
}

const getChartData = async (req, res) => {
    try {
        const areaId = parseInt(req.query.areaId)

        if (!areaId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'areaId is required' })
        }

        const data = await recordService.getChartData(areaId)
        res.status(StatusCodes.OK).json(data)
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' })
    }
}

const createRecord = async (req, res) => {
  try {
    const { sensorData, areaId, note } = req.body;

    
    if (
      isNaN(areaId) ||
      !sensorData ||
      sensorData.light === undefined ||
      sensorData.temperature === undefined ||
      sensorData.humidity === undefined ||
      sensorData.soilMoisture === undefined
    ) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu dữ liệu Sensor hoặc areaId không hợp lệ');
    }

    const record = await recordService.createSensorRecord({ 
      sensorData, 
      areaId, 
      note 
    });

    res.status(StatusCodes.CREATED).json({ success: true, record });
  } catch (error) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create sensor record')

  }
};


export const recordController = {
    getLatestRecordByArea,
    getChartData,
    createRecord
};
