import { StatusCodes } from 'http-status-codes';
import { recordRepo } from '../repositories/record.repo.js';
import ApiError from '../helpers/ApiError.js';

const getLatestRecordByArea = async (areaId) => {
  if (!areaId) throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu areaId');

  return await recordRepo.findLatestRecordByAreaId(areaId);
};

export const recordService = {
  getLatestRecordByArea
};
