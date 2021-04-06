import express from 'express';
import { check } from 'express-validator';

import projectController from 'controllers/project/project';
import auth from 'middleware/auth/auth';

const router = express.Router();

const middlewares = [
  auth,
  check('name', 'Name is required').not().isEmpty(),
  check('key', 'Key is required').not().isEmpty(),
  check('lead', 'Lead is required').not().isEmpty(),
];

// @route  POST api/project
// @desc   Create new project
// @access Private
router.post('/', middlewares, projectController.createProject);

// @route  GET api/project
// @desc   Get all assigned projects
// @access Private
router.get('/', auth, projectController.getAllProjects);

// @route  GET api/project/:id
// @desc   Get one project
// @access Private
router.get('/one', auth, projectController.getOneProject);

export default router;
