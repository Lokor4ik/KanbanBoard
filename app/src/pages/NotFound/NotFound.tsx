import MainLayout from 'layouts/MainLayout/MainLayout';

import './NotFound.scss';

const NotFound = () => (
  <MainLayout sectionName="not-found">
    <div className="not-found__content">
      <h1>404 Error Oops!</h1>
      <p>We can&lsquo;t find that page.</p>
    </div>
  </MainLayout>
);

export default NotFound;
