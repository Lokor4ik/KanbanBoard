import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'shared/Loader/Loader';

import { RootState } from 'store/types';
import { loadUser } from 'store/auth/action';

import { useRoutes } from 'routes/Routes';

import './App.scss';

const App = () => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <main className="main">{routes}</main>
    </Router>
  );
};

export default App;
