import { useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import SignsForm from 'components/SignsForm/SignsForm';
import HaveAnAccount from 'components/HaveAnAccount/HaveAnAccount';

import { RootState } from 'store/types';
import { loginUser } from 'store/auth/action';
import { ParamsLoginUser } from 'store/auth/types';

const SignInContainer = () => {
  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const { errors } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

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

  const handleSumbit = ({ email, password }: ParamsLoginUser) => {
    dispatch(loginUser({ email, password }));
  };

  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  return (
    <SignsForm
      formik={formik}
      title="Sign In"
      open={open}
      handleClose={handleClose}
      errorMessages={errorMessages}
      haveAnAccount={<HaveAnAccount title="Sign up for an account" path="/signup" />}
    />
  );
};

export default SignInContainer;
