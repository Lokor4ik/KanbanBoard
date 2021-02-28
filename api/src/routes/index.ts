import { Application } from 'express';

import authRoute from './auth';
import userRoute from './user';

function routes(app: Application) {
  app.use('/api', authRoute);
  app.use('/api', userRoute);
}

export default routes;
