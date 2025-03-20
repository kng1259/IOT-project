import express from 'express'
import helloworld from './helloworld.route.js'
import { userRoute } from './user.route.js'
import { farmRoute } from './farm.route.js'
import { areaRoute } from './area.route.js'
import { recordRoute } from './record.route.js'

const router = express.Router()

router.use('/', helloworld)
router.use('/user', userRoute)
router.use('/farms', farmRoute)
router.use('/areas', areaRoute)
router.use('/records', recordRoute);

export default router
