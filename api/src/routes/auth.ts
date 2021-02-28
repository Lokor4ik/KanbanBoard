import express from 'express';
import { check } from 'express-validator';

import authController from 'controllers/auth';

const router = express.Router();

const middlewares = [check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists()];

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post('/auth', middlewares, authController.authenticate);

export default router;
