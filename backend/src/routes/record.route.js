import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { recordController } from '../controllers/record.controller.js';

const router = express.Router();

// Lấy record mới nhất theo areaId
router.get('/latest', asyncHandler(recordController.getLatestRecordByArea));

export const recordRoute = router;
