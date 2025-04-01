import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { userActionLogController } from '../controllers/userActionLog.controller.js'

const router = express.Router()

// Unified GET route: ?userId= or ?areaId=
router.route('/get').get(
  asyncHandler(async (req, res) => {
    const { userId, areaId } = req.query

    if (userId) {
      return await userActionLogController.getUserLogsByUserId(req, res)
    }

    if (areaId) {
      return await userActionLogController.getUserLogsByAreaId(req, res)
    }

    res.status(400).json({ error: 'Missing userId or areaId in query' })
  })
)

// POST to create a log
router.route('/create').post(
  asyncHandler(userActionLogController.createUserActionLog)
)

export const userActionLogRoute = router
