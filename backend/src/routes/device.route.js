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
 *         description: Successfully retrieved device logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   action:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   deviceType:
 *                     type: string
 *                   note:
 *                     type: string
 *                   areaId:
 *                     type: integer
 *       400:
 *         description: Missing or invalid areaId
 *       404:
 *         description: No new device log data found
 */
router.route('/sync').get(asyncHandler(deviceController.syncDeviceLogs))
//http://localhost:8080/api/v1/device/sync?areaId=

/**
 * @swagger
 * /api/v1/device/control:
 *   post:
 *     summary: Control a device in a specific area (start/stop pump or light)
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
 *                 example: 1
 *               action:
 *                 type: string
 *                 enum: [START, STOP]
 *                 example: START / STOP
 *               deviceType:
 *                 type: string
 *                 enum: [Máy bơm, Đèn]
 *                 example: Máy bơm / Đèn
 *     responses:
 *       200:
 *         description: Device was successfully controlled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Device was successfully controlled
 *       400:
 *         description: Missing or invalid request body fields
 *       404:
 *         description: Area not found
 *       500:
 *         description: System error or failed to control device
 */
router.route('/control').post(asyncHandler(deviceController.controlDevice))
// POST http://localhost:8080/api/v1/device/control
// Body: { "areaId": 1, "action": "START", "deviceType": "Máy bơm"}

export const deviceRoute = router
