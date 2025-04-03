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
 *     summary: Get user action logs by userId or areaId
 *     tags: [UserActionLogs]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID to filter logs by
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: string
 *         description: Area ID to filter logs by
 *     responses:
 *       200:
 *         description: Returns user action logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   areaId:
 *                     type: string
 *                   action:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Missing required query parameters
 *       500:
 *         description: Server error
 */
router.route('/get').get(asyncHandler(userActionLogController.getUserLogs))

// /**
//  * @swagger
//  * /api/v1/action-logs/create:
//  *   post:
//  *     summary: Create a new user action log
//  *     tags: [UserActionLogs]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - userId
//  *               - areaId
//  *               - action
//  *             properties:
//  *               userId:
//  *                 type: string
//  *               areaId:
//  *                 type: string
//  *               action:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Log created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                 userId:
//  *                   type: string
//  *                 areaId:
//  *                   type: string
//  *                 action:
//  *                   type: string
//  *                 timestamp:
//  *                   type: string
//  *                   format: date-time
//  *       400:
//  *         description: Bad request - Missing required fields
//  *       500:
//  *         description: Server error
//  */
router.route('/create').post(asyncHandler(userActionLogController.createUserActionLog))

export const userActionLogRoute = router
