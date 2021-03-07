import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser } from 'store/auth/action';

import { NavBarProps } from './types';

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  const navLinks = isAuthenticated && (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <button type="button" className="navbar-logout" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className="header bg-dark">
      <h1>
        <Link to={isAuthenticated ? '/dashboard' : '/'}>DevUnite</Link>
      </h1>
      {navLinks}
    </header>
  );
};

export default NavBar;
