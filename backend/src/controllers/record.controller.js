import { StatusCodes } from 'http-status-codes';
import { recordService } from '../services/record.service.js';

const getLatestRecordByArea = async (req, res) => {
  const { areaId } = req.query;
  const record = await recordService.getLatestRecordByArea(areaId);
  res.status(StatusCodes.OK).json(record);
};

export const recordController = {
  getLatestRecordByArea
};
