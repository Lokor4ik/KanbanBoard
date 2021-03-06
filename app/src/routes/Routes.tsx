import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Projects from 'pages/Projects/Projects';
import Kanban from 'pages/Kanban/Kanban';
import NotFound from 'pages/NotFound/NotFound';
import Landing from 'pages/Landing/Landing';
import SignUp from 'pages/SignUp/SignUp';
import SignIn from 'pages/SignIn/SignIn';

const pathsFromAuth = ['/login', '/signup', '/'];

export const useRoutes = (isAuthenticated: boolean) => {
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/:id/boards/:id" component={Kanban} />
        {pathsFromAuth.includes(location.pathname) && <Redirect to="/projects" />}
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={SignIn} />
      <Redirect from="/projects*" to="/login" />
      <Route component={NotFound} />
    </Switch>
  );
};
