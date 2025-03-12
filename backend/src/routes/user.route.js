import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { userValidation } from '../validations/user.validation.js'
import { userController } from '../controllers/user.controller.js'

const router = express.Router()

router.route('/login')
  .post(asyncHandler(userValidation.login), asyncHandler(userController.login))

router.route('/register')
  .post(asyncHandler(userValidation.register), asyncHandler(userController.register))

router.route('/refresh-token')
  .get(asyncHandler(userController.refreshToken))

router.route('/logout')
  .delete(asyncHandler(userController.logout))

export const userRoute = router
