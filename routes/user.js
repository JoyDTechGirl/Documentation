const { register, verify, login, getUsers, getUser, forgotPassword, resetPassword, changePassword } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');
const { validateRegister, validateLogin, validateForgotPassword, validateResetPassword, validateChangePassword } = require('../middlewares/validator');

const router = require('express').Router();


/** 
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               userName: 
 *                 type: string
 *                 description: The username of the user
 *                 example: JoyPabs
 *               email: 
 *                 type: string
 *                 description: The email of the user
 *                 example: joypabs@gmail.com
 *               password: 
 *                 type: string
 *                 description: User's password (must contain uppercase, lowercase, and a special character)
 *                 example: Joyp$123
 *               confirmPassword: 
 *                 type: string
 *                 description: Must match the password
 *                 example: Joyp$123
 *     responses: 
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email or username already exists or passwords do not match
 *       500:
 *         description: Error registering user
 */
router.post('/register', validateRegister, register);

/** 
 * @swagger
 * /api/v1/verify/user/{token}:
 *   get:
 *     summary: Verify a user account using a token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Verification token
 *     responses:
 *       200:
 *         description: Account verified successfully
 *       400:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found
 *       500:
 *         description: Error verifying user
 */
router.get('/verify/user/:token', verify);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login a user
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               userName: 
 *                 type: string
 *                 description: The username of the user
 *                 example: JoyPabs
 *               password: 
 *                 type: string
 *                 description: User's password
 *                 example: Joyp$123
 *     responses: 
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 *       500:
 *         description: Error logging user in
*/
router.post('/login', validateLogin, login);

/** 
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: List of all users
 *       400:
 *         description: No users found
 *       500:
 *         description: Error getting users
 */
router.get('/users', getUsers);

/** 
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retrieve authenticated user's details
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user details
 */
router.get('/user', authenticate, getUser);

/** 
 * @swagger
 * /api/v1/forgot/password:
 *   post:
 *     summary: Request password reset link
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               email: 
 *                 type: string
 *                 description: User's email
 *                 example: joypabs@gmail.com
 *     responses: 
 *       201:
 *         description: Password reset link sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error sending password reset link
 */
router.post('/forgot/password', validateForgotPassword, forgotPassword);

/** 
 * @swagger
 * /api/v1/reset/password/{token}:
 *   post:
 *     summary: Reset user password
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               newPassword: 
 *                 type: string
 *                 description: New password
 *                 example: NewJoyp$123
 *               confirmPassword: 
 *                 type: string
 *                 description: Must match new password
 *                 example: NewJoyp$123
 *     responses: 
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Passwords do not match or session expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Error resetting password
 */
router.post('/reset/password/:token', validateResetPassword, resetPassword);


/** 
 * @swagger
 * /api/v1/change/password:
 *   post:
 *     summary: Change user password
 *     security:
 *       - BearerAuth: []
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               password: 
 *                 type: string
 *                 description: Current password
 *                 example: Joyp$
 *               newPassword: 
 *                 type: string
 *                 description: New password
 *                 example: NewJoyp24$
 *               confirmPassword: 
 *                 type: string
 *                 description: Must match new password
 *                 example: NewJoyp24$
 *     responses: 
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Incorrect password or passwords do not match
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating password
 */
router.post('/change/password', authenticate, validateChangePassword, changePassword);

module.exports = router