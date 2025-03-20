import express from 'express';
import { getChartData } from '../controllers/data.controller.js';

const router = express.Router();

router.get('/chart-data', getChartData);

export default router;
