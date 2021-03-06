import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const MessageAlert = (props: AlertProps) => <MuiAlert elevation={6} variant="filled" {...props} />;

export default MessageAlert;
