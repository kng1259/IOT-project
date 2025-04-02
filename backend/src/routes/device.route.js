import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { deviceController } from '../controllers/device.controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API endpoints for managing devices
 */

/**
 * @swagger
 * /api/v1/device/sync:
 *   get:
 *     summary: Synchronize device logs for a specific area
 *     tags: [Devices]
 *     parameters:
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the area to sync device logs for
 *     responses:
 *       200:
 *         description: Returns the synchronized device logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Server error
 */
router.route('/sync').get(asyncHandler(deviceController.syncDeviceLogs))
//http://localhost:8080/api/v1/device/sync?areaId=

/**
 * @swagger
 * /api/v1/device/control:
 *   post:
 *     summary: Control a device in a specific area
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - areaId
 *               - action
 *               - deviceType
 *             properties:
 *               areaId:
 *                 type: integer
 *               action:
 *                 type: string
 *                 description: Action to perform (e.g., START, STOP)
 *               deviceType:
 *                 type: string
 *                 description: Type of device to control (e.g., Máy bơm)
 *     responses:
 *       200:
 *         description: Device control operation successful
 *       400:
 *         description: Bad request - Missing required parameters
 *       500:
 *         description: Server error
 */
router.route('/control').post(asyncHandler(deviceController.controlDevice))
// POST http://localhost:8080/api/v1/device/control
// Body: { "areaId": 1, "action": "START", "deviceType": "Máy bơm"}

export const deviceRoute = router
