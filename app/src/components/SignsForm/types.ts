import { ReactNode } from 'react';
import { FormikValues } from 'formik';

import { Color } from '@material-ui/lab/Alert';

export type SignsProps = {
  formik: FormikValues;
  title: string;
  children?: ReactNode;
  open: boolean;
  handleClose: (event: React.SyntheticEvent, reason?: string) => void;
  errorMessages: Array<{
    msg: string;
    severity: Color;
  }>;
};
