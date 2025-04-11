import express from 'express'
import helloworld from './helloworld.route.js'
import { userRoute } from './user.route.js'
import { farmRoute } from './farm.route.js'
import { areaRoute } from './area.route.js'
import { recordRoute } from './record.route.js'
import { deviceRoute } from './device.route.js'
import { scheduleRoute } from './schedule.route.js'
import { userActionLogRoute } from './userActionLog.route.js'

const router = express.Router()

router.use('/', helloworld)
router.use('/user', userRoute)
router.use('/farms', farmRoute)
router.use('/areas', areaRoute)
router.use('/records', recordRoute)
router.use('/device', deviceRoute)
router.use('/schedule', scheduleRoute)
router.use('/action-logs', userActionLogRoute)

export default router
