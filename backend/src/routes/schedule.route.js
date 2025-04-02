import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { scheduleController } from '../controllers/schedule.controller.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: API endpoints for managing schedules
 */

/**
 * @swagger
 * /api/v1/schedule/get:
 *   get:
 *     summary: Get schedules for a specific area
 *     tags: [Schedules]
 *     parameters:
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the area to retrieve schedules from
 *     responses:
 *       200:
 *         description: List of schedules for the specified area
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   areaId:
 *                     type: integer
 *                   time:
 *                     type: string
 *                     format: time
 *                   status:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */
router.route('/get').get(asyncHandler(scheduleController.getSchedules))
//http://localhost:8080/api/v1/schedule/get?areaId=

/**
 * @swagger
 * /api/v1/schedule/create:
 *   post:
 *     summary: Create a new schedule for a specific area
 *     tags: [Schedules]
 *     parameters:
 *       - in: query
 *         name: areaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the area to create a schedule for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Start time for the schedule in "HH:mm" format
 *                 example: "08:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: End time for the schedule in "HH:mm" format
 *                 example: "09:00"
 *               frequency:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of days of the week when the schedule applies
 *                 example: ["Monday", "Wednesday", "Friday"]
 *               activity:
 *                 type: string
 *                 description: The activity associated with this schedule
 *                 example: "Tưới nước / Chiếu đèn"
 *     responses:
 *       201:
 *         description: Schedule created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 areaId:
 *                   type: integer
 *                 startTime:
 *                   type: string
 *                   format: time
 *                 endTime:
 *                   type: string
 *                   format: time
 *                 frequency:
 *                   type: array
 *                   items:
 *                     type: string
 *                 activity:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Server error
 */
router.route('/create').post(asyncHandler(scheduleController.createSchedule))
//http://localhost:8080/api/v1/schedule/create

router.route('/delete/:id').delete(asyncHandler(scheduleController.deleteSchedule))
// http://localhost:8080/api/v1/schedule/delete/..

router.route('/update/:id').put(asyncHandler(scheduleController.updateSchedule))
// http://localhost:8080/api/v1/schedule/update/...

export const scheduleRoute = router
