import { StatusCodes } from 'http-status-codes';
import { areaService } from '../services/area.service.js';

const getAreasByFarm = async (req, res) => {
  const { farmId } = req.query;
  const areas = await areaService.getAreasByFarm(farmId);
  res.status(StatusCodes.OK).json(areas);
};

export const areaController = {
  getAreasByFarm
};
