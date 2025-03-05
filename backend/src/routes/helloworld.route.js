import * as helloworldCtrl from '../controllers/helloworld.ctrl.js'
import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'

const router = express.Router()

router.get('/', asyncHandler(helloworldCtrl.helloworld))

export default router
