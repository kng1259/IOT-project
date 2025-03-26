import * as helloworldCtrl from '../controllers/helloworld.ctrl.js'
import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: HelloWorld
 *   description: Sample endpoint for reference
 */

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: Returns a hello world message
 *     tags: [HelloWorld]
 *     responses:
 *       200:
 *         description: Hello world message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
router.get('/', authMiddleware.isAuthorized, asyncHandler(helloworldCtrl.helloworld))
router.get('/test/:deviceId', asyncHandler(helloworldCtrl.testFunction))

export default router
