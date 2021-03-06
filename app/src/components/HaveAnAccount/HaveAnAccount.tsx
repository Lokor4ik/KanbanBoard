import { Link } from 'react-router-dom';

import { HaveAnAccountProps } from './types';

import './HaveAnAccount.scss';

const HaveAnAccount: React.FC<HaveAnAccountProps> = ({ title, path }) => (
  <Link className="have-account" to={path}>
    {title}
  </Link>
);

export default HaveAnAccount;
