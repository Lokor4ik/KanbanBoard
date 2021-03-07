import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'shared/Loader/Loader';
import NavBar from 'shared/NavBar/NavBar';

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
    <main className="main">
      <NavBar isAuthenticated={isAuthenticated} />

      {routes}
    </main>
  );
};

export default App;
