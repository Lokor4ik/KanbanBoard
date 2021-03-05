import { Application } from 'express';

import authRoute from './auth';
import userRoute from './user';

function routes(app: Application) {
  app.use('/api/auth', authRoute);
  app.use('/api/user', userRoute);
}

export default routes;
