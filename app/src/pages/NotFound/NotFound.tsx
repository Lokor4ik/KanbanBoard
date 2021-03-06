import Typography from '@material-ui/core/Typography';
import MainLayout from 'layouts/MainLayout/MainLayout';
import { makeStyles } from '@material-ui/core/styles';

import './NotFound.scss';

const useStyles = makeStyles({
  h5: {
    fontWeight: 600,
  },
});

const NotFound = () => {
  const classes = useStyles();

  return (
    <MainLayout sectionName="notfound">
      <div className="notfound__content">
        <Typography variant="h5" className={classes.h5}>
          404 Error Oops!
        </Typography>
        <Typography variant="subtitle1">We can&lsquo;t find that page.</Typography>
      </div>
    </MainLayout>
  );
};

export default NotFound;
