import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import MainLayout from 'layouts/MainLayout/MainLayout';
import ColorButton from 'shared/Button/Button';

import './Landing.scss';

const useStyles = makeStyles({
  tBody: {
    marginBottom: '20px',
  },
});

const Landing = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleSignUp = () => {
    history.push('/signup');
  };

  return (
    <MainLayout sectionName="landing">
      <div className="landing__content">
        <Typography variant="h3" gutterBottom>
          Welcome to Kanban board.
        </Typography>

        <Typography className={classes.tBody} variant="h5">
          Sigh up now to start assigning tasks and keeping track of your progress.
        </Typography>

        <ColorButton onClick={handleSignUp}>Sign up-it&lsquo;s free!</ColorButton>
      </div>
    </MainLayout>
  );
};

export default Landing;
