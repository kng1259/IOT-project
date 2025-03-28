import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { farmController } from '../controllers/farm.controller.js'

const router = express.Router()

// Lấy danh sách farm theo userId
router.get('/', asyncHandler(farmController.getFarmsByUser))


export const farmRoute = router
