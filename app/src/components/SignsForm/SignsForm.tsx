import { v4 as uuidv4 } from 'uuid';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';
import MessageAlert from 'shared/MessageAlert/MessageAlert';

import { SignsProps } from './types';

import './SignsForm.scss';

const useStyles = makeStyles({
  h4: {
    marginBottom: 40,
  },
  submit: {
    marginTop: 40,
  },
});

const SignsForm: React.FC<SignsProps> = ({
  formik,
  title,
  open,
  handleClose,
  errorMessages,
  children,
}) => {
  const classes = useStyles();

  const arrayErrors = () =>
    errorMessages.map(({ msg, severity }) => (
      <Snackbar key={uuidv4()} open={open} autoHideDuration={6000} onClose={handleClose}>
        <MessageAlert onClose={handleClose} severity={severity}>
          {msg}
        </MessageAlert>
      </Snackbar>
    ));

  console.log(children);

  return (
    <div className="signs__wrapper">
      <Typography variant="h4" className={classes.h4}>
        {title}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {children}

        <ColorButton fullWidth type="submit" className={classes.submit}>
          Submit
        </ColorButton>
      </form>

      {arrayErrors()}
    </div>
  );
};

export default SignsForm;
