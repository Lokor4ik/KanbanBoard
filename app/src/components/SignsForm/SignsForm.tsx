import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { clearErrors } from 'store/auth/action';

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
  errorMessages,
  children,
  nameField,
  haveAnAccount,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickSubmit = () => {
    if (errorMessages.length) {
      dispatch(clearErrors());
    }
  };

  return (
    <div className="signs__wrapper">
      <Typography variant="h4" className={classes.h4}>
        {title}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {nameField}
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

        <ColorButton onClick={handleClickSubmit} fullWidth type="submit" className={classes.submit}>
          Submit
        </ColorButton>

        {haveAnAccount}
      </form>
    </div>
  );
};

export default SignsForm;
