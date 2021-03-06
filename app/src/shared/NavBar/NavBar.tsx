/* import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/auth/action';

import './Navbar.scss';

const Navbar = ({ isAuthenticated }) => {
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
          <button className="navbar-logout" onClick={logout}>
            <LogoutOutlined className="user-outlined" />
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className="header bg-dark">
      <h1>
        <Link to={isAuthenticated ? '/dashboard' : '/'}>
          <TeamOutlined />
          DevUnite
        </Link>
      </h1>
      {navLinks}
    </header>
  );
};

export default Navbar;
 */
