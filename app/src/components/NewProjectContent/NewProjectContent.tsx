import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import ColorButton from 'shared/Button/Button';

import { NewProjectContentProps } from './types';

import './NewProjectContent.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
});

const NewProjectContent: React.FC<NewProjectContentProps> = ({ formik }) => {
  const classes = useStyles();

  return (
    <div className="new-project__wrapper">
      <Typography variant="h6" className={classes.h6}>
        New project
      </Typography>

      <form onSubmit={formik.handleSubmit}>
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

        <ColorButton fullWidth type="submit">
          Submit
        </ColorButton>
      </form>
    </div>
  );
};

export default NewProjectContent;
