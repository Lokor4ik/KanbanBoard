import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import TextField from '@material-ui/core/TextField';

import { useSnackbar, TransitionCloseHandler } from 'notistack';

import SignsForm from 'components/SignsForm/SignsForm';
import HaveAnAccount from 'components/HaveAnAccount/HaveAnAccount';
import NameField from 'components/NameField/NameField';

import { RootState } from 'store/types';
import { clearErrors, registerUser } from 'store/auth/action';
import { ParamsRegisterUser } from 'store/auth/types';

const SignUpContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { errors } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(
    () => () => {
      if (errors.length) {
        dispatch(clearErrors());
      }
    },
    [dispatch, errors.length]
  );

  const handleClose: TransitionCloseHandler = useCallback(
    (_, reason) => {
      if (reason !== 'clickaway') {
        dispatch(clearErrors());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (errors.length) {
      errors.map(({ msg, severity }) =>
        enqueueSnackbar(msg, { variant: severity, onClose: handleClose })
      );
    }
  }, [enqueueSnackbar, errors, handleClose]);

  const handleSumbit = ({ name, email, password }: ParamsRegisterUser) => {
    dispatch(registerUser({ name, email, password }));
  };

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });

  return (
    <SignsForm
      formik={formik}
      title="Sign Up"
      errorMessages={errors}
      haveAnAccount={<HaveAnAccount title="Already have an account? Log In" path="/signin" />}
      nameField={<NameField formik={formik} />}
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
