import * as helloworldCtrl from '../controllers/helloworld.ctrl.js'
import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware.isAuthorized, asyncHandler(helloworldCtrl.helloworld))

export default router
