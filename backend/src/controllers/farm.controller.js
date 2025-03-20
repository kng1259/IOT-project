import { StatusCodes } from 'http-status-codes';
import { farmService } from '../services/farm.service.js';

const getFarmsByUser = async (req, res) => {
  const { userId } = req.query;
  const farms = await farmService.getFarmsByUser(userId);
  res.status(StatusCodes.OK).json(farms);
};


export const farmController = {
  getFarmsByUser
};
