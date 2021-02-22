import { Switch, Route } from 'react-router-dom';

import Projects from 'pages/Projects/Projects';
import Kanban from 'pages/Kanban/Kanban';
import NotFound from 'pages/NotFound/NotFound';

export const useRoutes = () => (
  <Switch>
    <Route exact path="/projects" component={Projects} />
    <Route exact path="/projects/:id/boards/:id" component={Kanban} />
    <Route component={NotFound} />
  </Switch>
);
