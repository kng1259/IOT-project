import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { areaController } from '../controllers/area.controller.js';

const router = express.Router();

// Lấy danh sách các Area theo farmId
router.get('/', asyncHandler(areaController.getAreasByFarm));

export const areaRoute = router;
