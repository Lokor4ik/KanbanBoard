import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from 'routes/Routes';

import './App.scss';

const App = () => {
  const routes = useRoutes();

  return (
    <Router>
      <main className="main">{routes}</main>
    </Router>
  );
};

export default App;
