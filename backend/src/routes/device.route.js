import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { deviceController } from '../controllers/device.controller.js';

const router = express.Router();

router.route('/sync').get(asyncHandler(deviceController.syncDeviceLogs));
//http://localhost:8080/api/v1/device-logs/sync?areaId=


export const deviceRoute = router;
