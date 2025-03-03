import express from 'express';
import helloworld from './helloworld.route.js';

const router = express.Router();

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
router.use('/', helloworld);

export default router;
