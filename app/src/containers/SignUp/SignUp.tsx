import { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';
// import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import SignsForm from 'components/SignsForm/SignsForm';

import { RootState } from 'store/types';

const SignUpContainer = () => {
  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const { errors } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrorMessages(errors);
      setOpen(true);
    }
  }, [errors]);

  const handleClose = (_: SyntheticEvent, reason?: string) => {
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  };
  // const dispatch = useDispatch();

  // const handleSumbit = ({ email, password }: ParamsLoginUser) => {
  //   dispatch(loginUser({ email, password }));
  // };

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .when('password', {
        is: (val: Array<string>) => val && val.length > 0,
        then: yup.string().oneOf([yup.ref('password')], 'Both password need to be the same'),
      }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.warn(values);
    },
  });

  return (
    <SignsForm
      formik={formik}
      title="Sign Up"
      open={open}
      handleClose={handleClose}
      errorMessages={errorMessages}
    >
      <TextField
        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />
    </SignsForm>
  );
};

export default SignUpContainer;
