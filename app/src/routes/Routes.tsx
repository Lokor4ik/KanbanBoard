import { Switch, Route } from 'react-router-dom';

import Projects from 'pages/Projects/Projects';
import Kanban from 'pages/Kanban/Kanban';
import NotFound from 'pages/NotFound/NotFound';
import Landing from 'pages/Landing/Landing';

export const useRoutes = (isAuthenticated: boolean) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:id/boards/:id" component={Kanban} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
