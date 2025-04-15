import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { recordController } from '../controllers/record.controller.js'

const router = express.Router()

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
router.get('/latest', asyncHandler(recordController.getLatestRecordByArea))

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


/**
 * @swagger
 * /api/v1/records/create:
 *   post:
 *     summary: Create a new sensor record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sensorData:
 *                 type: object
 *                 required:
 *                   - light
 *                   - temperature
 *                   - humidity
 *                   - soilMoisture
 *                 properties:
 *                   light:
 *                     type: number
 *                     example: 450.2
 *                   temperature:
 *                     type: number
 *                     example: 27.5
 *                   humidity:
 *                     type: number
 *                     example: 60
 *                   soilMoisture:
 *                     type: number
 *                     example: 35
 *               areaId:
 *                 type: integer
 *                 example: 1
 *               note:
 *                 type: string
 *                 example: "Testing"
 *     responses:
 *       201:
 *         description: Sensor record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 record:
 *                   type: object
 *                   description: The created sensor record object
 *       400:
 *         description: Missing or invalid sensor data or areaId
 *       500:
 *         description: Internal server error while creating sensor record
 */
router.post('/create', asyncHandler(recordController.createRecord));

export const recordRoute = router
