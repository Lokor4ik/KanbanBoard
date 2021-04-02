import { Request, Response } from 'express';

import Project from 'models/Project/Project';

import checkErrors from 'utils/middlewareErrors';

const createProject = async (req: Request, res: Response) => {
  checkErrors(req, res);

  try {
    const { name, key, lead } = req.body;

    const projectBody = {
      name,
      key,
      lead,
    };
    const project = new Project(projectBody);

    await project.save();

    res.json({ msg: 'Successfully created project', severity: 'success' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

const getAllProjects = async (_: Request, res: Response) => {
  try {
    const projects = await Project.find();

    const convertedProjects = projects.map(({ _id, name, lead, key }) => ({
      id: _id,
      name,
      lead,
      key,
    }));

    res.json(convertedProjects);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export default { createProject, getAllProjects };
