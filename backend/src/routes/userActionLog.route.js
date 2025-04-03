import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { userActionLogController } from '../controllers/userActionLog.controller.js'

const router = express.Router()

// Unified GET route: ?userId= or ?areaId=
router.route('/get').get(asyncHandler(userActionLogController.getUserLogs))

// POST to create a log
router.route('/create').post(
  asyncHandler(userActionLogController.createUserActionLog)
)

export const userActionLogRoute = router
