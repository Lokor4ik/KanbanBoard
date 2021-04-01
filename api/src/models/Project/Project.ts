import mongoose, { Schema } from 'mongoose';

import { ProjectInterface } from './types';

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  lead: {
    type: String,
    required: true,
  },
});

export const Project = mongoose.model<ProjectInterface>('project', ProjectSchema);

export default Project;
