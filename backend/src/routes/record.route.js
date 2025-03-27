import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { recordController } from '../controllers/record.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: API endpoints for managing sensor records
 */

/**
 * @swagger
 * /api/v1/records/latest:
 *   get:
 *     summary: Get the latest record for a specific area
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the area to retrieve the latest record from
 *     responses:
 *       200:
 *         description: Returns the latest sensor record for the specified area
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 areaId:
 *                   type: string
 *                 temperature:
 *                   type: number
 *                 humidity:
 *                   type: number
 *                 light:
 *                   type: number
 *                 soilMoisture:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Server error
 */
router.get('/latest', asyncHandler(recordController.getLatestRecordByArea));

/**
 * @swagger
 * /api/v1/records/chart-data:
 *   get:
 *     summary: Get aggregated data for charts from the last 8 hours
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the area to retrieve chart data for
 *     responses:
 *       200:
 *         description: Returns aggregated sensor data for charts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   time_slot:
 *                     type: string
 *                     format: date-time
 *                   avg_light:
 *                     type: number
 *                   avg_temperature:
 *                     type: number
 *                   avg_humidity:
 *                     type: number
 *                   avg_soil_moisture:
 *                     type: number
 *       400:
 *         description: Bad request - Missing required parameters
 *       500:
 *         description: Server error
 */
router.get('/chart-data', asyncHandler(recordController.getChartData));
router.post('/create', asyncHandler(recordController.createRecord));

export const recordRoute = router;
