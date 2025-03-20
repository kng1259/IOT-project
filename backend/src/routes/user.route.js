import express from 'express'
import asyncHandler from '../helpers/asyncHandler.js'
import { userValidation } from '../validations/user.validation.js'
import { userController } from '../controllers/user.controller.js'

const router = express.Router()

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized
 */
router.route('/login').post(asyncHandler(userValidation.login), asyncHandler(userController.login))

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input data
 */
router.route('/register').post(asyncHandler(userValidation.register), asyncHandler(userController.register))

/**
 * @swagger
 * /api/v1/user/refresh-token:
 *   get:
 *     summary: Refresh access token using refresh token
 *     tags: [Users]
 *     description: Uses HTTP-only refresh token cookie to generate a new access token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid or expired refresh token
 *       403:
 *         description: Forbidden - No refresh token provided
 */
router.route('/refresh-token').get(asyncHandler(userController.refreshToken))


/**
 * @swagger
 * /api/v1/user/logout:
 *   delete:
 *     summary: Logout a user
 *     tags: [Users]
 *     description: Clears the access and refresh token cookies
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedOut:
 *                   type: boolean
 *                   example: true
 */
router.route('/logout').delete(asyncHandler(userController.logout))

export const userRoute = router
