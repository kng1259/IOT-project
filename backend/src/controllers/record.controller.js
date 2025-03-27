import { StatusCodes } from 'http-status-codes';
import { recordService } from '../services/record.service.js';

const getLatestRecordByArea = async (req, res) => {
    const areaId = parseInt(req.query.areaId);
    const record = await recordService.getLatestRecordByArea(areaId);
    res.status(StatusCodes.OK).json(record);
};

const getChartData = async (req, res) => {
    try {
        const areaId = parseInt(req.query.areaId);

        if (!areaId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'areaId is required' });
        }

        const data = await recordService.getChartData(areaId);
        res.status(StatusCodes.OK).json(data);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

export const recordController = {
    getLatestRecordByArea,
    getChartData,
};
