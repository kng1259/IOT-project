import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { recordController } from '../controllers/record.controller.js';

const router = express.Router();

// Lấy record mới nhất theo areaId
router.get('/latest', asyncHandler(recordController.getLatestRecordByArea));

router.get('/chart-data', asyncHandler(recordController.getChartData));
//http://localhost:8080/api/v1/records/chart-data?areaId=

export const recordRoute = router;
