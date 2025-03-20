import express from 'express';
import asyncHandler from '../helpers/asyncHandler.js';
import { recordController } from '../controllers/record.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: API endpoints for fetching environmental records
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "rec1"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-03-15T07:00:00.000Z"
 *         light:
 *           type: number
 *           example: 500.0
 *         temperature:
 *           type: number
 *           example: 25.0
 *         humidity:
 *           type: number
 *           example: 60.0
 *         soilMoisture:
 *           type: number
 *           example: 35.0
 *         areaId:
 *           type: string
 *           example: "area1"
 * 
 *     RecordsArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Record'
 *       example:
 *         [
 *           {
 *             "id": "rec1",
 *             "timestamp": "2025-03-15T07:00:00.000Z",
 *             "light": 500.0,
 *             "temperature": 25.0,
 *             "humidity": 60.0,
 *             "soilMoisture": 35.0,
 *             "areaId": "area1"
 *           },
 *           {
 *             "id": "rec2",
 *             "timestamp": "2025-03-15T07:05:00.000Z",
 *             "light": 520.0,
 *             "temperature": 25.2,
 *             "humidity": 59.5,
 *             "soilMoisture": 34.8,
 *             "areaId": "area1"
 *           },
 *           {
 *             "id": "rec3",
 *             "timestamp": "2025-03-15T07:10:00.000Z",
 *             "light": 530.0,
 *             "temperature": 25.5,
 *             "humidity": 59.0,
 *             "soilMoisture": 34.5,
 *             "areaId": "area1"
 *           },
 *           {
 *             "id": "rec4",
 *             "timestamp": "2025-03-19T07:10:00.000Z",
 *             "light": 530.0,
 *             "temperature": 25.5,
 *             "humidity": 59.0,
 *             "soilMoisture": 34.5,
 *             "areaId": "area1"
 *           }
 *         ]
 */

/**
 * @swagger
 * /records/latest:
 *   get:
 *     summary: Get the latest record by areaId
 *     description: Retrieves the most recent environmental record for a given area.
 *     tags: [Records]
 *     parameters:
 *       - name: areaId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "area1"
 *         description: The ID of the area to fetch the latest record for
 *     responses:
 *       200:
 *         description: Successfully retrieved the latest record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Record'
 *       400:
 *         description: Bad request, missing or invalid areaId
 *       500:
 *         description: Server error
 */
router.get('/latest', asyncHandler(recordController.getLatestRecordByArea));

/**
 * @swagger
 * /records/chart-data:
 *   get:
 *     summary: Get the latest 7 records for chart data
 *     description: Fetches the last 7 recorded data points for visualization.
 *     tags: [Records]
 *     parameters:
 *       - name: areaId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "area1"
 *         description: The ID of the area to fetch chart data for
 *     responses:
 *       200:
 *         description: Successfully retrieved the last 7 records
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecordsArray'
 *       400:
 *         description: Bad request, missing or invalid areaId
 *       500:
 *         description: Server error
 */
router.get('/chart-data', asyncHandler(recordController.getChartData));

export const recordRoute = router;
