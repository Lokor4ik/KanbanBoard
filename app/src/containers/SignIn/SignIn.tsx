import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSnackbar } from 'notistack';

import SignsForm from 'components/SignsForm/SignsForm';
import CustomLink from 'shared/Link/Link';

import { RootState } from 'store/types';
import { clearErrors, loginUser } from 'store/auth/action';
import { ParamsLoginUser } from 'store/auth/types';

const SignInContainer = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { errors } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (errors.length) {
      errors.map(({ msg, severity }) =>
        enqueueSnackbar(msg, {
          variant: severity,
        })
      );

      dispatch(clearErrors());
    }
  }, [dispatch, enqueueSnackbar, errors]);

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
      errorMessages={errors}
      haveAnAccount={
        <CustomLink title="Sign up for an account" path="/signup" className="link--purple" />
      }
    />
  );
};

export default SignInContainer;
