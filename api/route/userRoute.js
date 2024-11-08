const express = require('express');
const { register, login} = require('../service/userService');
const { authenticate } = require("../middlewear/securityMiddlewear");

const router = express.Router();

/**
 * @swagger
 *  paths:
 *    /users/register:
 *      post:
 *        tags:
 *          - Users
 *        summary: User registration
 *        description: This endpoint allows users to register by providing their email, password, and name.
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                    description: The email of the user
 *                  password:
 *                    type: string
 *                    description: The password for the user account
 *                  name:
 *                    type: string
 *                    description: The name of the user
 *                example:
 *                    username: JohnSmith
 *                    password: "123456"
 *                    name: John Smith
 *                required:
 *                  - username
 *                  - password
 *                  - name
 *        responses:
 *          201:
 *            description: User registered successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  description: The unique ID (UUID) of the newly registered user
 *          400:
 *            description: Bad request - Invalid input data
 *          500:
 *            description: Internal server error
 */
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, name } = req.body;

        const userId = await register(username, password, name);

        res.status(201).send(userId);
    } catch (error) {
        next(error)
    }
});

/**
 * @swagger
 *  paths:
 *    /users/login:
 *      post:
 *        tags:
 *          - Users
 *        summary: User login
 *        description: This endpoint allows users to log in by providing their email and password.
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  username:
 *                    type: string
 *                    description: The email of the user
 *                  password:
 *                    type: string
 *                    description: The password for the user account
 *                example:
 *                    username: JohnSmith
 *                    password: "123456"  
 *                required:
 *                  - username
 *                  - password
 *        responses:
 *          200:
 *            description: User logged in successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                      description: The JWT token for the logged-in user
 *          401:
 *            description: Unauthorized - Invalid email or password
 *          500:
 *            description: Internal server error
 */
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const token = await login(username, password);

        res.status(200).json({ token });
    } catch (error) {
        next(error)
    }
});

module.exports = router;