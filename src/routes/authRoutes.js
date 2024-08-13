const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
	UserRegisterValidator,
	UserLoginValidator,
} = require("../middlewares/validatorMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: User already exists
 */
router.post("/register", UserRegisterValidator, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user in the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Bad request
 */
router.post("/login", UserLoginValidator, authController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     description: Logout a user from the system
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful logout
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         username: JohnDoe
 *         email: 7kKXg@example.com
 *         password: secret
 */

module.exports = router;
