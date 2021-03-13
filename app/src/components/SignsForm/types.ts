import { ReactNode } from 'react';
import { FormikValues } from 'formik';

import { Color } from '@material-ui/lab/Alert';

export type SignsProps = {
  formik: FormikValues;
  title: string;
  children?: ReactNode;
  errorMessages: Array<{
    msg: string;
    severity: Color;
  }>;
  nameField?: ReactNode;
  haveAnAccount: ReactNode;
};
