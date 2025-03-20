import { StatusCodes } from 'http-status-codes';
import { areaRepo } from '../repositories/area.repo.js';
import ApiError from '../helpers/ApiError.js';

const getAreasByFarm = async (farmId) => {
  if (!farmId) throw new ApiError(StatusCodes.BAD_REQUEST, 'Thiếu farmId');

  return await areaRepo.findAreasByFarmId(farmId);
};

export const areaService = {
  getAreasByFarm
};
