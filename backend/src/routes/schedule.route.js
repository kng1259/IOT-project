import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { scheduleController } from '../controllers/schedule.controller.js';

const router = express.Router();

router.route('/get').get(asyncHandler(scheduleController.getSchedules));
//http://localhost:8080/api/v1/schedule/get?areaId=

router.route('/create').post(asyncHandler(scheduleController.createSchedule));
//http://localhost:8080/api/v1/schedule/create?areaId=

export const scheduleRoute = router;
