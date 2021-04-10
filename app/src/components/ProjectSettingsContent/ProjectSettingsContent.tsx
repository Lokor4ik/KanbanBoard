import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CustomLink from 'shared/Link/Link';
import ColorButton from 'shared/Button/Button';

import { ProjectSettingsContentProps } from './types';

import './ProjectSettingsContent.scss';

const useStyles = makeStyles({
  h6: {
    fontWeight: 500,
  },
  submit: {
    marginTop: 40,
  },
  lead: {
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.54)',
    marginTop: 20,
  },
  text: {
    color: '#636363',
  },
});

const ProjectSettingsContent: React.FC<ProjectSettingsContentProps> = ({ match, formik, lead }) => {
  const classes = useStyles();

  return (
    <div className="project-settings__form">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="key"
          name="key"
          label="Key"
          type="key"
          value={formik.values.key}
          onChange={formik.handleChange}
          error={formik.touched.key && Boolean(formik.errors.key)}
          helperText={formik.touched.key && formik.errors.key}
        />
        <Typography variant="caption" className={classes.lead}>
          Lead
        </Typography>
        <Typography variant="body1" className={classes.text}>
          {lead}
        </Typography>
        <div className="form__link">
          <CustomLink
            title="Project participants"
            path={`/projects/${match.params.id}/project-participants`}
            className="link--purple link--no-margins"
          />
        </div>

        <ColorButton fullWidth type="submit" className={classes.submit}>
          Save
        </ColorButton>
      </form>
    </div>
  );
};

export default withRouter(ProjectSettingsContent);
