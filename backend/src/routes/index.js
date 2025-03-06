import express from 'express'
import helloworld from './helloworld.route.js'
import { userRoute } from './user.route.js'
const router = express.Router()

router.use('/', helloworld)
router.use('/user', userRoute)

export default router
