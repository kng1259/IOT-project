import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { userValidation } from '../validations/userValidation.js'
import { userController } from '../controllers/userController.js'

const router = express.Router()

router.route('/login')
  .post(asyncHandler(userValidation.login), asyncHandler(userController.login))

router.route('/register')
  .post(asyncHandler(userValidation.register), asyncHandler(userController.register))

router.route('/refresh-token')
  .get(asyncHandler(userController.refreshToken))

export default router
