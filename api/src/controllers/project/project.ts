import { Request, Response } from 'express';
import CryptoAES from 'crypto-js/aes';
import CryptoENC from 'crypto-js/enc-utf8';

import Project from 'models/Project/Project';

import checkErrors from 'utils/middlewareErrors';

const { ENCRYPT_SECRET_KEY } = process.env;

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

const getOneProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const decryptId = decodeURIComponent(CryptoAES.decrypt(String(id), ENCRYPT_SECRET_KEY as string).toString(CryptoENC));

    const project = await Project.findById(decryptId);

    res.json(project);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export default { createProject, getAllProjects, getOneProject };
