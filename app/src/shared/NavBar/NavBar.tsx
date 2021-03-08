import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ColorButton from 'shared/Button/Button';

import { logoutUser } from 'store/auth/action';

import { NavBarProps } from './types';

import './NavBar.scss';

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  const navLinks = (
    <ul className="navbar__buttons">
      {isAuthenticated && (
        <>
          <li>
            <ColorButton onClick={logout} fullWidth type="button">
              Logout
            </ColorButton>
          </li>
        </>
      )}
      {!isAuthenticated && location.pathname === '/' && (
        <>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="navbar">
          <Link className="navbar__homepage" to="/">
            Kanban
          </Link>

          {navLinks}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
