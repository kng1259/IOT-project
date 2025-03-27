import * as helloworldService from '../services/helloworld.service.js';
import * as iotDeviceService from '../services/iotDevice.service.js';
import ApiError from '../helpers/ApiError.js';
import { StatusCodes } from 'http-status-codes';

export const helloworld = async (req, res) => {
    const result = await helloworldService.helloworld().catch((err) => {
        throw new ApiError(500, err);
    });
    res.status(StatusCodes.OK).json(result);
};

export const testFunction = async (req, res) => {
    const farmId = req.params.farmId;
    const areaId = parseInt(req.params.areaId);
    await iotDeviceService.waterPlants(farmId, areaId).catch((err) => {
        throw new ApiError(500, err);
    });
    res.status(StatusCodes.OK).json({ message: 'Method called!' });
};
