import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { userActionLogController } from '../controllers/userActionLog.controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: UserActionLogs
 *   description: API endpoints for managing user action logs
 */


/**
 * @swagger
 * /api/v1/action-logs/get:
 *   get:
 *     summary: Retrieve user action logs by userId, areaId, or both
 *     description: Returns logs filtered by userId, areaId, or a combination of both. At least one parameter is required.
 *     tags: [UserActionLogs]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           example: "user_123"
 *         required: false
 *         description: ID of the user whose logs are to be retrieved
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: string
 *           example: "1"
 *         required: false
 *         description: ID of the area whose logs are to be retrieved
 *     responses:
 *       200:
 *         description: Successfully retrieved user action logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "log_123"
 *                   userId:
 *                     type: string
 *                     example: "user_1"
 *                   action:
 *                     type: string
 *                     example: "WATERING"
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     example: "Watered crops in area 1"
 *                   areaId:
 *                     type: integer
 *                     example: "1"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-15T09:45:30Z"
 *       400:
 *         description: Bad request - Missing required fields
 *       500:
 *         description: Server error
 */

router.route('/get').get(asyncHandler(userActionLogController.getUserLogs))

/**
 * @swagger
 * /api/v1/action-logs/create:
 *   post:
 *     summary: Create a new user action log
 *     tags: [UserActionLogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - action
 *               - areaId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user_1"
 *               action:
 *                 type: string
 *                 example: "WATERING"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "Watered crops in area 1"
 *               areaId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Successfully created user action log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "log_123"
 *                     userId:
 *                       type: string
 *                       example: "user_1"
 *                     action:
 *                       type: string
 *                       example: "WATERING"
 *                     description:
 *                       type: string
 *                       nullable: true
 *                       example: "Watered crops in area 1"
 *                     areaId:
 *                       type: integer
 *                       example: 1
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-04-15T09:45:30Z"
 *       400:
 *         description: Bad Request – Missing or invalid fields
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong: [error message]"
 */

router.route('/create').post(asyncHandler(userActionLogController.createUserActionLog))

export const userActionLogRoute = router
