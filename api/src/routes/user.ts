import express from 'express';
import { check, query } from 'express-validator';

import auth from 'middleware/auth/auth';
import userController from 'controllers/user/user';

const router = express.Router();

const middlewaresRegister = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];

const middlewaresfindByEmail = [auth, query('email', 'Email is required').isEmail().not().isEmpty()];

// @route  POST api/user
// @desc   Register user
// @access Public
router.post('/', middlewaresRegister, userController.register);

// @route  GET api/user
// @desc   Find user by email
// @access Private
router.get('/', middlewaresfindByEmail, userController.findByEmail);

export default router;
