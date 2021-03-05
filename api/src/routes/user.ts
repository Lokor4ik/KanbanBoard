import express from 'express';
import { check } from 'express-validator';

import userController from 'controllers/user/user';

const router = express.Router();

const middlewares = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', middlewares, userController.register);

export default router;
