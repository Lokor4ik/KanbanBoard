import { Color } from '@material-ui/lab/Alert';

const defaultError = [{ msg: 'Something went wrong', severity: 'error' }];

const handleErrors = (error: Array<{ msg: string; severity: Color }> | Error) =>
  error instanceof Array ? error : defaultError;

export default handleErrors;
