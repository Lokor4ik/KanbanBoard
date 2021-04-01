import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import NewProjectContent from 'components/NewProjectContent/NewProjectContent';

import { ParamsNewProject } from 'store/projects/types';

const NewProject = () => {
  const handleSumbit = ({ name, key, lead }: ParamsNewProject) => {
    console.log(name, key, lead);
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
      name: '',
      key: '',
      lead: '',
    },
    validationSchema,
    onSubmit: handleSumbit,
  });
  return <NewProjectContent formik={formik} />;
};

export default NewProject;
